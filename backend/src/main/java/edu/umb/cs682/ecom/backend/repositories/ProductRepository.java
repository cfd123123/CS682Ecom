package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

/**
 * <code>ProductRepository</code> manages access to the MongoDB related to
 * {@link Product Products}.
 */
public interface ProductRepository extends MongoRepository<Product, String> {
    /**
     * Deletes the given {@link Product} from the database.
     *
     * @param deleted the Category to be deleted
     */
    void delete(Product deleted);

    /**
     * Returns a list of all {@link Product Products} currently in the database.
     *
     * @return a list of all {@link Product Products} currently in the database.
     */
    List<Product> findAll();

    /**
     * Returns a list of {@link Product Products} based on the given
     * set of product IDs.
     *
     * @param ids the list of {@link Product} IDs to find
     * @return the list of {@link Product} objects
     */
    List<Product> findByIdIn(List<String> ids);

    /**
     * Returns the {@link Product} by the given product ID.
     *
     * @param id the product ID
     * @return the {@link Product} associated with id
     */
    Optional<Product> findById(String id);
}
