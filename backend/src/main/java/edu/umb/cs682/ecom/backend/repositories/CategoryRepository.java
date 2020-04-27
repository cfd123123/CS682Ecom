package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Set;


public interface CategoryRepository extends MongoRepository<Category, String> {
    @Override
    void delete(Category deleted);

    Boolean existsByName(String name);

    Category findByName(String name);

    Set<Category> findByNameIn(Set<String> categories);
}
