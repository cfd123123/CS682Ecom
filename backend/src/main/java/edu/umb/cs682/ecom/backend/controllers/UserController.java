package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Order;
import edu.umb.cs682.ecom.backend.models.PreOrder;
import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.User;
import edu.umb.cs682.ecom.backend.payload.request.CartRequest;
import edu.umb.cs682.ecom.backend.payload.request.CheckoutConfirmRequest;
import edu.umb.cs682.ecom.backend.payload.request.PlaceOrderRequest;
import edu.umb.cs682.ecom.backend.payload.response.CheckoutConfirmResponse;
import edu.umb.cs682.ecom.backend.payload.response.CheckoutResponse;
import edu.umb.cs682.ecom.backend.payload.response.ProfileResponse;
import edu.umb.cs682.ecom.backend.repositories.OrderRepository;
import edu.umb.cs682.ecom.backend.repositories.PreOrderRepository;
import edu.umb.cs682.ecom.backend.repositories.ProductRepository;
import edu.umb.cs682.ecom.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    PreOrderRepository preOrderRepository;

    @Autowired
    OrderRepository orderRepository;

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

    @PostMapping("/profile/placeorder")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and hasRole('CUSTOMER')")
    public Order checkout(@Valid @RequestBody PlaceOrderRequest request) {
        String requestUsername = request.getUsername();
        String preOrderId = request.getPreOrderId();
        PreOrder preOrder = preOrderRepository.findById(preOrderId).orElseThrow();
        Order order = new Order(preOrder);
        return orderRepository.save(order);
    }

    @PostMapping("/profile/proceedtocheckout")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and hasRole('CUSTOMER')")
    public CheckoutConfirmResponse proceedToCheckout(@Valid @RequestBody CheckoutConfirmRequest request) {
        String requestUsername = request.getUsername();
        Map<String, Integer> requestCart = request.getProducts();
        float requestSubTotal = request.getSubtotal();

        User user = userRepository.findByUsername(requestUsername).orElseThrow();

        List<Product> products = productRepository.findByIdIn(new ArrayList<>(requestCart.keySet()));
        float subTotal = products.stream()
                .map(product -> product.getPrice() * requestCart.get(product.getId()))
                .reduce(0.0f, Float::sum);
        if (requestSubTotal != subTotal) {
            throw new RuntimeException("Checkout subtotal doesn't match calculated subtotal");
        }
        Map<String, Float> taxes = new HashMap<>();
        taxes.put("Awesome Taxes", (float) (Math.round((subTotal * 0.05f)*100)/100.0));
        Map<String, Float> shipping = new HashMap<>();
        shipping.put("Get It There Shipping", 15.99f);

        float shippingCost = shipping.values().stream().reduce(Float::sum).orElse(0f);
        float taxCost = taxes.values().stream().reduce(Float::sum).orElse(0f);
        int itemCount = requestCart.values().stream().reduce(Integer::sum).orElse(0);

        float total = subTotal + shippingCost + taxCost;
        Date issued = new Date();
        Date expire = new Date(new Date().getTime() + 600000);
        PreOrder preOrder = preOrderRepository.save(new PreOrder(issued, expire, user, requestCart, taxes, shipping, subTotal, total));
        return new CheckoutConfirmResponse(user.getUsername(), preOrder.getId(), requestCart, products, taxes, shipping, itemCount, subTotal, shippingCost, taxCost, total);
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
