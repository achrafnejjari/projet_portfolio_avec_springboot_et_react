package com.example.backend_de_portfolio.service;

import com.example.backend_de_portfolio.model.User;
import com.example.backend_de_portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public void signup(String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("L'email est déjà utilisé");
        }
        User user = new User(email, password, null);
        userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Email ou mot de passe incorrect"));
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }
        return user;
    }
}