package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.Category;
import edu.umb.cs682.ecom.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @RequestMapping(method=RequestMethod.GET, value="/products")
    public Iterable<Product> product() {
        return productRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/products")
    public Product save(@RequestBody Product product) {
        productRepository.save(product);

        return product;
    }

    @RequestMapping(method=RequestMethod.GET, value="/products/{id}")
    public Optional<Product> show(@PathVariable String id) {
        return productRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/products/{id}")
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

    @RequestMapping(method=RequestMethod.DELETE, value="/products/{id}")
    public String delete(@PathVariable String id) {
        Optional<Product> optproduct = productRepository.findById(id);
        Product product = optproduct.get();
        productRepository.delete(product);

        return "";
    }
}
