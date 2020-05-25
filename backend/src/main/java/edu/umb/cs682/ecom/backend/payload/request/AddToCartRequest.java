package edu.umb.cs682.ecom.backend.payload.request;

import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.User;

import javax.validation.constraints.NotBlank;

/**
 * <code>AddToCartRequest</code> represents a request from the frontend to add
 * some quantity of a {@link Product} to a {@link User User's} cart. An
 * <code>AddToCartRequest</code> contains a username, product ID, and quantity.
 */
public class AddToCartRequest {
    @NotBlank private String username;
    @NotBlank private String productID;
    private int quantity;

    /**
     * Default constructor, only used by Spring for field injection
     */
    public AddToCartRequest() {}

    public String getUsername()  { return username; }
    public String getProductID() { return productID; }
    public int getQuantity()     { return quantity; }

    public void setUsername(String username)   { this.username = username; }
    public void setProductID(String productID) { this.productID = productID; }
    public void setQuantity(int quantity)      { this.quantity = quantity; }
}
