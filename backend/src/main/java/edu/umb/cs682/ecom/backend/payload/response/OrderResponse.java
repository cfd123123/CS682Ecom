package edu.umb.cs682.ecom.backend.payload.response;

import edu.umb.cs682.ecom.backend.models.Order;
import edu.umb.cs682.ecom.backend.models.User;

import javax.validation.constraints.NotBlank;

/**
 * <code>OrderResponse</code> represents a response to the frontend with
 * {@link Order} details for a {@link User} after the user has placed the order.
 */
public class OrderResponse {
    @NotBlank private Order order;
    @NotBlank private User user;

    /**
     * Constructs a new OrderResponse object with the given {@link Order} for
     * the given {@link User}.
     *
     * @param order the {@link Order} object
     * @param user the {@link User} object
     */
    public OrderResponse(@NotBlank Order order, @NotBlank User user) {
        this.order = order;
        this.user = user;
    }

    public Order getOrder() { return order; }
    public User getUser()   { return user; }

    public void setOrder(Order order) { this.order = order; }
    public void setUser(User user)    { this.user = user; }
}
