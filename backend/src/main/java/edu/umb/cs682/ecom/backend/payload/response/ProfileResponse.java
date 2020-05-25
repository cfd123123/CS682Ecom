package edu.umb.cs682.ecom.backend.payload.response;

import edu.umb.cs682.ecom.backend.models.User;

/**
 * <code>ProfileResponse</code> represents a response to the frontend with
 * profile details for a {@link User}.
 */
public class ProfileResponse {
    private User user;

    /**
     * Constructs a new ProfileResponse object for the given {@link User}.
     *
     * @param user the {@link User} details
     */
    public ProfileResponse(User user) { this.user = user; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
