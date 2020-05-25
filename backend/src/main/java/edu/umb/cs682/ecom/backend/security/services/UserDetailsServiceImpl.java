package edu.umb.cs682.ecom.backend.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umb.cs682.ecom.backend.models.User;
import edu.umb.cs682.ecom.backend.repositories.UserRepository;

/**
 * <code>UserDetailsServiceImpl</code> is used to build {@link UserDetailsImpl}
 * objects.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    /**
     * Private constructor to prevent instantiation.
     */
    private UserDetailsServiceImpl() {}

    /**
     * Returns a {@link UserDetailsImpl} built using the given {@link User User's}
     * username.
     *
     * @param username the username to build the <code>UserDetailsImpl</code> from
     * @return the built <code>UserDetailsImpl</code> object
     * @throws UsernameNotFoundException if the user does not exist
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(user);
    }

}
