package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.HashMap;

@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    @NotBlank
    @DBRef
    private User user;

    private HashMap<String, Integer> products;
    private HashMap<String, Float> taxes;
    private HashMap<String, Float> shipping;
    private float subtotal;
    private float total;

    public String getId()                         { return id; }
    public User getUser()                         { return user; }
    public HashMap<String, Integer> getProducts() { return products; }
    public float getSubtotal()                    { return subtotal; }
    public HashMap<String, Float> getTaxes()      { return taxes; }
    public HashMap<String, Float> getShipping()   { return shipping; }
    public float getTotal()                       { return total; }

    public void setId(String id)                               { this.id = id; }
    public void setUser(User user)                             { this.user = user; }
    public void setProducts(HashMap<String, Integer> products) { this.products = products; }
    public void setSubtotal(float subtotal)                    { this.subtotal = subtotal; }
    public void setTaxes(HashMap<String, Float> taxes)         { this.taxes = taxes; }
    public void setShipping(HashMap<String, Float> shipping)   { this.shipping = shipping; }
    public void setTotal(float total)                          { this.total = total; }
}
