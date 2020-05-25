package edu.umb.cs682.ecom.backend.payload.request;

import edu.umb.cs682.ecom.backend.models.User;

import javax.validation.constraints.NotBlank;

/**
 * <code>LogoutRequest</code> represents a request from the frontend for a
 * {@link User} to be logged out.
 */
public class LogoutRequest {
    @NotBlank private String tokenID;

    /**
     * Default constructor, only used by Spring for field injection
     */
    public LogoutRequest() {}

    public String getTokenID() { return tokenID; }
    public void setTokenID(String tokenID) { this.tokenID = tokenID; }
}
