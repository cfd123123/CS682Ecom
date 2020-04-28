package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "categories")
public class Category {
    @Id
    String id;

    @NotBlank
    String name;

    Set<Product> products = new HashSet<>();

    public Category(String name) {
        this.name = this.normalizeName(name);
    }

    private String normalizeName(String name) {
        return name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase();
    }


    public Category() {
    }

    public Category(String name, Set<Product> products) {
      this.name = name;
      this.products = products;
    }

    public Category addProduct(Product toBeAdded) {
        products.add(toBeAdded);
        return this;
    }

    public Category deleteProduct(Product toBeDeleted) {
        products.remove(toBeDeleted);
        return this;
    }

    public String getId() { return id; }
    public void   setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void   setName(String name) { this.name = name; }

    public void setProducts(Set<Product> products){
      this.products = products;
    }
    public Set<Product> getProducts(){
      return this.products;
    }

}
