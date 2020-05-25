package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Category;
import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.payload.request.CategoryListRequest;
import edu.umb.cs682.ecom.backend.repositories.CategoryRepository;
import edu.umb.cs682.ecom.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

/**
 * CategoryController manages requests from the frontend related to
 * {@link Category} objects.
 *
 * The methods in this class directly correspond to the functions in the
 * CategoryService.js frontend class.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductRepository productRepository;

    /**
     * Gets a list of all categories in the database.
     *
     * The corresponding frontend requester is the getAll()
     * function in the CategoryService.js class.
     *
     * @return a list of all categories currently in the database.
     */
    @GetMapping("/all")
    public Iterable<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Saves a new category to the database. Only Employees and Admins can
     * access this mapping.
     *
     * The corresponding frontend requester is the saveCategory()
     * function in the CategoryService.js class.
     *
     * @param category the new category to be saved
     * @return the saved category, including the unique identifier after saving
     */
    @PostMapping("/all")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and (hasRole('EMPLOYEE') or hasRole('ADMIN'))")
    public Category saveCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    /**
     * Deletes the category corresponding to the given id from the database. This
     * method also removes the category from any product which belongs to it. Only
     * Employees and Admins can access this mapping.
     *
     * The corresponding frontend requester is the deleteCategory()
     * function in the CategoryService.js class.
     *
     * @param id the id of the category to be removed
     * @return a confirmation message that removal was successful
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and (hasRole('EMPLOYEE') or hasRole('ADMIN'))")
    public String deleteCategory(@PathVariable String id) {
        Category category = categoryRepository.findById(id).orElseThrow();
        for (String productID : category.getProducts()) {
            productRepository.findById(productID).orElseThrow().removeCategory(category.getId());
        }
        categoryRepository.delete(category);

        return "Category deleted and removed from any Products to which it belonged";
    }

    /**
     * Gets all products belonging to the given category.
     *
     * The corresponding frontend requester is the getCategoryProducts()
     * function in the CategoryService.js class.
     *
     * @param name the name of the category to get products of
     * @return a list of the products belonging to the category
     */
    @GetMapping("/{name}")
    public Iterable<Product> getCategoryProducts(@PathVariable String name) {
        Set<Product> products = new HashSet<>();
        for (String productID : categoryRepository.findByName(name).getProducts()) {
            products.add(productRepository.findById(productID).orElseThrow());
        }
        return products;
    }

    /**
     * Gets all categories contained in a list of category IDs.
     *
     * The corresponding frontend requester is the getListOfCategories() function
     * in the CategoryService.js class.
     *
     * @param categoryIDs the list of Category IDs for which details are required
     * @return the list of Category objects.
     */
    @PostMapping("/list")
    public Iterable<Category> getCategoryList(@RequestBody CategoryListRequest categoryIDs) {
        return categoryRepository.findAllById(categoryIDs.getCategoryIDs());
    }
}
