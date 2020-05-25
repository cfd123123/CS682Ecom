package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

/**
 * Product represents a commercial product to be sold in the online marketplace.
 */
@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String shortDescription;
    private String longDescription;
    private float price;
    private int quantity;
    private String image;
    private Set<String> categories = new HashSet<>();

    /**
     * Default constructor for an Product object. Only used by Spring for field injection
     */
    public Product() {}

    /**
     * Constructs a new Product object with the given details.
     *
     * @param name the name of this Product
     * @param shortDescription a short description of this Product
     * @param longDescription a longer description of this Product
     * @param price the price of this Product
     * @param quantity the initially available quantity of this Product
     * @param categories the set of {@link Category Categories} to which this Product will initially belong
     * @param image URL to an image of this Product
     */
    public Product(String name, String shortDescription, String longDescription,
                   float price, int quantity, Set<String> categories, String image) {
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

    /**
     * Updates this Product using the details of the given Product.
     * <p>
     *     The otherProduct argument to this method is typically a Product object
     *     that is automatically generated from a frontend request, which lacks
     *     a Product ID as it has not been saved to the database.
     * </p>
     * @param otherProduct the Product from which new values are received
     */
    public void updateProduct(Product otherProduct) {
        if (otherProduct.getName() != null) this.setName(otherProduct.getName());
        if (otherProduct.getShortDescription() != null) this.setShortDescription(otherProduct.getShortDescription());
        if (otherProduct.getLongDescription() != null) this.setLongDescription(otherProduct.getLongDescription());
        this.setPrice(otherProduct.getPrice());
        this.setQuantity(otherProduct.getQuantity());
        if (otherProduct.getImage() != null) this.setImage(otherProduct.getImage());
        if (otherProduct.getCategories() != null) this.setCategories(otherProduct.getCategories());
    }

    /**
     * Removes the {@link Category} by the given categoryID from this product's
     * list of Categories.
     *
     * @param categoryID the ID of the category to be removed
     */
    public void removeCategory(String categoryID) { categories.remove(categoryID); }

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
}
