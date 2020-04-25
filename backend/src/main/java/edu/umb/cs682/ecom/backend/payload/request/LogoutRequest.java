package edu.umb.cs682.ecom.backend.payload.request;

import javax.validation.constraints.NotBlank;

public class LogoutRequest {
    @NotBlank
    private String tokenID;

    public String getTokenID() { return tokenID; }
    public void setTokenID(String tokenID) { this.tokenID = tokenID; }
}
