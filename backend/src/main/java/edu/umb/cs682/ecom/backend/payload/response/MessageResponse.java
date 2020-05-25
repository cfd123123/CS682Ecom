package edu.umb.cs682.ecom.backend.payload.response;

/**
 * <code>MessageResponse</code> represents a generic {@link String} response
 * to the frontend.
 */
public class MessageResponse {
    private String message;

    /**
     * Constructs a new MessageResponse with the given message.
     *
     * @param message the message the send to the frontend
     */
    public MessageResponse(String message) { this.message = message; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
