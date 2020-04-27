package edu.umb.cs682.ecom.backend.payload.response;

import edu.umb.cs682.ecom.backend.models.Order;
import edu.umb.cs682.ecom.backend.models.User;

import javax.validation.constraints.NotBlank;

public class PlaceOrderResponse {
    @NotBlank private Order order;
    @NotBlank private User user;

    public PlaceOrderResponse(@NotBlank Order order, @NotBlank User user) {
        this.order = order;
        this.user = user;
    }

    public Order getOrder() { return order; }
    public User getUser()   { return user; }

    public void setOrder(Order order) { this.order = order; }
    public void setUser(User user)    { this.user = user; }
}
