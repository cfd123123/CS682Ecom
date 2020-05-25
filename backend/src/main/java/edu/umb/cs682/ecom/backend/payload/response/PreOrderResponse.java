package edu.umb.cs682.ecom.backend.payload.response;

import edu.umb.cs682.ecom.backend.models.PreOrder;
import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.User;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Map;

/**
 * <code>PreOrderResponse</code> represents a response to the frontend with
 * {@link PreOrder} details that the {@link User} must confirm before placing
 * their order.
 */
public class PreOrderResponse {
    @NotBlank private String username;
    @NotBlank private String preOrder;
    @NotBlank private Map<String, Integer> cart;
    @NotBlank private List<Product> products;
    @NotBlank private Map<String, Float> taxes;
    @NotBlank private Map<String, Float> shipping;
    @NotBlank private int itemCount;
    @NotBlank private float subtotal;
    @NotBlank private float shippingCost;
    @NotBlank private float taxCost;
    @NotBlank private float total;

    /**
     * Constructs a new PreOrderResponse object with the given details.
     *
     * @param username the username of the {@link User} that will place the order
     * @param preOrder the ID of the {@link PreOrder} generated for the user
     * @param cart the shopping cart details for the {@link PreOrder}
     * @param products the list of {@link Product Products} in the {@link PreOrder}
     * @param taxes the list of taxes in the {@link PreOrder}
     * @param shipping the list of shipping charges in the {@link PreOrder}
     * @param itemCount the total item count in the {@link PreOrder}
     * @param subtotal the subtotal of the {@link PreOrder}
     * @param shippingCost the total shipping cost of the {@link PreOrder}
     * @param taxCost the total taxes of the {@link PreOrder}
     * @param total the grand total price of the {@link PreOrder}
     */
    public PreOrderResponse(@NotBlank String username, @NotBlank String preOrder, @NotBlank Map<String, Integer> cart,
                            @NotBlank List<Product> products, @NotBlank Map<String, Float> taxes,
                            @NotBlank Map<String, Float> shipping, @NotBlank int itemCount, @NotBlank float subtotal,
                            @NotBlank float shippingCost, @NotBlank float taxCost, @NotBlank float total) {
        this.username = username;
        this.preOrder = preOrder;
        this.cart = cart;
        this.products = products;
        this.taxes = taxes;
        this.shipping = shipping;
        this.itemCount = itemCount;
        this.subtotal = subtotal;
        this.shippingCost = shippingCost;
        this.taxCost = taxCost;
        this.total = total;
    }

    public String getUsername()             { return username; }
    public String getPreOrder()             { return preOrder; }
    public Map<String, Integer> getCart()   { return cart; }
    public List<Product> getProducts()      { return products; }
    public Map<String, Float> getTaxes()    { return taxes; }
    public Map<String, Float> getShipping() { return shipping; }
    public int getItemCount()               { return itemCount; }
    public float getSubtotal()              { return subtotal; }
    public float getShippingCost()          { return shippingCost; }
    public float getTaxCost()               { return taxCost; }
    public float getTotal()                 { return total; }

    public void setUsername(String username)             { this.username = username; }
    public void setPreOrder(String preOrder)             { this.preOrder = preOrder; }
    public void setCart(Map<String, Integer> cart)       { this.cart = cart; }
    public void setProducts(List<Product> products)      { this.products = products; }
    public void setTaxes(Map<String, Float> taxes)       { this.taxes = taxes; }
    public void setShipping(Map<String, Float> shipping) { this.shipping = shipping; }
    public void setItemCount(int itemCount)              { this.itemCount = itemCount; }
    public void setSubtotal(float subtotal)              { this.subtotal = subtotal; }
    public void setShippingCost(float shippingCost)      { this.shippingCost = shippingCost; }
    public void setTaxCost(float taxCost)                { this.taxCost = taxCost; }
    public void setTotal(float total)                    { this.total = total; }
}
