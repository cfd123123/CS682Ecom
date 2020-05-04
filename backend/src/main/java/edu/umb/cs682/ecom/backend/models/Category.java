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

    Set<String> products = new HashSet<>();

    public Category() {}
    public Category(String name) {
        this.name = normalizeName(name);
    }

    public Category(String name, Set<String> products) {
        this.name = normalizeName(name);
        this.products = products;
    }

    private String normalizeName(String name) {
        return name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase();
    }

    public Category addProduct(String toBeAdded) {
        products.add(toBeAdded);
        return this;
    }

    public Category deleteProduct(String toBeDeleted) {
        products.remove(toBeDeleted);
        return this;
    }

    public String getId()            { return id; }
    public String getName()          { return name; }
    public Set<String> getProducts() { return products; }

    public void setProducts(Set<String> products) { this.products = products; }
    public void setName(String name)              { this.name = name; }
    public void setId(String id)                  { this.id = id; }

}
