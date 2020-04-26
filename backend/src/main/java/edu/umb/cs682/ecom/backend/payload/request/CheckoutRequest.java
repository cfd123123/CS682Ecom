package edu.umb.cs682.ecom.backend.payload.request;

import javax.validation.constraints.NotBlank;
import java.util.Map;

public class CheckoutRequest {
    @NotBlank
    private String username;

    private Map<String, Integer> products;

    private float subtotal;

    public String getUsername()               { return username; }
    public Map<String, Integer> getProducts() { return products; }
    public float getSubtotal()                { return subtotal; }

    public void setUsername(String username)               { this.username = username; }
    public void setProducts(Map<String, Integer> products) { this.products = products; }
    public void setSubtotal(float subtotal)                { this.subtotal = subtotal; }
}
