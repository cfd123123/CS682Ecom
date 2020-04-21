package edu.umb.cs682.ecom.backend.payload.request;

import javax.validation.constraints.NotBlank;
import java.util.Map;

public class CheckoutRequest {
    @NotBlank
    private String username;

    @NotBlank
    private Map<String, Integer> products;

    private Map<String, Float> taxes;
    private Map<String, Float> shipping;
    private float subtotal;
    private float total;

    public String getUsername()               { return username; }
    public Map<String, Integer> getProducts() { return products; }
    public Map<String, Float> getTaxes()      { return taxes; }
    public Map<String, Float> getShipping()   { return shipping; }
    public float getSubtotal()                { return subtotal; }
    public float getTotal()                   { return total; }

    public void setUsername(String username)               { this.username = username; }
    public void setProducts(Map<String, Integer> products) { this.products = products; }
    public void setTaxes(Map<String, Float> taxes)         { this.taxes = taxes; }
    public void setShipping(Map<String, Float> shipping)   { this.shipping = shipping; }
    public void setSubtotal(float subtotal)                { this.subtotal = subtotal; }
    public void setTotal(float total)                      { this.total = total; }
}
