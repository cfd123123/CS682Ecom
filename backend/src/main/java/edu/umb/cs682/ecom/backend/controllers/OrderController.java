package edu.umb.cs682.ecom.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class is incomplete. Upon completion OrderController will manage
 * requests from the frontend related to Orders
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class OrderController {
    /**
     * Default constructor used by Spring for field injection
     */
    public OrderController() {}
}
