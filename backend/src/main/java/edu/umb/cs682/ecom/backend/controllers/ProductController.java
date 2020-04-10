package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Product;
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

    @GetMapping("/{id}")
    public Optional<Product> show(@PathVariable String id) {
        return productRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable String id, @RequestBody Product product) {
        Optional<Product> optproduct = productRepository.findById(id);
        Product c = optproduct.get();
        if(product.getName() != null)
            c.setName(product.getName());
        if(product.getShortDescription() != null)
            c.setShortDescription(product.getShortDescription());
        if(product.getLongDescription() != null)
            c.setLongDescription(product.getLongDescription());
        c.setPrice(product.getPrice());
        c.setQuantity(product.getQuantity());
        productRepository.save(c);
        return c;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        Optional<Product> optproduct = productRepository.findById(id);
        Product product = optproduct.get();
        productRepository.delete(product);

        return "";
    }
}
