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

    public Product() {}
    public Product(String name, String shortDescription, String longDescription, float price, int quantity, Set<String> categories, String image) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.price = price;
        this.quantity = quantity;
        for (String category : categories) {
            this.categories.add(category.substring(0,1).toUpperCase() + category.substring(1).toLowerCase());
        }
        this.image = image;
    }

    public void updateProduct(Product that) {
        if (that.getName() != null) this.setName(that.getName());
        if (that.getShortDescription() != null) this.setShortDescription(that.getShortDescription());
        if (that.getLongDescription() != null) this.setLongDescription(that.getLongDescription());
        this.setPrice(that.getPrice());
        this.setQuantity(that.getQuantity());
        if (that.getImage() != null) this.setImage(that.getImage());
        if (that.getCategories() != null) this.setCategories(that.getCategories());
    }

    public String getId()               { return id; }
    public String getName()             { return name; }
    public String getShortDescription() { return shortDescription; }
    public String getLongDescription()  { return longDescription; }
    public float  getPrice()            { return this.price; }
    public int    getQuantity()         { return this.quantity; }
    public String getImage()            { return this.image; }
    public Set<String> getCategories()  { return categories; }

    public void setId(String id)                             { this.id = id; }
    public void setName(String name)                         { this.name = name; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public void setLongDescription(String longDescription)   { this.longDescription = longDescription; }
    public void setPrice(float price)                        { this.price = price; }
    public void setQuantity(int quantity)                    { this.quantity = quantity; }
    public void setImage(String image)                       { this.image = image; }
    public void setCategories(Set<String> categories)        { this.categories = categories; }

    public void insertOtherCategories() { categories.add("Others");}
    public void removeCategory(String categoryID) { categories.remove(categoryID); }

}
