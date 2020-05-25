package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.Map;

/**
 * Order contains details of an order places by a {@link User}.
 */
@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    @NotBlank
    @DBRef
    private User user;

    private Date orderDate;

    @NotBlank private Map<String, Integer> products;
    @NotBlank private Map<String, Float> taxes;
    @NotBlank private Map<String, Float> shipping;
    @NotBlank private float subtotal;
    @NotBlank private float total;

    /**
     * Default constructor for an Order object. Only used by Spring for field injection
     */
    public Order() {}

    /**
     * Constructs a new Order object with the given values.
     *
     * @param user the {@link User} to which this Order belongs
     * @param products the map of product IDs and corresponding quantities in this order
     * @param taxes the total taxes for this order
     * @param shipping the total shipping cost for this order
     * @param subtotal the product subtotal for this order, before taxes and shipping
     * @param total the total price for this order, after shipping and taxes
     */
    public Order(@NotBlank User user, @NotBlank Map<String, Integer> products, @NotBlank Map<String, Float> taxes,
                 @NotBlank Map<String, Float> shipping, @NotBlank float subtotal, @NotBlank float total) {
        this.user = user;
        this.products = products;
        this.taxes = taxes;
        this.shipping = shipping;
        this.subtotal = subtotal;
        this.total = total;
        this.orderDate = new Date();
    }

    /**
     * Constructs an Order object using the details from an existing
     * {@link PreOrder}.
     *
     * @param preOrder the PreOrder from which this Order will be constructed
     */
    public Order(@NotBlank PreOrder preOrder) {
        this(preOrder.getUser(), preOrder.getProducts(), preOrder.getTaxes(),
                preOrder.getShipping(), preOrder.getSubtotal(), preOrder.getTotal());
    }

    public String getId()                     { return id; }
    public User getUser()                     { return user; }
    public Map<String, Integer> getProducts() { return products; }
    public float getSubtotal()                { return subtotal; }
    public Map<String, Float> getTaxes()      { return taxes; }
    public Map<String, Float> getShipping()   { return shipping; }
    public float getTotal()                   { return total; }
    public Date getOrderDate()                { return orderDate; }

    public void setId(String id)                           { this.id = id; }
    public void setUser(User user)                         { this.user = user; }
    public void setProducts(Map<String, Integer> products) { this.products = products; }
    public void setSubtotal(float subtotal)                { this.subtotal = subtotal; }
    public void setTaxes(Map<String, Float> taxes)         { this.taxes = taxes; }
    public void setShipping(Map<String, Float> shipping)   { this.shipping = shipping; }
    public void setTotal(float total)                      { this.total = total; }
    public void setOrderDate(Date orderDate)               { this.orderDate = orderDate; }
}
