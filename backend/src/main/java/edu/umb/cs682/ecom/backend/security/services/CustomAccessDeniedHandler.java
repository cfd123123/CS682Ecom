package edu.umb.cs682.ecom.backend.security.services;

import edu.umb.cs682.ecom.backend.security.jwt.AuthEntryPointJwt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.core.Authentication;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * <code>CustomAccessDeniedHandler</code> processes the errors that were
 * flagged in {@link AuthEntryPointJwt}.
 */
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    public static final Logger logger = LoggerFactory.getLogger(CustomAccessDeniedHandler.class);

    /**
     * Default constructor <code>CustomAccessDeniedHandler</code>.
     */
    public CustomAccessDeniedHandler() {}

    /**
     * Handles any authentication errors. after being flagged in
     * {@link AuthEntryPointJwt}.
     * <p>
     *     Errors can include: No auth token, expired auth token, insufficient
     *     permissions, and any other authentication error.
     * </p>
     *
     * @param request that resulted in an AccessDeniedException
     * @param response so that the user agent can be advised of the failure
     * @param exception that caused the invocation
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException exception)
            throws IOException, ServletException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            logger.warn(String.format("User: %s attempted to access the protected URL: %s",
                    auth.getName(), request.getRequestURI()));
        }
        if (exception.getMessage().equals("Access is denied")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, exception.getMessage());
        } else if (exception.getMessage().equals("Login token expired or not valid")) {
            logger.error("Unauthorized exception: {}", exception.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, exception.getMessage());
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, exception.getMessage());
        }
    }
}