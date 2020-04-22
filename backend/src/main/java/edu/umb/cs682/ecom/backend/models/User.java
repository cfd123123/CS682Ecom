package edu.umb.cs682.ecom.backend.models;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @DBRef
    private Set<Role> roles = new HashSet<>();

    private HashMap<String, Integer> cart = new HashMap<>();

    public User() {}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getId()         { return id; }
    public String getUsername()   { return username; }
    public String getEmail()      { return email; }
    public String getPassword()   { return password; }
    public Set<Role> getRoles()   { return roles; }

    public void setId(String id)             { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email)       { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRoles(Set<Role> roles)    { this.roles = roles; }

    public void addRole(Role role) { roles.add(role); }

    public Map<String, Integer> getCart() {
        return cart;
//        return cart.entrySet().stream().collect(
//                Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (k, v) -> v)
//        );
    }

    public void setCart(HashMap<String, Integer> cart) {
        this.cart = cart;
    }

    public int removeFromCart(Product product) {
        return cart.remove(product.getId());
    }

    public int adjustCart(String productID, int quantity) {
        int currentQuantity = Objects.requireNonNullElse(cart.get(productID), 0);
        int newQuantity = currentQuantity + quantity;
        if (newQuantity > 0) cart.put(productID, newQuantity);
        else cart.remove(productID);
        return Math.max(newQuantity, 0);
    }
}
