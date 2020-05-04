package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Category;
import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.repositories.CategoryRepository;
import edu.umb.cs682.ecom.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/all")
    public Iterable<Category> allCategories() {
        List<Category> result = categoryRepository.findAll();
        System.err.printf("\n\n%s\n\n", result.toString());
        for (Category category : result) {
            System.err.printf("Category.getProducts().toString(): %s\n", category.getProducts().toString());
            for (String product : category.getProducts()) {
                System.err.printf("\tproduct.getId(): %s\n", product);
            }
        }
        return result;
    }

    @PostMapping("/all")
    public Category save(@RequestBody Category category) {
        category = categoryRepository.save(category);

        return category;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        Category category = categoryRepository.findById(id).orElseThrow();
        for (String productID : category.getProducts()) {
            productRepository.findById(productID).orElseThrow().removeCategory(category.getId());
        }
        categoryRepository.delete(category);

        return "Category deleted and removed from any Products to which it belonged";
    }

    @GetMapping("/{name}")
    public Iterable<Product> getCategoryProducts(@PathVariable String name) {
        Set<Product> products = new HashSet<>();
        for (String productID : categoryRepository.findByName(name).getProducts()) {
            products.add(productRepository.findById(productID).orElseThrow());
        }
        return products;
    }


}
