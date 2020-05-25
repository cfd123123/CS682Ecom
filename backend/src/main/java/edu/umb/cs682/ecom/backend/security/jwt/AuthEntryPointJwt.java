package edu.umb.cs682.ecom.backend.security.jwt;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import edu.umb.cs682.ecom.backend.security.services.CustomAccessDeniedHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * <code>AuthEntryPointJwt</code> is responsible for catching errors during
 * the authentication process in {@link AuthTokenFilter}.
 */
@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    /**
     * Private constructor to prevent instantiation.
     */
    private AuthEntryPointJwt() {}

    /**
     * Commences an authentication scheme -- catching authentication errors.
     * If the user's JWT token has expired, this method flags the response
     * object with an expiration message, to be handled by the
     * {@link CustomAccessDeniedHandler}. All other authorization
     * errors receive an Unauthorized message.
     *
     * @param request that resulted in an AuthenticationException
     * @param response so that the user agent can begin authentication
     * @param authException that caused the invocation
     * @throws IOException if an input or output exception occurs
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        Object expMsg = request.getAttribute("Expired");
        if (expMsg != null) {
            logger.error("Unauthorized error: {}", expMsg);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, expMsg.toString());
        } else if (authException instanceof BadCredentialsException) {
            logger.error("Unauthorized error: {}", authException.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
        } else {
//            authException.printStackTrace();
            logger.error("Unauthorized error: {}", authException.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
        }
    }
}
