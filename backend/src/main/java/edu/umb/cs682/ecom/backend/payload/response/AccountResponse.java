package edu.umb.cs682.ecom.backend.payload.response;

import edu.umb.cs682.ecom.backend.models.User;

/**
 * <code>AccountResponse</code> represents a response to the frontend with
 * a {@link User User's} account information.
 */
public class AccountResponse {
    private User user;

    public AccountResponse(User user) { this.user = user; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
