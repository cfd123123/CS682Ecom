package edu.umb.cs682.ecom.backend.security.services;

import edu.umb.cs682.ecom.backend.controllers.UserController;
import edu.umb.cs682.ecom.backend.repositories.TokenWhitelist;
import edu.umb.cs682.ecom.backend.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

/**
 * <code>TokenWhitelistService</code> provides {@link PreAuthorize}
 * functionality to http request controllers such as {@link UserController}.
 * <p>
 *     The {@link TokenWhitelistService#containsToken(Authentication)} method
 *     checks whether the JWT is on the {@link TokenWhitelist}.
 * </p>
 */
@Component(value="tokenWhitelistService")
public class TokenWhitelistService {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    TokenWhitelist tokenWhitelist;

    /**
     * Private constructor to prevent instantiation.
     */
    private TokenWhitelistService() {}

    /**
     * Checks whether the JSON Web Token inside the given {@link Authentication}
     * is on the {@link TokenWhitelist}.
     *
     * @param auth the {@link Authentication} containing the JWT
     * @return true if the JWT is on the {@link TokenWhitelist} and false otherwise
     */
    public boolean containsToken(Authentication auth) {
        // extract JWT from auth
        Object possibleJWT = auth.getCredentials();
        String jwt = possibleJWT instanceof String ? (String) possibleJWT : "";
        // Is the jwt blank (which means the user isn't logged in)?
        if (jwt.equals("")) return false;
        String id = jwtUtils.getIdFromJwtToken(jwt);
        // Then check if the token is on the whitelist
        if (!tokenWhitelist.existsByTokenId(id)) {
            throw new AccessDeniedException("Login token expired or not valid");
        }
        return true;
    }
}
