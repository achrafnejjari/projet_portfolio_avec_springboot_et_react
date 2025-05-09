package com.example.backend_de_portfolio.controller;

import com.example.backend_de_portfolio.model.User;
import com.example.backend_de_portfolio.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            authService.signup(user.getEmail(), user.getPassword());
            return ResponseEntity.ok("Inscription réussie");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User authenticatedUser = authService.login(user.getEmail(), user.getPassword());
            logger.info("Connexion réussie pour l'email: {}", user.getEmail());
            return ResponseEntity.ok(new LoginResponse(authenticatedUser.getId(), authenticatedUser.getEmail()));
        } catch (IllegalArgumentException e) {
            logger.error("Erreur de connexion: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Déconnexion réussie");
    }

    static class LoginResponse {
        private Long id;
        private String email;

        public LoginResponse(Long id, String email) {
            this.id = id;
            this.email = email;
        }

        public Long getId() {
            return id;
        }

        public String getEmail() {
            return email;
        }
    }
}