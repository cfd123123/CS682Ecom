package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.Order;
import edu.umb.cs682.ecom.backend.models.PreOrder;
import edu.umb.cs682.ecom.backend.models.Product;
import edu.umb.cs682.ecom.backend.models.User;
import edu.umb.cs682.ecom.backend.payload.request.AddToCartRequest;
import edu.umb.cs682.ecom.backend.payload.request.CheckoutRequest;
import edu.umb.cs682.ecom.backend.payload.request.PlaceOrderRequest;
import edu.umb.cs682.ecom.backend.payload.response.AccountResponse;
import edu.umb.cs682.ecom.backend.payload.response.PreOrderResponse;
import edu.umb.cs682.ecom.backend.payload.response.OrderResponse;
import edu.umb.cs682.ecom.backend.payload.response.ProfileResponse;
import edu.umb.cs682.ecom.backend.repositories.OrderRepository;
import edu.umb.cs682.ecom.backend.repositories.PreOrderRepository;
import edu.umb.cs682.ecom.backend.repositories.ProductRepository;
import edu.umb.cs682.ecom.backend.repositories.UserRepository;
import edu.umb.cs682.ecom.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * UserController manages requests from the frontend related to Users.
 *
 * The methods in this class directly correspond to the functions in the
 * UserService.js frontend class.
 */
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

    /**
     * A private helper method that extracts the current user's information from
     * the authentication token used to access the calling method's mapping.
     *
     * @return the {@link User} object associated with the current user
     */
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetailsImpl)auth.getPrincipal()).getUsername();
        return userRepository.findByUsername(username).orElseThrow();
    }

    /**
     * Gets the personalized content associated with the current user.
     * <p>
     * The current user information is extracted from the authentication token
     * used to make this request. Only users with the role 'CUSTOMER' have access
     * to this mapping.
     * </p><p>
     * The corresponding frontend requester is the getMyStuff() function in the
     * UserService.js class.
     * </p>
     * NOTE: This feature is incomplete and currently returns the same data as
     * the getProfile() method.
     *
     * @return the {@link ProfileResponse} object corresponding to the current user
     */
    @GetMapping("/mystuff")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and hasRole('CUSTOMER')")
    public ProfileResponse getMyStuff() {
        return new ProfileResponse(getCurrentUser());
    }

    /**
     * Gets the account data associated with the current user.
     * <p>
     * The current user information is extracted from the authentication token
     * used to make this request. All users with an account that can log in have
     * access to this mapping.
     * </p>
     * The corresponding frontend requester is the getMyAccount() function in the
     * UserService.js class.
     *
     * @return the {@link AccountResponse} object corresponding to the current user
     */
    @GetMapping("/profile")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and (hasRole('CUSTOMER') or hasRole('EMPLOYEE') or hasRole('ADMIN'))")
    public AccountResponse getMyAccount() {
        return new AccountResponse(getCurrentUser());
    }

    /**
     * Gets the employee content associated with the current user.
     * <p>
     * The current user information is extracted from the authentication token
     * used to make this request. Only Employees and Admins have access
     * to this mapping.
     * </p><p>
     * The corresponding frontend requester is the getEmployeeContent() function
     * in the UserService.js class.
     * </p>
     * NOTE: This feature is incomplete and currently returns the text string
     * "Employee Content".
     *
     * @return the employee content associated with the current user
     */
    @GetMapping("/employee")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and (hasRole('EMPLOYEE') or hasRole('ADMIN'))")
    public String getEmployeeContent() {
        return "Employee Content.";
    }

    /**
     * Gets the admin content associated with the current user.
     * <p>
     * The current user information is extracted from the authentication token
     * used to make this request. Only Admins have access to this mapping.
     * </p><p>
     * The corresponding frontend requester is the getAdminContent() function
     * in the UserService.js class.
     * </p>
     * NOTE: This feature is incomplete and currently returns the text string
     * "Admin Content".
     *
     * @return the admin content associated with the current user
     */
    @GetMapping("/admin")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and (hasRole('ADMIN'))")
    public String getAdminContent() {
        return "Admin Content.";
    }

    /**
     * Adds some quantity of a Product to the currently logged in user's cart.
     * Only users with the 'CUSTOMER' role have access to this mapping.
     * <p>
     * The corresponding frontend requester is the addToCart() function in the
     * UserService.js class.
     * </p>
     * @param request an automatically generated {@link AddToCartRequest} object containing the
     *                user and product information required to handle this request
     * @return an updated {@link AccountResponse} object for the current user
     */
    @PostMapping("/profile/cart")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and hasRole('CUSTOMER')")
    public AccountResponse addToCart(@Valid @RequestBody AddToCartRequest request) {
        // Find the requested product
        Product toAddToCart = productRepository.findById(request.getProductID()).orElseThrow();
        // Find the current user
        User user =  userRepository.findByUsername(request.getUsername()).orElseThrow();
        // Add the quantity of the product to the user's cart
        user.adjustCart(toAddToCart.getId(), request.getQuantity());
        // Save the user and return an AccountResponse for that user
        return new AccountResponse(userRepository.save(user));
    }

    /**
     * Processes a user's request to begin the checkout process. Only users with
     * the 'CUSTOMER' role have access to this mapping.
     * <p>
     * The {@link CheckoutRequest} argument to this method should contain the current
     * user's username, cart details, and a calculated subtotal. The corresponding
     * details are retrieved from the database and compared against the CheckoutRequest
     * for consistency. An exception is thrown if values don't match.
     * </p><p>
     * A temporary {@link PreOrder} containing all details relevant to the order
     * is generated and returned to the frontend. more text
     * </p><p>
     * The corresponding frontend requester is the proceedToCheckout() function
     * in the UserService.js class.
     * </p><p>
     * WARNING: This implementation uses <code>float</code> for currency, which is
     * prone to rounding errors. As such, the subtotal amount is not validated with
     * the backend and is simply recalculated to prevent extraneous thrown exceptions.
     * This can be fixed in future releases of this software product.
     *</p>
     * NOTE: This feature is incomplete. Currently, arbitrary taxes and shipping
     * charges are applied to the order in place of real tax and shipping charges.
     * This should be fixed in future iterations of this software product.
     *
     * @param request the {@link CheckoutRequest} containing the username and cart details
     * @return the {@link PreOrderResponse} object containing a temporary order for the cart items
     */
    @PostMapping("/profile/checkout")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and hasRole('CUSTOMER')")
    public PreOrderResponse proceedToCheckout(@Valid @RequestBody CheckoutRequest request) {
        String requestUsername = request.getUsername();
        Map<String, Integer> requestCart = request.getProducts();
        float requestSubTotal = request.getSubtotal();

        User user = userRepository.findByUsername(requestUsername).orElseThrow();

        List<Product> products = productRepository.findByIdIn(new ArrayList<>(requestCart.keySet()));
        float subTotal = products.stream()
                .map(product -> product.getPrice() * requestCart.get(product.getId()))
                .reduce(0.0f, Float::sum);
//        if (requestSubTotal != subTotal) {
//            throw new RuntimeException("Checkout subtotal doesn't match calculated subtotal");
//        }
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
        PreOrder preOrder = preOrderRepository.save(
                new PreOrder(issued, expire, user, requestCart, taxes, shipping, subTotal, total));
        return new PreOrderResponse(user.getUsername(), preOrder.getId(), requestCart,
                products, taxes, shipping, itemCount, subTotal, shippingCost, taxCost, total);
    }

    /**
     * Processes an order on behalf of the user, if the PreOrder has not expired.
     * <p>
     *     The {@link PlaceOrderRequest} contains the {@link PreOrder} provided
     *     in the {@link UserController#proceedToCheckout} method, which is converted
     *     into an {@link Order} and returned to the frontend in an {@link OrderResponse}.
     * </p><p>
     * The corresponding frontend requester is the placeOrder() function
     * in the UserService.js class.
     * </p><p>
     * WARNING: This feature is incomplete. Currently, if the PreOrder has expired,
     * this method will throw an exception. Future implementations of this software
     * product will appropriately handle expired PreOrders.
     *
     * @param request the {@link PlaceOrderRequest} containing the order details
     * @return the {@link OrderResponse} which contains the user's {@link Order}
     */
    @PostMapping("/profile/placeorder")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and hasRole('CUSTOMER')")
    public OrderResponse placeOrder(@Valid @RequestBody PlaceOrderRequest request) {
        User requestUser = userRepository.findByUsername(request.getUsername()).orElseThrow();
        PreOrder preOrder = preOrderRepository.findById(request.getPreOrderId()).orElseThrow();
        Order order = orderRepository.save(new Order(preOrder));
        requestUser.addOrder(order);
        requestUser.setCart(new HashMap<>());
        requestUser = userRepository.save(requestUser);
        preOrderRepository.delete(preOrder);
        return new OrderResponse(order, requestUser);
    }
}
