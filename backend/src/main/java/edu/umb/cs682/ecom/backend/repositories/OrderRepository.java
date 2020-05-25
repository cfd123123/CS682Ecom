package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Order;
import edu.umb.cs682.ecom.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.Set;

/**
 * <code>OrderRepository</code> manages access to the MongoDB related to
 * {@link Order Orders}.
 */
public interface OrderRepository extends MongoRepository<Order, String> {
    /**
     * Finds all {@link Order Orders} belonging to the given {@link User}.
     *
     * @param user the {@link User} for which {@link Order Orders} are needed
     * @return the set of {@link Order Orders} belonging to the {@link User}
     */
    Set<Order> findAllByUser(User user);

    /**
     * Finds all {@link Order Orders} in the given set of order IDs.
     *
     * @param orders the set of order IDs
     * @return the set of {@link Order Orders}
     */
    Set<Order> findByIdIn(Set<String> orders);

    /**
     * Finds the {@link Order Order} by the given order ID, if it exists.
     *
     * @param id the ID of the {@link Order Order} sought
     * @return an {@link Optional} object which contains the {@link Order Order}, if it exists
     */
    Optional<Order> findById(String id);
}
