package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {
    @Override
    void delete(Product deleted);

    List<Product> findAll();
    List<Product> findByIdIn(List<String> ids);

    Optional<Product> findById(String id);
}