package edu.umb.cs682.ecom.backend.payload.request;

import edu.umb.cs682.ecom.backend.models.Product;

import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * <code>ProductListRequest</code> represents a request from the frontend for
 * a list of {@link Product} objects from a list of Product IDs.
 */
public class ProductListRequest {
    @NotBlank private List<String> products;

    /**
     * Default constructor, only used by Spring for field injection
     */
    public ProductListRequest() {}

    public List<String> getProducts() { return products; }
    public void setProducts(List<String> products) { this.products = products; }
}
