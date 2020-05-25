package edu.umb.cs682.ecom.backend.payload.request;

import edu.umb.cs682.ecom.backend.models.User;

import javax.validation.constraints.NotBlank;

/**
 * <code>LoginRequest</code> represents a request from the frontend for a
 * {@link User} login token.
 */
public class LoginRequest {
    @NotBlank private String username;
    @NotBlank private String password;

    /**
     * Default constructor, only used by Spring for field injection
     */
    public LoginRequest() {}

    public String getUsername() { return username; }
    public String getPassword() { return password; }

    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
}
