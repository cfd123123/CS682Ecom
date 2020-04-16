package edu.umb.cs682.ecom.backend.security.jwt;

import edu.umb.cs682.ecom.backend.models.Token;
import edu.umb.cs682.ecom.backend.security.services.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Random;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${cs682.ecom.jwtSecret}")
    private String jwtSecret;

    @Value("${cs682.ecom.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .setId(userPrincipal.getId() +"lll"+ new Date().toString() +"lll"+ new Random().nextInt())
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getIdFromJwtToken(String token) {
        try {
            return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getId();
        } catch (ExpiredJwtException e) {
            return e.getClaims().getId();
        }
    }

    public Token makeTokenFromJwtString(String token) {
        return new Token(
                Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getId(),
                Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getIssuedAt(),
                Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getExpiration()
        );
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
            throw e;
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
