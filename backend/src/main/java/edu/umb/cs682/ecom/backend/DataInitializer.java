package edu.umb.cs682.ecom.backend;

import edu.umb.cs682.ecom.backend.models.ERole;
import edu.umb.cs682.ecom.backend.models.Role;
import edu.umb.cs682.ecom.backend.models.User;
import edu.umb.cs682.ecom.backend.repositories.RoleRepository;
import edu.umb.cs682.ecom.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DataInitializer {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void init(){
        if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User("admin", "admin@temp.com", "admin");
            for (ERole role : ERole.values()) {
                adminUser.addRole(roleRepository.save(new Role(role)));
            }
            userRepository.save(adminUser);
        }
    }
}
