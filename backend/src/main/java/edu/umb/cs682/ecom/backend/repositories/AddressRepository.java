package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Address;
import edu.umb.cs682.ecom.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.Set;

/**
 * This repository is incomplete. Future iterations of this software product
 * will utilize <code>AddressRepository</code> to manage {@link User} addresses
 * in the database.
 */
public interface AddressRepository extends MongoRepository<Address, String> {
    Optional<Address> findById(String id);
    Set<Address> findAllByUser(User user);
}
