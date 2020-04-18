package edu.umb.cs682.ecom.backend.payload.response;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class ProfileResponse {
    private String id;
    private String username;
    private String email;
    private List<String> roles;
    private Set<Map.Entry<String, Integer>> cart;

    public ProfileResponse(String id, String username, String email, Map<String, Integer> cart) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.cart = cart.entrySet();
    }

    public String getId()       { return id; }
    public String getEmail()    { return email; }
    public String getUsername() { return username; }

    public void setId(String id)             { this.id = id; }
    public void setEmail(String email)       { this.email = email; }
    public void setUsername(String username) { this.username = username; }

    public Set<Map.Entry<String, Integer>> getCart() { return cart; }
    public void setCart(Map<String, Integer> cart)   { this.cart = cart.entrySet(); }
}
