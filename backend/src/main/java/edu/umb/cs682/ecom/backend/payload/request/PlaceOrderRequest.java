package edu.umb.cs682.ecom.backend.payload.request;

import javax.validation.constraints.NotBlank;

public class PlaceOrderRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String preOrderId;

    public PlaceOrderRequest(@NotBlank String username, @NotBlank String preOrderId) {
        this.username = username;
        this.preOrderId = preOrderId;
    }

    public String getUsername() { return username; }
    public String getPreOrderId() { return preOrderId; }

    public void setPreOrderId(String preOrderId) { this.preOrderId = preOrderId; }
    public void setUsername(String username) { this.username = username; }
}
