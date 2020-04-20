package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import edu.umb.cs682.ecom.backend.models.Product;
import java.util.List;

@Document(collection = "categories")
public class Category {
    @Id
    String id;
    String name;

    List<Product> products;

    public Category(String name) {
        this.name = this.normalizeName(name);
    }

    private String normalizeName(String name) {
        return name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase();
    }


    public Category() {
    }

    public Category(String name, List<Product> products) {
      this.name = name;
      this.products = products;
    }

    public String getId() { return id; }
    public void   setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void   setName(String name) { this.name = name; }

    public void setProducts(List<Product> products){
      this.products = products;
    }
    public List<Product> getProducts(){
      return this.products;
    }

}
