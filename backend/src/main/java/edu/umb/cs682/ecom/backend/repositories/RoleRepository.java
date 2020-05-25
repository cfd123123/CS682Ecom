package edu.umb.cs682.ecom.backend.repositories;

import java.util.Optional;

import edu.umb.cs682.ecom.backend.models.ERole;
import edu.umb.cs682.ecom.backend.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * <code>RoleRepository</code> manages access to the MongoDB related to
 * {@link Role Roles}.
 */
public interface RoleRepository extends MongoRepository<Role, String> {
    /**
     * Returns a {@link Role} object by the given name from the database.
     *
     * @param name the name of the {@link Role}
     * @return the {@link Role} object
     */
    Optional<Role> findByName(ERole name);
}