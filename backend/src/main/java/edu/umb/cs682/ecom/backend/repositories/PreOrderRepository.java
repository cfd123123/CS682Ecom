package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.PreOrder;
import edu.umb.cs682.ecom.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.Set;

/**
 * <code>PreOrderRepository</code> manages access to the MongoDB related to
 * {@link PreOrder PreOrders}.
 */
public interface PreOrderRepository extends MongoRepository<PreOrder, String> {
    /**
     * Finds all {@link PreOrder PreOrders} belonging to the given {@link User}.
     *
     * @param user the {@link User} for which {@link PreOrder PreOrders} are needed
     * @return the set of {@link PreOrder PreOrders} belonging to the {@link User}
     */
    Set<PreOrder> findAllByUser(User user);

    /**
     * Finds all {@link PreOrder PreOrders} in the given set of order IDs.
     *
     * @param orders the set of order IDs
     * @return the set of {@link PreOrder PreOrders}
     */
    Set<PreOrder> findByIdIn(Set<String> orders);

    /**
     * Finds the {@link PreOrder PreOrders} by the given order ID, if it exists.
     *
     * @param id the ID of the {@link PreOrder PreOrders} sought
     * @return an {@link Optional} object which contains the {@link PreOrder PreOrders}, if it exists
     */
    Optional<PreOrder> findById(String id);
}
