package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.PreOrder;
import edu.umb.cs682.ecom.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.Set;


public interface PreOrderRepository extends MongoRepository<PreOrder, String> {
    Set<PreOrder> findAllByUser(User user);
    Set<PreOrder> findByIdIn(Set<String> orders);
    Optional<PreOrder> findById(String id);
    Set<PreOrder> findAllByProductsIn(Set<String> products);
}
