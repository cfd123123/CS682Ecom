package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
    @Id
    String id;
    String name;
    String shortDescription;
    String longDescription;

    public Product() {
    }

    public Product(String name, String shortDescripton, String longDescription) {
        this.name = name;
        this.shortDescription = shortDescripton;
        this.longDescription = longDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescripton) {
        this.shortDescription = shortDescripton;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }
}