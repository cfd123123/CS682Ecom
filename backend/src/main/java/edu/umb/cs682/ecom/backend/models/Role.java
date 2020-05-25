package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Role represents a {@link User User's} role as it pertains to authorization
 * and access to backend mappings.
 */
@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    private ERole name;

    /**
     * Default constructor for an Role object. Only used by Spring for field injection
     */
    public Role() {}

    /**
     * Constructs a new Role object using the given {@link ERole} value.
     *
     * @param name the {@link ERole} value to be used for this Role
     */
    public Role(ERole name) { this.name = name; }

    public String getId() { return id; }
    public ERole getName() { return name; }

    public void setId(String id) { this.id = id; }
    public void setName(ERole name) { this.name = name; }
}
