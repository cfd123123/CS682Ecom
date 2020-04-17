package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import edu.umb.cs682.ecom.backend.models.Category;
import java.util.LinkedList;

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
    LinkedList<Category> categories;
    float rating;
    String manufacturer;


    public Product() {
    }

    public Product(String name, String shortDescription, String longDescription, float price, int quantity) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.price = price;
        this.quantity = quantity;
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


}
