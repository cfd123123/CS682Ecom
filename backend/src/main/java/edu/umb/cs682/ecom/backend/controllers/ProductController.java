package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.Category;
import edu.umb.cs682.ecom.backend.repositories.CategoryRepository;
import edu.umb.cs682.ecom.backend.payload.request.ProductListRequest;
import edu.umb.cs682.ecom.backend.payload.response.CartResponse;
import edu.umb.cs682.ecom.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
import java.util.Optional;
import java.util.Set;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/all")
    public Iterable<Product> product() {
        return productRepository.findAll();
    }

    @PostMapping("/{id}")
    public Product save(@PathVariable String id, @RequestBody Product product) {
        System.err.printf("\n\nproduct.getCategories: %s\n\n", product.getCategories());
        Set<String> categories = new HashSet<>();
        // Step 1: Save product to generate product ID.
        product = productRepository.save(product);

        for (String curr : product.getCategories()) {
            String name = curr.substring(0, 1).toUpperCase() + curr.substring(1).toLowerCase();
            Category category;
            // Step 2: Save or find category by name
            if (!categoryRepository.existsByName(name)) {
                category = categoryRepository.save(new Category(curr));
            } else {
                category = categoryRepository.findByName(name);
            }
            // Step 3: Add product to category
            category.addProduct(product.getId());
            categories.add(categoryRepository.save(category).getId());
        }
        // Step 4: Replace product's category set (was set of names, now set of IDs)
        product.setCategories(categories);
        // Step 5: save and return product
        return productRepository.save(product);
    }

    @PostMapping("/list")
    public CartResponse listOfProducts(@RequestBody ProductListRequest products) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        System.err.printf("\n\nauth: %s\n", auth);
//        System.err.printf("auth.getPrincipal(): %s\n", auth.getPrincipal());
//        System.err.printf("auth.getAuthorities(): %s\n\n", auth.getAuthorities());
//        System.err.printf("auth instanceof AnonymousAuthenticationToken: %s\n\n", auth instanceof AnonymousAuthenticationToken);
        boolean loggedIn = auth instanceof UsernamePasswordAuthenticationToken;

        return new CartResponse(loggedIn, productRepository.findByIdIn(products.getProducts()));
    }

    @GetMapping("/{id}")
    public Product show(@PathVariable String id) {
        System.err.printf("\n\n%s\n\n", id);
        return productRepository.findById(id).orElseThrow();
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable String id, @RequestBody Product product) {
        Optional<Product> optProduct = productRepository.findById(id);
        Product existingProduct = optProduct.orElseThrow();
        existingProduct.updateProduct(product);
        return productRepository.save(existingProduct);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        Product product = productRepository.findById(id).orElseThrow();
        for (String curr : product.getCategories()) {
          categoryRepository.save(categoryRepository.findByName(curr).deleteProduct(product.getId()));
        }
        productRepository.delete(product);

        return "Product deleted and removed from any categories to which it belonged";
    }
}
