package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    @NotBlank
    @DBRef
    private User user;

    @NotBlank private Map<String, Integer> products;
    @NotBlank private Map<String, Float> taxes;
    @NotBlank private Map<String, Float> shipping;
    @NotBlank private float subtotal;
    @NotBlank private float total;

    public Order(@NotBlank User user, @NotBlank Map<String, Integer> products, @NotBlank Map<String, Float> taxes,
                 @NotBlank Map<String, Float> shipping, @NotBlank float subtotal, @NotBlank float total) {
        this.user = user;
        this.products = products;
        this.taxes = taxes;
        this.shipping = shipping;
        this.subtotal = subtotal;
        this.total = total;
    }

    public Order(@NotBlank PreOrder preOrder) {
        this(preOrder.getUser(), preOrder.getProducts(), preOrder.getTaxes(), preOrder.getShipping(), preOrder.getSubtotal(), preOrder.getTotal());
    }

    public String getId()                     { return id; }
    public User getUser()                     { return user; }
    public Map<String, Integer> getProducts() { return products; }
    public float getSubtotal()                { return subtotal; }
    public Map<String, Float> getTaxes()      { return taxes; }
    public Map<String, Float> getShipping()   { return shipping; }
    public float getTotal()                   { return total; }

    public void setId(String id)                           { this.id = id; }
    public void setUser(User user)                         { this.user = user; }
    public void setProducts(Map<String, Integer> products) { this.products = products; }
    public void setSubtotal(float subtotal)                { this.subtotal = subtotal; }
    public void setTaxes(Map<String, Float> taxes)         { this.taxes = taxes; }
    public void setShipping(Map<String, Float> shipping)   { this.shipping = shipping; }
    public void setTotal(float total)                      { this.total = total; }
}
