package edu.umb.cs682.ecom.backend.payload.response;

import edu.umb.cs682.ecom.backend.models.User;

public class JwtResponse {
    private String type = "Bearer";
    private String token;
    private User user;

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
