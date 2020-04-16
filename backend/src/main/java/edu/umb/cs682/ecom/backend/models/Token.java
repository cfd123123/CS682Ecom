package edu.umb.cs682.ecom.backend.models;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "tokenwhitelist")
public class Token {
    @Id
    private String tokenId;

    @Field
    @Indexed(name="issuedDate", expireAfter="1d")
    Date issued;

    @Field
    @Indexed(name="expiresDate", expireAfterSeconds = 0)
    Date expires;

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
