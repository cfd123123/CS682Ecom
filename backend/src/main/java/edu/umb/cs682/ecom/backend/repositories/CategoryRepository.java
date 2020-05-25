package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Set;

/**
 * <code>CategoryRepository</code> manages access to the MongoDB related to
 * {@link Category Categories}.
 */
public interface CategoryRepository extends MongoRepository<Category, String> {
    /**
     * Deletes the given {@link Category} from the database.
     *
     * @param deleted the Category to be deleted
     */
    void delete(Category deleted);

    /**
     * Returns whether a {@link Category} by the given name exists in the
     * database.
     *
     * @param name the name of the {@link Category}
     * @return true if the {@link Category} exists and false otherwise
     */
    Boolean existsByName(String name);

    /**
     * Returns a {@link Category} object by the given name from the database.
     *
     * @param name the name of the {@link Category}
     * @return the {@link Category} object
     */
    Category findByName(String name);

    /**
     * Returns a {@link Set} of {@link Category Categories} based on the given
     * set of category names.
     *
     * @param categories the set of {@link Category} names to find
     * @return the set of {@link Category} objects
     */
    Set<Category> findByNameIn(Set<String> categories);
}
