package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface CategoryRepository extends MongoRepository<Category, String> {
    @Override
    void delete(Category deleted);

    Boolean existsByName(String name);
}
