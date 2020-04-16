package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
public class Category {
    @Id
    String id;
    String name;

    public Category(String name) {
        this.name = this.normalizeName(name);
    }

    private String normalizeName(String name) {
        return name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase();
    }

    public String getId() { return id; }
    public void   setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void   setName(String name) { this.name = name; }

    public Boolean equals(Category other) {
        return other.getName().equals(this.name);
    }
}
