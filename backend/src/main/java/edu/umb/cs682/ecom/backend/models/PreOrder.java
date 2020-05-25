package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.Map;

/**
 * A PreOrder provides a {@link User} with the details of their order before the
 * order is confirmed and paid for.
 * <p>
 *     WARNING: This class is incomplete, as the MongoDB backing this software
 *     product does not properly expire PreOrders after the specified time limit.
 *     Future implementations will fix this bug.
 * </p>
 */
@Document(collection = "preorders")
public class PreOrder {
    @Id
    private String id;

    @Field
    @Indexed(name="issuedDate", expireAfter="10m")
    private Date issued;

    @Field
    @Indexed(name="expiresDate", expireAfterSeconds = 0)
    private Date expires;

    @DBRef
    @NotBlank private User user;
    @NotBlank private Map<String, Integer> products;
    @NotBlank private Map<String, Float> taxes;
    @NotBlank private Map<String, Float> shipping;
    @NotBlank private float subtotal;
    @NotBlank private float total;

    /**
     * Constructs a new PreOrder object with the given details.
     *
     * @param issued the {@link Date} that this PreOrder was issued
     * @param expires the {@link Date} that this PreOrder expires
     * @param user the {@link User} to which this PreOrder belongs
     * @param products the map of product IDs and corresponding quantities in this PreOrder
     * @param taxes the total taxes for this PreOrder
     * @param shipping the total shipping cost for this PreOrder
     * @param subtotal the product subtotal for this PreOrder, before taxes and shipping
     * @param total the total price for this PreOrder, after shipping and taxes
     */
    public PreOrder(Date issued, Date expires, @NotBlank User user,
                    @NotBlank Map<String, Integer> products, @NotBlank Map<String, Float> taxes,
                    @NotBlank Map<String, Float> shipping, @NotBlank float subtotal, @NotBlank float total) {
        this.issued = issued;
        this.expires = expires;
        this.user = user;
        this.products = products;
        this.taxes = taxes;
        this.shipping = shipping;
        this.subtotal = subtotal;
        this.total = total;
    }

    public String getId()                     { return id; }
    public Date getIssued()                   { return issued; }
    public Date getExpires()                  { return expires; }
    public User getUser()                     { return user; }
    public Map<String, Integer> getProducts() { return products; }
    public float getSubtotal()                { return subtotal; }
    public Map<String, Float> getTaxes()      { return taxes; }
    public Map<String, Float> getShipping()   { return shipping; }
    public float getTotal()                   { return total; }

    public void setId(String id)                           { this.id = id; }
    public void setIssued(Date issued)                     { this.issued = issued; }
    public void setExpires(Date expires)                   { this.expires = expires; }
    public void setUser(User user)                         { this.user = user; }
    public void setProducts(Map<String, Integer> products) { this.products = products; }
    public void setSubtotal(float subtotal)                { this.subtotal = subtotal; }
    public void setTaxes(Map<String, Float> taxes)         { this.taxes = taxes; }
    public void setShipping(Map<String, Float> shipping)   { this.shipping = shipping; }
    public void setTotal(float total)                      { this.total = total; }
}
