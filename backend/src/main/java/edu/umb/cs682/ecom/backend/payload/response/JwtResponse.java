package edu.umb.cs682.ecom.backend.payload.response;

import edu.umb.cs682.ecom.backend.models.User;

/**
 * <code>JwtResponse</code> represents a response to the frontend with a
 * JWT token after a {@link User} has just logged in. This token is used by
 * the frontend to authenticate the User for any subsequent requests to the
 * backend.
 */
public class JwtResponse {
    private String type = "Bearer";
    private String token;
    private User user;

    /**
     * Constructs a new JwtResponse object with the given access token and
     * {@link User} details.
     *
     * @param accessToken the access token to be used for future authentication
     * @param user the {@link User} that has been authenticated
     */
    public JwtResponse(String accessToken, User user) {
        this.token = accessToken;
        this.user = user;
    }

    public String getAccessToken() { return token; }
    public String getTokenType()   { return type; }
    public User getUser()          { return user; }


    public void setAccessToken(String accessToken) { this.token = accessToken; }
    public void setTokenType(String tokenType)     { this.type = tokenType; }
    public void setUser(User user)                 { this.user = user; }
}
