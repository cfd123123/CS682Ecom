package edu.umb.cs682.ecom.backend.repositories;

import edu.umb.cs682.ecom.backend.models.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TokenWhitelist extends MongoRepository<Token, String> {
    Boolean existsByTokenId(String tokenId);

    void deleteByTokenId(String tokenId);
}
