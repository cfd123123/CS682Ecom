package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

/**
 * A Category represents a family of {@link Product}s. Each Category may contain
 * multiple Products, and each Product may belong to multiple Categories.
 */
@Document(collection = "categories")
public class Category {
    @Id
    private String id;

    @NotBlank
    private String name;

    private Set<String> products = new HashSet<>();

    /**
     * Default constructor for a Category object. Only used by Spring for field injection
     */
    public Category() {}

    /**
     * Constructs a new Category object with the given name. The capitalization
     * of the category's name will be normalized.
     *
     * @param name the name of the new category
     */
    public Category(String name) {
        this.name = normalizeName(name);
    }

    /**
     * Normalizes a category's name such that the first letter is capitalized
     * and all remaining letters are lower-case.
     *
     * @param name the name to be normalized
     * @return the normalized name
     */
    private String normalizeName(String name) {
        return name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase();
    }

    /**
     * Adds the given {@link Product}'s ID to this category's set of products.
     *
     * @param toBeAdded the id of the Product to be added
     * @return an instance of this Category object
     */
    public Category addProduct(String toBeAdded) {
        products.add(toBeAdded);
        return this;
    }

    /**
     * Removes the given {@link Product}'s ID from this category's set of products.
     *
     * @param toBeDeleted the id of the Product to be removed
     * @return an instance of this Category object
     */
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
