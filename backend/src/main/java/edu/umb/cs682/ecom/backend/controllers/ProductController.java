package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.Category;
import edu.umb.cs682.ecom.backend.repositories.CategoryRepository;
import edu.umb.cs682.ecom.backend.payload.request.ProductListRequest;
import edu.umb.cs682.ecom.backend.payload.response.CartResponse;
import edu.umb.cs682.ecom.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
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

    @PostMapping("/all")
    public Product save(@RequestBody Product product) {
        System.err.printf("\n\nproduct.getCategories: %s\n\n", product.getCategories());

        //if (product.getCategories().size == 0) {
        //    product.insertOtherCategories();
        //}

        for (String curr : product.getCategories()) {
            String name = curr.substring(0, 1).toUpperCase() + curr.substring(1).toLowerCase();
            if (!categoryRepository.existsByName(name)) {
                categoryRepository.save(new Category(curr).addProduct(product));
            } else {
                categoryRepository.save(categoryRepository.findByName(name).addProduct(product));
            }
        }
        productRepository.save(product);
        return product;
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
    public Optional<Product> show(@PathVariable String id) {
        return productRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable String id, @RequestBody Product product) {
        Optional<Product> optProduct = productRepository.findById(id);
        Product existingProduct = optProduct.orElseThrow();
        if(product.getName() != null)
            existingProduct.setName(product.getName());
        if(product.getShortDescription() != null)
            existingProduct.setShortDescription(product.getShortDescription());
        if(product.getLongDescription() != null)
            existingProduct.setLongDescription(product.getLongDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setCategories(product.getCategories());
        productRepository.save(existingProduct);
        return existingProduct;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        Optional<Product> optproduct = productRepository.findById(id);
        Product product = optproduct.get();
        for (String curr : product.getCategories()) {

          categoryRepository.save(categoryRepository.findByName(curr).deleteProduct(product));
        }
        productRepository.delete(product);

        return "";
    }
}
