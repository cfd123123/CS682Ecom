package edu.umb.cs682.ecom.backend.controllers;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import edu.umb.cs682.ecom.backend.models.ERole;
import edu.umb.cs682.ecom.backend.models.Role;
import edu.umb.cs682.ecom.backend.models.User;
import edu.umb.cs682.ecom.backend.payload.request.LoginRequest;
import edu.umb.cs682.ecom.backend.payload.request.SignupRequest;
import edu.umb.cs682.ecom.backend.payload.response.JwtResponse;
import edu.umb.cs682.ecom.backend.payload.response.MessageResponse;
import edu.umb.cs682.ecom.backend.repositories.RoleRepository;
import edu.umb.cs682.ecom.backend.repositories.TokenWhitelist;
import edu.umb.cs682.ecom.backend.repositories.UserRepository;
import edu.umb.cs682.ecom.backend.security.jwt.JwtUtils;
import edu.umb.cs682.ecom.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * AuthController manages authentication requests from the frontend. This amounts
 * to login, logout, and signup requests.
 *
 * The methods in this class directly correspond to the functions in the
 * AuthService.js frontend class.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    TokenWhitelist tokenWhitelist;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    /**
     * Processes signin requests. Username and password are authenticated and a
     * JWT token is generated. The JWT token is added to a whitelist granting
     * access for 24 hours.
     * <p>
     * The corresponding frontend requester is the login function in AuthService.js.
     * </p>
     * @param loginRequest the login details, which includes a username and password
     * @return the logged in user's temporary access token and profile details
     * inside a {@link JwtResponse}
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        tokenWhitelist.save(jwtUtils.makeTokenFromJwtString(jwt));

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        return ResponseEntity.ok(new JwtResponse(jwt, user));
    }

    /**
     * Processes signout requests. The provided JWT token is removed from the
     * whitelist, rendering that token invalid.
     * <p>
     * The corresponding frontend requester is the logout function in AuthService.js.
     * </p>
     * @param logoutRequest the user details, in the same format that was returned
     *                     by the {@link AuthController#authenticateUser} method.
     * @return a generic {@link ResponseEntity} with an "ok" (200) status.
     */
    @PostMapping("/signout")
    public ResponseEntity<?> deactivateToken(@Valid @RequestBody JwtResponse logoutRequest) {
        String tokenID = jwtUtils.getIdFromJwtToken(logoutRequest.getAccessToken());
        if (tokenWhitelist.existsByTokenId(tokenID)) {
            tokenWhitelist.deleteByTokenId(tokenID);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Processes signup requests. The given user details are checked against
     * existing user data to ensure there are no duplicate usernames or emails.
     * <p>
     * The corresponding frontend requester is the register function in AuthService.js
     * </p>
     * @param signUpRequest the user details, which include a username, email, and password
     * @return a generic {@link ResponseEntity} with an "ok" (200) status and confirmation message.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        // This check is for a future feature where a user may attempt to sign up with multiple roles.
        // For now, strRoles will always be null
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "employee":
                        Role employeeRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(employeeRole);

                        break;
                    default:
                        Role customerRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(customerRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
