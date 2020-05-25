package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * <code>TokenWhitelist</code> manages access to the MongoDB related to
 * {@link Token Tokens}. In particular, it manages the whitelist of tokenIDs,
 * granting or restricting access to mappings which require authentication.
 */
public interface TokenWhitelist extends MongoRepository<Token, String> {
    /**
     * Returns whether a {@link Token} by the given tokenId exists in the
     * database.
     *
     * @param tokenId the ID of the {@link Token}
     * @return true if the {@link Token} exists and false otherwise
     */
    Boolean existsByTokenId(String tokenId);

    /**
     * Deletes the {@link Token} by the given tokenId from the database.
     *
     * @param tokenId the ID of the Token to be deleted
     */
    void deleteByTokenId(String tokenId);
}
