package edu.umb.cs682.ecom.backend.models;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * A <code>User</code> represents Customers, Employees, and Admins for this
 * marketplace. Future implementations will also support anonymous users that
 * are able to build shopping carts that persist until login or account creation.
 */
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
    @JsonIgnore
    private String password;

    @DBRef
    private Set<Role> roles = new HashSet<>();
    private Set<String> orders = new HashSet<>();
    private HashMap<String, Integer> cart = new HashMap<>();

    /**
     * Default constructor for an User object. Only used by Spring for field injection
     */
    public User() {}

    /**
     * Constructs a new User object with the given username, email, and password.
     *
     * @param username the username for this User
     * @param email the email address for this User
     * @param password the password for this User
     */
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    /**
     * Adds the given {@link Role} to this user's roles.
     *
     * @param role the role to be added
     */
    public void addRole(Role role)    { roles.add(role); }

    /**
     * Adds the given {@link Order} to this user's list of Orders.
     *
     * @param order the {@link Order} to be added
     */
    public void addOrder(Order order) { orders.add(order.getId()); }

    /**
     * Removes the given {@link Product} from this user's cart entirely. Does
     * nothing if the product was not present in the user's cart.
     *
     * @param product the product to be removed
     * @return the previous quantity of the given product that was in this user's cart
     */
    public int removeFromCart(Product product) {
        return cart.remove(product.getId());
    }

    /**
     * Adjusts the quantity of the given product in this user's cart.
     *
     * @param productID the product to adjust the quantity of
     * @param quantity the amount by which to adjust the given product's quantity
     * @return the new quantity of the given product in the user's cart
     */
    public int adjustCart(String productID, int quantity) {
        int currentQuantity = Objects.requireNonNullElse(cart.get(productID), 0);
        int newQuantity = currentQuantity + quantity;
        if (newQuantity > 0) cart.put(productID, newQuantity);
        else cart.remove(productID);
        return Math.max(newQuantity, 0);
    }

    /**
     * Two Users are equal if their IDs are equal.
     *
     * @param other the other object to test equality against this
     * @return true if this is equal to other and false otherwise
     */
    @Override
    public boolean equals(Object other) {
        if (other == this) return true;
        if (other == null || this.getClass() != other.getClass()) return false;
        return this.getId().equals(((User) other).getId());
    }

    public String getId()                 { return id; }
    public String getUsername()           { return username; }
    public String getEmail()              { return email; }
    public String getPassword()           { return password; }
    public Set<Role> getRoles()           { return roles; }
    public Map<String, Integer> getCart() { return cart; }
    public Set<String> getOrders()        { return orders; }

    public void setId(String id)                       { this.id = id; }
    public void setUsername(String username)           { this.username = username; }
    public void setEmail(String email)                 { this.email = email; }
    public void setPassword(String password)           { this.password = password; }
    public void setRoles(Set<Role> roles)              { this.roles = roles; }
    public void setCart(HashMap<String, Integer> cart) { this.cart = cart; }
    public void setOrders(Set<String> orders)          { this.orders = orders; }
}
