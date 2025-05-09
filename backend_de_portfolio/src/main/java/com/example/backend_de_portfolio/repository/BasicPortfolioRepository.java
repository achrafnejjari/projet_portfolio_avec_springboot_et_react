package com.example.backend_de_portfolio.repository;

import com.example.backend_de_portfolio.model.BasicPortfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BasicPortfolioRepository extends JpaRepository<BasicPortfolio, Long> {
    Optional<BasicPortfolio> findByEmail(String email);
    void deleteByEmail(String email);
}