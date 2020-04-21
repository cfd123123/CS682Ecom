package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.User;
import edu.umb.cs682.ecom.backend.payload.request.CartRequest;
import edu.umb.cs682.ecom.backend.payload.request.CheckoutRequest;
import edu.umb.cs682.ecom.backend.payload.response.CheckoutResponse;
import edu.umb.cs682.ecom.backend.payload.response.ProfileResponse;
import edu.umb.cs682.ecom.backend.repositories.ProductRepository;
import edu.umb.cs682.ecom.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    @GetMapping("/mystuff")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and hasRole('CUSTOMER')")
    public ProfileResponse customerAccess(@RequestParam(value = "username", required = false) String username) {
        return getProfileResponse(username);
    }

    @GetMapping("/profile")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and (hasRole('CUSTOMER') or hasRole('EMPLOYEE') or hasRole('ADMIN'))")
    public ProfileResponse profileAccess(@RequestParam(value = "username", required = false) String username) {
        return getProfileResponse(username);
    }

    private ProfileResponse getProfileResponse(String username) {
        Optional<User> opt = userRepository.findByUsername(username);
        User user = opt.orElseThrow();
        return new ProfileResponse(user.getId(), user.getUsername(), user.getEmail(), user.getCart());
    }

    @PostMapping("/profile/cart")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and hasRole('CUSTOMER')")
    public ProfileResponse addToCart(@Valid @RequestBody CartRequest request) {
        Optional<Product> optProduct = productRepository.findById(request.getProductID());
        Product toAddToCart = optProduct.orElseThrow();
        User user =  userRepository.findByUsername(request.getUsername()).orElseThrow();
        user.adjustCart(toAddToCart.getId(), request.getQuantity());
        userRepository.save(user);
        return getProfileResponse(request.getUsername());
    }

    @PostMapping("/profile/checkout")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and hasRole('CUSTOMER')")
    public CheckoutResponse checkout(@Valid @RequestBody CheckoutRequest request) {
        return null;
    }

    @GetMapping("/employee")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and (hasRole('EMPLOYEE') or hasRole('ADMIN'))")
    public String employeeAccess() {
        return "Employee Content.";
    }

    @GetMapping("/admin")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and (hasRole('ADMIN'))")
    public String adminAccess() {
        return "Admin Content.";
    }
}
