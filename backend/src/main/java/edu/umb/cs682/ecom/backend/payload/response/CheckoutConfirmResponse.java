package edu.umb.cs682.ecom.backend.payload.response;

import edu.umb.cs682.ecom.backend.models.Product;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Map;

public class CheckoutConfirmResponse {
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

    public CheckoutConfirmResponse(@NotBlank String username, @NotBlank String preOrder, @NotBlank Map<String, Integer> cart,
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
