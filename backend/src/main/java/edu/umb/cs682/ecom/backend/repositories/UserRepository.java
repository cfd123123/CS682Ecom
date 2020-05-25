package edu.umb.cs682.ecom.backend.repositories;

import java.util.Optional;

import edu.umb.cs682.ecom.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * <code>UserRepository</code> manages access to the MongoDB related to
 * {@link User Users}.
 */
public interface UserRepository extends MongoRepository<User, String> {
    /**
     * Returns an {@link Optional} containing a {@link User} object by the
     * given username from the database, if it exists.
     *
     * @param username the username of the {@link User}
     * @return the {@link User} object
     */
    Optional<User> findByUsername(String username);

    /**
     * Returns whether a {@link User} by the given username exists in the
     * database.
     *
     * @param username the username of the {@link User}
     * @return true if the {@link User} exists and false otherwise
     */
    Boolean existsByUsername(String username);

    /**
     * Returns whether a {@link User} by the given email exists in the
     * database.
     *
     * @param email the email of the {@link User}
     * @return true if the {@link User} exists and false otherwise
     */
    Boolean existsByEmail(String email);
}
