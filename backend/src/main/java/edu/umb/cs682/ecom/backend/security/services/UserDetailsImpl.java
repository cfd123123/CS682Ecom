package edu.umb.cs682.ecom.backend.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import edu.umb.cs682.ecom.backend.models.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * <code>UserDetailsImpl</code> contains the required information to build an
 * {@link Authentication} object.
 */
public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;
    private String id;
    private String username;
    private String email;
    @JsonIgnore private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Integer> cart;

    /**
     * Constructs a new <code>UserDetailsImpl</code> object with the given
     * {@link User} values.
     *
     * @param id the user's ID
     * @param username the user's username
     * @param email the user's email address
     * @param password the user's password
     * @param authorities the user's authorities
     * @param cart the user's shopping cart information
     */
    public UserDetailsImpl(String id, String username, String email, String password,
                           Collection<? extends GrantedAuthority> authorities, Map<String, Integer> cart) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.cart = cart;
    }

    /**
     * Factory method that builds a new <code>UserDetailsImpl</code> object
     * with the given {@link User User's} information.
     *
     * @param user to be used in building the <code>UserDetailsImpl</code> object
     * @return the new <code>UserDetailsImpl</code> object
     */
    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities,
                user.getCart());
    }

    public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }
    public String getId()                                          { return id; }
    public String getEmail()                                       { return email; }
    public Map<String, Integer> getCart()                          { return cart; }
    public String getPassword()                                    { return password; }
    public String getUsername()                                    { return username; }

    /**
     * Always returns true.
     *
     * @return true
     */
    @Override
    public boolean isAccountNonExpired() { return true; }

    /**
     * Always returns true.
     *
     * @return true
     */
    @Override
    public boolean isAccountNonLocked() { return true; }

    /**
     * Always returns true.
     *
     * @return true
     */
    @Override
    public boolean isCredentialsNonExpired() { return true; }

    /**
     * Always returns true.
     *
     * @return true
     */
    @Override
    public boolean isEnabled() { return true; }

    /**
     * Two <code>UserDetailsImpl</code> objects are equal if they share the
     * same user ID.
     *
     * @param other is equal to this?
     * @return true if other is equal to this and false otherwise
     */
    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null) return false;
        if (this.getClass() != other.getClass()) return false;
        UserDetailsImpl that = (UserDetailsImpl) other;
        return Objects.equals(this.id, that.id);
    }
}
