package edu.umb.cs682.ecom.backend.payload.response;

import edu.umb.cs682.ecom.backend.models.Product;

import java.util.List;

public class CartResponse {
    boolean loggedIn;
    Iterable<Product> products;

    public CartResponse(boolean loggedIn, List<Product> products) {
        this.loggedIn = loggedIn;
        this.products = products;
    }

    public boolean getLoggedIn()       { return loggedIn; }
    public Iterable<Product> getProducts() { return products; }

    public void setLoggedIn(boolean loggedIn)       { this.loggedIn = loggedIn; }
    public void setProducts(List<Product> products) { this.products = products; }
}
