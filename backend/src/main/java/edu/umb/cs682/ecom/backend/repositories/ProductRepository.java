package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, String> {
    @Override
    void delete(Product deleted);
}
