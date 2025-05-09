package com.example.backend_de_portfolio.repository;

import com.example.backend_de_portfolio.model.CreativePortfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CreativePortfolioRepository extends JpaRepository<CreativePortfolio, Long> {
    Optional<CreativePortfolio> findByEmail(String email);
    void deleteByEmail(String email);
}