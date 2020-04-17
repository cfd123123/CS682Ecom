package edu.umb.cs682.ecom.backend.controllers;

import edu.umb.cs682.ecom.backend.models.User;
import edu.umb.cs682.ecom.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    @GetMapping("/mystuff")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and hasRole('CUSTOMER')")
    public String customerAccess(@RequestParam(value = "username", required = false) String username) {
//        System.err.printf("\n\n%s\n\n", username);
        Optional<User> opt = userRepository.findByUsername(username);
        if (opt.isPresent()) return opt.get().getProfile();
        else return "Invalid username";
    }

    @GetMapping("/profile")
    @PreAuthorize("@tokenWhitelistService.containsToken(authentication) and (hasRole('CUSTOMER') or hasRole('EMPLOYEE') or hasRole('ADMIN'))")
    public String profileAccess(@RequestParam(value = "username", required = false) String username) {
//        System.err.printf("\n\n%s\n\n", username);
        Optional<User> opt = userRepository.findByUsername(username);
        if (opt.isPresent()) return opt.get().getProfile();
        else return "Invalid username";
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
