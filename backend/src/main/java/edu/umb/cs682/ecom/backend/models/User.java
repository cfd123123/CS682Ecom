package edu.umb.cs682.ecom.backend.models;

import java.util.HashSet;
import java.util.Set;

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

    @DBRef
    private Set<Product> cart = new HashSet<>();

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
    public Set<Product> getCart() { return cart; }

    public void setId(String id)             { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email)       { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRoles(Set<Role> roles)    { this.roles = roles; }
    public void setCart(Set<Product> cart)   { this.cart = cart; }

    public String getProfile() {
        StringBuilder sb = new StringBuilder().append("{\"username\":\"").append(username).append("\",\"email\":\"").append(email).append("\",\"roles\":[");
        boolean first = true;
        for (Role role : roles) {
            if (first && !(first = false)) sb.append("\"");
            else sb.append(",\"");
            sb.append(role.getName()).append("\"");
        }
        sb.append("],\"cart\":[");
        first = true;
        for (Product product : cart) {
            if (first && !(first = false)) sb.append("\"");
            else sb.append(",\"");
            sb.append(product.getId()).append("\"");
        }
        sb.append("]}");
        return sb.toString();
    }
}
