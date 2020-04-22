package edu.umb.cs682.ecom.backend.payload.response;

import java.util.List;
import java.util.Map;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String username;
    private String email;
    private List<String> roles;
    private Map<String, Integer> cart;

    public JwtResponse(String accessToken, String id, String username, String email, List<String> roles, Map<String, Integer> cart) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.cart = cart;
    }

    public String getAccessToken()        { return token; }
    public String getTokenType()          { return type; }
    public String getId()                 { return id; }
    public String getEmail()              { return email; }
    public String getUsername()           { return username; }
    public List<String> getRoles()        { return roles; }
    public Map<String, Integer> getCart() { return cart; }

    public void setAccessToken(String accessToken)  { this.token = accessToken; }
    public void setTokenType(String tokenType)      { this.type = tokenType; }
    public void setId(String id)                    { this.id = id; }
    public void setEmail(String email)              { this.email = email; }
    public void setUsername(String username)        { this.username = username; }
    public void setCart(Map<String, Integer> cart ) { this.cart = cart; }
}
