package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.Category;
import edu.umb.cs682.ecom.backend.repositories.CategoryRepository;
import edu.umb.cs682.ecom.backend.payload.request.ProductListRequest;
import edu.umb.cs682.ecom.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

/**
 * ProductController manages requests from the frontend related to Products.
 *
 * The methods in this class directly correspond to the functions in the
 * product.service.js frontend class.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    /**
     * Gets a list of all products currently on offer.
     *
     * WARNING: Responses to this mapping may be significantly delayed due to
     * the size of the response data, particularly for marketplaces with large
     * product offerings.
     *
     * The corresponding frontend requester is the getAllProducts()
     * function in the product.service.js class.
     *
     * @return the list of all products currently in the database
     */
    @GetMapping("/all")
    public Iterable<Product> allProducts() {
        return productRepository.findAll();
    }

    /**
     * Saves the given product to the database. Only Employees and Admins have
     * access to this mapping.
     *
     * If the given product is associated with any categories, those categories
     * are updated to include the given product in their lists of products.
     *
     * The corresponding frontend requester is the addProduct() function in
     * the product.service.js class.
     *
     * @param product the product to be saved
     * @return the saved product including its product ID
     */
    @PostMapping("/all")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and (hasRole('EMPLOYEE') or hasRole('ADMIN'))")
    public Product saveProduct(@RequestBody Product product) {
        // Save product to generate product ID.
        product = productRepository.save(product);

        Set<String> categories = new HashSet<>();
        for (String curr : product.getCategories()) {
            // Format the current category name
            String name = curr.substring(0, 1).toUpperCase() + curr.substring(1).toLowerCase();
            // Find the category by name or save a new category
            Category category = categoryRepository.existsByName(name)
                    ? categoryRepository.findByName(name)
                    : categoryRepository.save(new Category(name));
            // Add product to the category's product list
            category.addProduct(product.getId());
            // Add the category ID to the product's category list
            categories.add(categoryRepository.save(category).getId());
        }
        // Replace product's category set (was set of names, now set of IDs)
        product.setCategories(categories);
        // Save and return product
        return productRepository.save(product);
    }

    /**
     * Updates an existing product using data from the given product. Only
     * Employees and Admins have access to this mapping.
     *
     * This method iterates through the product's categories, adding or
     * removing the product from the category if necessary.
     * The frontend uses category names, but category IDs are stored in products.
     * As a result, effort is made to parse through the categories as needed.
     *
     * The corresponding frontend requester is the updateProduct() function in
     * the product.service.js class.
     *
     * @param id the product ID to be updated
     * @param product the product's new data
     * @return the updated product
     */
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
        Product existingProduct = productRepository.findById(id).orElseThrow();
        
        Set<String> existingCategories = existingProduct.getCategories();
        Set<String> newCategories = product.getCategories();

        // To hold the merged category sets after update/create/removal
        Set<String> categories = new HashSet<>();

        for (String curr : newCategories) {
            if (existingCategories.remove(curr)) {
                // If a category hasn't changed, add it to the final set and continue
                categories.add(curr);
                continue;
            }
            Category category;
            if (categoryRepository.existsById(curr)) {
                // If the current category is an ID (rather than a name), find it
                category = categoryRepository.findById(curr).orElseThrow();
            } else {
                // Otherwise, find it by name or create a new category
                String name = curr.substring(0, 1).toUpperCase() + curr.substring(1).toLowerCase();
                if (categoryRepository.existsByName(name)) {
                    category = categoryRepository.findByName(name);
                    existingCategories.remove(category.getId());
                } else {
                    category = categoryRepository.save(new Category(curr));
                }
            }
            // Make sure the category has this product in its list
            category.addProduct(existingProduct.getId());
            // Then add the category to the final set and continue
            categories.add(categoryRepository.save(category).getId());
        }
        // If there are any categories left in existingCategories, it means
        // they should be removed from the product's category list, and the
        // product should be removed from the category's product list.
        for (String curr : existingCategories) {
            Category category = categoryRepository.findById(curr).orElseThrow();
            category.deleteProduct(existingProduct.getId());
            categoryRepository.save(category);
        }
        // Finally, update the product with the new details, then set its category
        // list to the final set we created above.
        existingProduct.updateProduct(product);
        existingProduct.setCategories(categories);
        return productRepository.save(existingProduct);
    }

    /**
     * Gets a list of Product objects from the given list of Product IDs.
     *
     * The corresponding frontend requester is the getListOfProducts() function
     * in the product.service.js class.
     *
     * @param products the list of Product IDs
     * @return the list of Product objects
     */
    @PostMapping("/list")
    public Iterable<Product> listOfProducts(@RequestBody ProductListRequest products) {
        return productRepository.findByIdIn(products.getProducts());
    }

    /**
     * Gets a single product object by the given product ID.
     *
     * The corresponding frontend requester is the getSingleProduct() function
     * in the product.service.js class.
     *
     * @param id the id of the Product object to be returned
     * @return the Product object with the given ID
     */
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable String id) {
        return productRepository.findById(id).orElseThrow();
    }

    /**
     * Deletes the Product in the database corresponding to the given Product ID.
     * Only Employees and Admins have access to this mapping.
     *
     * This method also removes the given product ID from any categories which
     * may contain it in its list of products.
     *
     * The corresponding frontend requester is the deleteProduct function in
     * the product.service.js class.
     *
     * @param id the ID of the product to be deleted
     * @return a confirmation message if the product was deleted successfully.
     */
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable String id) {
        Product product = productRepository.findById(id).orElseThrow();
        for (String curr : product.getCategories()) {
          categoryRepository.save(categoryRepository.findByName(curr).deleteProduct(product.getId()));
        }
        productRepository.delete(product);
        return "Product deleted and removed from any categories to which it belonged";
    }
}
