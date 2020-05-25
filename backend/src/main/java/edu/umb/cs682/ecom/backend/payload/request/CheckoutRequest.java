package edu.umb.cs682.ecom.backend.payload.request;

import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.User;

import javax.validation.constraints.NotBlank;
import java.util.Map;

/**
 * <code>CheckoutRequest</code> represents a request from the frontend for a
 * {@link User} to begin the checkout process. A <code>CheckoutRequest</code>
 * contains a username, cart details in the form a {@link Product} IDs together
 * with a quantity, and a cart subtotal.
 */
public class CheckoutRequest {
    @NotBlank private String username;
    private Map<String, Integer> products;
    private float subtotal;

    /**
     * Default constructor, only used by Spring for field injection
     */
    public CheckoutRequest() {}

    public String getUsername()               { return username; }
    public Map<String, Integer> getProducts() { return products; }
    public float getSubtotal()                { return subtotal; }

    public void setUsername(String username)               { this.username = username; }
    public void setProducts(Map<String, Integer> products) { this.products = products; }
    public void setSubtotal(float subtotal)                { this.subtotal = subtotal; }
}
