package edu.umb.cs682.ecom.backend.security.jwt;

import edu.umb.cs682.ecom.backend.models.Token;
import edu.umb.cs682.ecom.backend.models.User;
import edu.umb.cs682.ecom.backend.repositories.TokenWhitelist;
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

/**
 * <code>JwtUtils</code> is a utility class that provides methods for
 * working with JSON Web Tokens (JWT).
 */
@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${cs682.ecom.jwtSecret}")
    private String jwtSecret;

    @Value("${cs682.ecom.jwtExpirationMs}")
    private int jwtExpirationMs;


    /**
     * Private constructor to prevent instantiation.
     */
    private JwtUtils() {}

    /**
     * Generates a JWT using the given {@link Authentication} object. The
     * given <code>Authentication</code> object contains information regarding
     * the user that initiated the http request.
     *
     * @param authentication the {@link Authentication} object containing user information
     * @return the generated JSON Web Token
     */
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

    /**
     * Extracts a JWT id string from a JWT.
     *
     * @param token the token from which an ID will be extracted
     * @return the extracted token ID
     */
    public String getIdFromJwtToken(String token) {
        try {
            return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getId();
        } catch (ExpiredJwtException e) {
            return e.getClaims().getId();
        }
    }

    /**
     * Produces a {@link Token} object from a JWT string.
     *
     * @param token the JWT string
     * @return the {@link Token} object produced
     */
    public Token makeTokenFromJwtString(String token) {
        return new Token(
                Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getId(),
                Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getIssuedAt(),
                Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getExpiration()
        );
    }

    /**
     * Extracts a {@link User User's} username from a JWT string.
     *
     * @param token the JWT string to extract the username from
     * @return the {@link User User's} username
     */
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * Validates a JSON Web Token string.
     * <p>
     *     This method will throw an {@link ExpiredJwtException} if the JWT
     *     is not in the {@link TokenWhitelist}, and returns false if the
     *     token is not valid in any other way.
     * </p>
     * @param authToken the JWT to be validated
     * @return true if the JWT is valid and false otherwise
     * @throws ExpiredJwtException to be caught by {@link AuthTokenFilter}
     */
    public boolean validateJwtToken(String authToken) throws ExpiredJwtException {
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
