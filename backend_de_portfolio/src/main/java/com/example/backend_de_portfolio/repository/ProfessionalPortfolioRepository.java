package com.example.backend_de_portfolio.repository;

import com.example.backend_de_portfolio.model.ProfessionalPortfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfessionalPortfolioRepository extends JpaRepository<ProfessionalPortfolio, Long> {
    Optional<ProfessionalPortfolio> findByEmail(String email);
    void deleteByEmail(String email);
}