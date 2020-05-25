package edu.umb.cs682.ecom.backend.models;

import edu.umb.cs682.ecom.backend.repositories.TokenWhitelist;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

/**
 * Token is used only for whitelisting JWT tokens. It stores the tokenId to
 * be looked up in the {@link TokenWhitelist} Token repository. Tokens expire
 * 24 hours after they are created (this can be adjusted as needed).
 */
@Document(collection = "tokenwhitelist")
public class Token {
    @Id
    private String tokenId;

    @Field
    @Indexed(name="issuedDate", expireAfter="1d")
    private Date issued;

    @Field
    @Indexed(name="expiresDate", expireAfterSeconds = 0)
    private Date expires;

    /**
     * Constructs a new Token object with the given ID, issued, and expiry dates.
     *
     * @param tokenId the id for this Token
     * @param issued the issued {@link Date} of this Token
     * @param expires the expiry {@link Date} of this Token
     */
    public Token(String tokenId, Date issued, Date expires) {
        this.tokenId = tokenId;
        this.issued = issued;
        this.expires = expires;
    }

    public String getTokenId() { return tokenId; }
    public Date getIssued()    { return issued; }
    public Date getExpires()   { return expires; }

    public void setTokenId(String id)    { this.tokenId = id; }
    public void setIssued(Date issued)   { this.issued = issued; }
    public void setExpires(Date expires) { this.expires = expires; }
}
