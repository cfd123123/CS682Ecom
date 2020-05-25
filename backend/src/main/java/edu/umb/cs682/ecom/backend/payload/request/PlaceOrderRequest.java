package edu.umb.cs682.ecom.backend.payload.request;

import edu.umb.cs682.ecom.backend.models.Order;
import edu.umb.cs682.ecom.backend.models.PreOrder;
import edu.umb.cs682.ecom.backend.models.User;

import javax.validation.constraints.NotBlank;

/**
 * <code>PlaceOrderRequest</code> represents a request from the frontend for
 * a {@link User} to place an {@link Order} after starting the checkout
 * process and receiving a {@link PreOrder}.
 */
public class PlaceOrderRequest {
    @NotBlank private String username;
    @NotBlank private String preOrderId;

    /**
     * Constructs a new PlaceOrderRequest with the given username and preOrderId.
     *
     * @param username the username of the {@link User} placing the order
     * @param preOrderId the ID of the {@link PreOrder} that was received after
     *                   starting the checkout process
     */
    public PlaceOrderRequest(@NotBlank String username, @NotBlank String preOrderId) {
        this.username = username;
        this.preOrderId = preOrderId;
    }

    public String getUsername() { return username; }
    public String getPreOrderId() { return preOrderId; }

    public void setPreOrderId(String preOrderId) { this.preOrderId = preOrderId; }
    public void setUsername(String username) { this.username = username; }
}
