package edu.umb.cs682.ecom.backend.payload.request;

import javax.validation.constraints.NotBlank;

public class CartRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String productID;

    private int quantity;

    public String getUsername()  { return username; }
    public String getProductID() { return productID; }
    public int getQuantity()     { return quantity; }

    public void setUsername(String username)   { this.username = username; }
    public void setProductID(String productID) { this.productID = productID; }
    public void setQuantity(int quantity)      { this.quantity = quantity; }
}
