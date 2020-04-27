package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Category;
import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.repositories.CategoryRepository;
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
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/all")
    public Iterable<Category> category() {
        return categoryRepository.findAll();
    }

    @PostMapping("/all")
    public Category save(@RequestBody Category category) {
        categoryRepository.save(category);

        return category;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        Optional<Category> optcategory = categoryRepository.findById(id);
        Category category = optcategory.get();
        categoryRepository.delete(category);

        return "";
    }

    @GetMapping("/{name}")
    public Iterable<Product> getCategoryProducts(@PathVariable String name) {
        return categoryRepository.findByName(name).getProducts();
    }
}
