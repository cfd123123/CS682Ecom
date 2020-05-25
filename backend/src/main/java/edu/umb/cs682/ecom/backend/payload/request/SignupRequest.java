package edu.umb.cs682.ecom.backend.payload.request;

import edu.umb.cs682.ecom.backend.models.Role;
import edu.umb.cs682.ecom.backend.models.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

/**
 * <code>SignupRequest</code> represents a request from the frontend to sign up
 * a new {@link User} with the given username, email, {@link Role Roles}, and password.
 */
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private Set<String> roles;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    /**
     * Default constructor, only used by Spring for field injection
     */
    public SignupRequest() {}

    public String getUsername()   { return username; }
    public String getEmail()      { return email; }
    public String getPassword()   { return password; }
    public Set<String> getRoles() { return this.roles; }

    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email)       { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(Set<String> roles)   { this.roles = roles; }
}
