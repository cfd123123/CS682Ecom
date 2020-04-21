package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Order;
import edu.umb.cs682.ecom.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.Set;

public interface OrderRepository extends MongoRepository<Order, String> {
    Set<Order> findAllByUser(User user);
    Set<Order> findByIdIn(Set<String> orders);
    Optional<Order> findById(String id);
    Set<Order> findAllByProductsIn(Set<String> products);
}
