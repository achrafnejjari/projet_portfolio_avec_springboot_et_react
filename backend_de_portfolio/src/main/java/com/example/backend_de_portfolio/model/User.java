package com.example.backend_de_portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String portfolioType;

    // Constructeurs
    public User() {}

    public User(String email, String password, String portfolioType) {
        this.email = email;
        this.password = password;
        this.portfolioType = portfolioType;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPortfolioType() {
        return portfolioType;
    }

    public void setPortfolioType(String portfolioType) {
        this.portfolioType = portfolioType;
    }
}