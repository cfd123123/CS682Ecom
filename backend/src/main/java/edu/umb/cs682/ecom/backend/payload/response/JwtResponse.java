package edu.umb.cs682.ecom.backend.payload.response;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String username;
    private String email;
    private List<String> roles;

    public JwtResponse(String accessToken, String id, String username, String email, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    public String getAccessToken() { return token; }
    public String getTokenType()   { return type; }
    public String getId()          { return id; }
    public String getEmail()       { return email; }
    public String getUsername()    { return username; }
    public List<String> getRoles() { return roles; }

    public void setAccessToken(String accessToken) { this.token = accessToken; }
    public void setTokenType(String tokenType)     { this.type = tokenType; }
    public void setId(String id)                   { this.id = id; }
    public void setEmail(String email)             { this.email = email; }
    public void setUsername(String username)       { this.username = username; }
}
