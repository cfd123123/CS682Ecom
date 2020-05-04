package edu.umb.cs682.ecom.backend.payload.request;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class ProductListRequest {
    @NotBlank
    private List<String> products;

    public List<String> getProducts() { return products; }
    public void setProducts(List<String> products) { this.products = products; }
}
