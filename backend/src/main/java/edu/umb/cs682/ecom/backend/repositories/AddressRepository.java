package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Address;
import edu.umb.cs682.ecom.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.Set;

public interface AddressRepository extends MongoRepository<Address, String> {
    Optional<Address> findById(String id);
    Set<Address> findAllByUser(User user);
}
