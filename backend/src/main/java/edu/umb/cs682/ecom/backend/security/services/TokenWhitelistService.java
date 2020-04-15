package edu.umb.cs682.ecom.backend.security.services;

import edu.umb.cs682.ecom.backend.repositories.TokenWhitelist;
import edu.umb.cs682.ecom.backend.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component(value="tokenWhitelistService")
public class TokenWhitelistService {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    TokenWhitelist tokenWhitelist;

    public boolean containsToken(Authentication auth) {
        Object temp = auth.getCredentials();
        String jwt = temp instanceof String ? (String) temp : "";
        if (jwt.equals("")) return false;
        String id = jwtUtils.getIdFromJwtToken(jwt);
//        System.err.printf("\n\nreturning existsByTokenId(%s): %s\n\n", id, tokenWhitelist.existsByTokenId(id));
        if (!tokenWhitelist.existsByTokenId(id)) throw new AccessDeniedException("Login token expired or not valid");
        else return true;
    }
}
