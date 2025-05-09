/*
package com.example.backend_de_portfolio.config;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        logger.debug("Filtrage de la requête: {}", requestURI);
        if (requestURI.startsWith("/api/auth/")) {
            logger.debug("Ignorer le filtre JWT pour: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            logger.debug("Aucun token JWT trouvé dans la requête: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.replace("Bearer ", "");
        try {
            logger.debug("Validation du token JWT pour la requête: {}", requestURI);
            String username = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        username, null, null);
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
                logger.debug("Authentification réussie pour l'utilisateur: {}", username);
            }
        } catch (Exception e) {
            logger.error("Erreur lors de la validation du token JWT: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}

*/
