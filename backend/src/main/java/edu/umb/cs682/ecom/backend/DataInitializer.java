package edu.umb.cs682.ecom.backend;

import edu.umb.cs682.ecom.backend.models.ERole;
import edu.umb.cs682.ecom.backend.models.Role;
import edu.umb.cs682.ecom.backend.models.User;
import edu.umb.cs682.ecom.backend.repositories.RoleRepository;
import edu.umb.cs682.ecom.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * <code>DataInitializer</code> provides basic roles and an admin user to newly
 * created backend applications. This is only run the first time an instance
 * of this application is spun up.
 */
@Component
public class DataInitializer {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    /**
     * Private constructor to prevent instantiation.
     */
    private DataInitializer() {}

    /**
     * Initializes the {@link RoleRepository} with each of the available roles
     * in {@link ERole} and creates an admin user with a default password of
     * "admin."
     */
    @PostConstruct
    public void init(){
        if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User("admin", "admin@temp.com", encoder.encode("admin"));
            for (ERole role : ERole.values()) {
                adminUser.addRole(roleRepository.save(new Role(role)));
            }
            userRepository.save(adminUser);
        }
    }
}
