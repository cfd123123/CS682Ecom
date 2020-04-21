package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "products")
public class Product {
    @Id
    String id;
    String name;
    String shortDescription;
    String longDescription;
    float price;
    int quantity;
    ProductSpecifications specs;
    String image;

    Set<String> categories = new HashSet<>();

    public Product() {
    }

    public Product(String name, String shortDescription, String longDescription, float price, int quantity, Set<String> categories) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.price = price;
        this.quantity = quantity;
        for (String category : categories) {
            this.categories.add(category.substring(0,1).toUpperCase() + category.substring(1).toLowerCase());
        }
    }

    public String getId() { return id; }
    public void   setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void   setName(String name) { this.name = name; }

    public String getShortDescription() { return shortDescription; }
    public void   setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getLongDescription() { return longDescription; }
    public void   setLongDescription(String longDescription) { this.longDescription = longDescription; }

    public float getPrice() { return this.price; }
    public void  setPrice(float price) { this.price = price; }

    public int  getQuantity() { return this.quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public Set<String>  getCategories() { return this.categories; }
    public void setCategories(Set<String> categories) { this.categories = categories; }

}
