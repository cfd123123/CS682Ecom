package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.Category;
import edu.umb.cs682.ecom.backend.payload.request.ProductListRequest;
import edu.umb.cs682.ecom.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/all")
    public Iterable<Product> product() {
        return productRepository.findAll();
    }

    @PostMapping("/all")
    public Product save(@RequestBody Product product) {
        productRepository.save(product);
        return product;
    }

    @PostMapping("/list")
    public Iterable<Product> listOfProducts(@RequestBody ProductListRequest products) {
        return productRepository.findByIdIn(products.getProducts());
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
        productRepository.save(existingProduct);
        return existingProduct;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        Optional<Product> optproduct = productRepository.findById(id);
        Product product = optproduct.get();
        productRepository.delete(product);

        return "";
    }
}
