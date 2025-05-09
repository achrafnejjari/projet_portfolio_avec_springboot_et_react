package com.example.backend_de_portfolio.controller;

import com.example.backend_de_portfolio.model.BasicPortfolio;
import com.example.backend_de_portfolio.model.ProfessionalPortfolio;
import com.example.backend_de_portfolio.model.CreativePortfolio;
import com.example.backend_de_portfolio.repository.BasicPortfolioRepository;
import com.example.backend_de_portfolio.repository.ProfessionalPortfolioRepository;
import com.example.backend_de_portfolio.repository.CreativePortfolioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {
    private static final Logger logger = LoggerFactory.getLogger(PortfolioController.class);
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/Uploads/";

    @Autowired
    private BasicPortfolioRepository basicPortfolioRepository;

    @Autowired
    private ProfessionalPortfolioRepository professionalPortfolioRepository;

    @Autowired
    private CreativePortfolioRepository creativePortfolioRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<String> savePortfolio(
            @RequestParam("email") String email,
            @RequestParam("portfolioType") String portfolioType,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "age", required = false) Integer age,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "profession", required = false) String profession,
            @RequestParam(value = "website", required = false) String website,
            @RequestParam(value = "experience_years", required = false) Integer experience_years,
            @RequestParam(value = "education", required = false) String education,
            @RequestParam(value = "skills", required = false) String skills,
            @RequestParam(value = "languages", required = false) String languages,
            @RequestParam(value = "linkedin_url", required = false) String linkedin_url,
            @RequestParam(value = "github_url", required = false) String github_url,
            @RequestParam(value = "creative_field", required = false) String creativeField,
            @RequestParam(value = "projects", required = false) String projects,
            @RequestParam(value = "tools", required = false) String tools,
            @RequestParam(value = "social_media", required = false) String social_media) {
        logger.info("Reçu: email={}, portfolioType={}, name={}, description={}, age={}, location={}, phone={}, profession={}, website={}, experience_years={}, education={}, skills={}, languages={}, linkedin_url={}, github_url={}, creative_field={}, projects={}, tools={}, social_media={}",
                email, portfolioType, name, description, age, location, phone, profession, website, experience_years, education, skills, languages, linkedin_url, github_url, creativeField, projects, tools, social_media);
        try {
            if (!portfolioType.equals("Basique")) {
                logger.debug("Suppression du portfolio Basique pour email={}", email);
                basicPortfolioRepository.deleteByEmail(email);
            }
            if (!portfolioType.equals("Professionnel")) {
                logger.debug("Suppression du portfolio Professionnel pour email={}", email);
                professionalPortfolioRepository.deleteByEmail(email);
            }
            if (!portfolioType.equals("Créatif")) {
                logger.debug("Suppression du portfolio Créatif pour email={}", email);
                creativePortfolioRepository.deleteByEmail(email);
            }

            String photoPath = null;
            if (photo != null && !photo.isEmpty()) {
                logger.info("Traitement de la photo: {}", photo.getOriginalFilename());
                Path uploadPath = Paths.get(UPLOAD_DIR);
                logger.info("Chemin du dossier d'upload: {}", uploadPath.toAbsolutePath());
                try {
                    if (!Files.exists(uploadPath)) {
                        logger.info("Création du dossier: {}", uploadPath);
                        Files.createDirectories(uploadPath);
                    }
                    if (!Files.isWritable(uploadPath)) {
                        logger.error("Le dossier d'upload n'est pas accessible en écriture: {}", uploadPath);
                        return ResponseEntity.badRequest().body("Erreur: Le dossier d'upload n'est pas accessible en écriture");
                    }
                    String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
                    Path filePath = uploadPath.resolve(fileName);
                    logger.info("Sauvegarde du fichier à: {}", filePath.toAbsolutePath());
                    Files.write(filePath, photo.getBytes());
                    if (!Files.exists(filePath)) {
                        logger.error("Échec de la sauvegarde du fichier: {}", filePath);
                        return ResponseEntity.badRequest().body("Erreur: Échec de la sauvegarde du fichier");
                    }
                    photoPath = "/Uploads/" + fileName;
                    logger.info("Photo sauvegardée avec succès: {}", photoPath);
                } catch (IOException e) {
                    logger.error("Erreur lors de la sauvegarde de la photo: {}", e.getMessage(), e);
                    return ResponseEntity.badRequest().body("Erreur lors de la sauvegarde de la photo: " + e.getMessage());
                }
            } else {
                logger.info("Aucune photo fournie pour le téléversement");
            }

            switch (portfolioType) {
                case "Basique":
                    logger.info("Sauvegarde/Mise à jour d'un portfolio Basique pour {}", email);
                    Optional<BasicPortfolio> existingBasic = basicPortfolioRepository.findByEmail(email);
                    BasicPortfolio basicPortfolio;
                    if (existingBasic.isPresent()) {
                        logger.debug("Mise à jour du portfolio Basique existant pour {}", email);
                        basicPortfolio = existingBasic.get();
                        basicPortfolio.setName(name);
                        basicPortfolio.setDescription(description);
                        basicPortfolio.setPhotoPath(photoPath);
                        basicPortfolio.setAge(age);
                        basicPortfolio.setLocation(location);
                        basicPortfolio.setPhone(phone);
                        basicPortfolio.setProfession(profession);
                        basicPortfolio.setWebsite(website);
                    } else {
                        logger.debug("Création d'un nouveau portfolio Basique pour {}", email);
                        basicPortfolio = new BasicPortfolio(email, name, description, photoPath, age, location, phone, profession, website);
                    }
                    basicPortfolioRepository.save(basicPortfolio);
                    break;
                case "Professionnel":
                    logger.info("Sauvegarde/Mise à jour d'un portfolio Professionnel pour {}", email);
                    Optional<ProfessionalPortfolio> existingProfessional = professionalPortfolioRepository.findByEmail(email);
                    ProfessionalPortfolio professionalPortfolio;
                    if (existingProfessional.isPresent()) {
                        logger.debug("Mise à jour du portfolio Professionnel existant pour {}", email);
                        professionalPortfolio = existingProfessional.get();
                        professionalPortfolio.setName(name);
                        professionalPortfolio.setDescription(description);
                        professionalPortfolio.setPhotoPath(photoPath);
                        professionalPortfolio.setAge(age);
                        professionalPortfolio.setLocation(location);
                        professionalPortfolio.setPhone(phone);
                        professionalPortfolio.setProfession(profession);
                        professionalPortfolio.setExperienceYears(experience_years);
                        professionalPortfolio.setEducation(education);
                        professionalPortfolio.setSkills(skills);
                        professionalPortfolio.setLanguages(languages);
                        professionalPortfolio.setLinkedinUrl(linkedin_url);
                        professionalPortfolio.setGithubUrl(github_url);
                    } else {
                        logger.debug("Création d'un nouveau portfolio Professionnel pour {}", email);
                        professionalPortfolio = new ProfessionalPortfolio(email, name, description, photoPath, age, location, phone, profession, experience_years, education, skills, languages, linkedin_url, github_url);
                    }
                    professionalPortfolioRepository.save(professionalPortfolio);
                    break;
                case "Créatif":
                    logger.info("Sauvegarde/Mise à jour d'un portfolio Créatif pour {}", email);
                    Optional<CreativePortfolio> existingCreative = creativePortfolioRepository.findByEmail(email);
                    CreativePortfolio creativePortfolio;
                    if (existingCreative.isPresent()) {
                        logger.debug("Mise à jour du portfolio Créatif existant pour {}", email);
                        creativePortfolio = existingCreative.get();
                        creativePortfolio.setName(name);
                        creativePortfolio.setDescription(description);
                        creativePortfolio.setPhotoPath(photoPath);
                        creativePortfolio.setAge(age);
                        creativePortfolio.setLocation(location);
                        creativePortfolio.setPhone(phone);
                        creativePortfolio.setCreativeField(creativeField);
                        creativePortfolio.setProjects(projects);
                        creativePortfolio.setTools(tools);
                        creativePortfolio.setSocialMedia(social_media);
                        creativePortfolio.setLinkedinUrl(linkedin_url);
                    } else {
                        logger.debug("Création d'un nouveau portfolio Créatif pour {}", email);
                        creativePortfolio = new CreativePortfolio(email, name, description, photoPath, age, location, phone, creativeField, projects, tools, social_media, linkedin_url);
                    }
                    creativePortfolioRepository.save(creativePortfolio);
                    break;
                default:
                    logger.error("Type de portfolio invalide: {}", portfolioType);
                    return ResponseEntity.badRequest().body("Type de portfolio invalide");
            }
            logger.info("Portfolio sauvegardé/mis à jour avec succès pour {}", email);
            return ResponseEntity.ok("Portfolio sauvegardé avec succès");
        } catch (DataIntegrityViolationException e) {
            logger.error("Erreur d'intégrité des données (possible duplicata d'email): {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Erreur: Email déjà utilisé pour ce type de portfolio");
        } catch (Exception e) {
            logger.error("Erreur lors de la sauvegarde du portfolio: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Erreur lors de la sauvegarde du portfolio: " + e.getMessage());
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getPortfolio(@PathVariable String email) {
        logger.info("Récupération du portfolio pour {}", email);
        try {
            Optional<BasicPortfolio> basicPortfolio = basicPortfolioRepository.findByEmail(email);
            if (basicPortfolio.isPresent()) {
                logger.info("Portfolio Basique trouvé pour {}", email);
                Map<String, Object> response = new HashMap<>();
                BasicPortfolio portfolio = basicPortfolio.get();
                response.put("id", portfolio.getId());
                response.put("email", portfolio.getEmail());
                response.put("name", portfolio.getName());
                response.put("description", portfolio.getDescription());
                response.put("photoPath", portfolio.getPhotoPath());
                response.put("age", portfolio.getAge());
                response.put("location", portfolio.getLocation());
                response.put("phone", portfolio.getPhone());
                response.put("profession", portfolio.getProfession());
                response.put("website", portfolio.getWebsite());
                response.put("type", "Basique");
                logger.info("Réponse JSON pour portfolio Basique: {}", response);
                return ResponseEntity.ok(response);
            }
            Optional<ProfessionalPortfolio> professionalPortfolio = professionalPortfolioRepository.findByEmail(email);
            if (professionalPortfolio.isPresent()) {
                logger.info("Portfolio Professionnel trouvé pour {}", email);
                Map<String, Object> response = new HashMap<>();
                ProfessionalPortfolio portfolio = professionalPortfolio.get();
                response.put("id", portfolio.getId());
                response.put("email", portfolio.getEmail());
                response.put("name", portfolio.getName());
                response.put("description", portfolio.getDescription());
                response.put("photoPath", portfolio.getPhotoPath());
                response.put("age", portfolio.getAge());
                response.put("location", portfolio.getLocation());
                response.put("phone", portfolio.getPhone());
                response.put("profession", portfolio.getProfession());
                response.put("experienceYears", portfolio.getExperienceYears());
                response.put("education", portfolio.getEducation());
                response.put("skills", portfolio.getSkills());
                response.put("languages", portfolio.getLanguages());
                response.put("linkedinUrl", portfolio.getLinkedinUrl());
                response.put("githubUrl", portfolio.getGithubUrl());
                response.put("type", "Professionnel");
                logger.info("Réponse JSON pour portfolio Professionnel: {}", response);
                return ResponseEntity.ok(response);
            }
            Optional<CreativePortfolio> creativePortfolio = creativePortfolioRepository.findByEmail(email);
            if (creativePortfolio.isPresent()) {
                logger.info("Portfolio Créatif trouvé pour {}", email);
                Map<String, Object> response = new HashMap<>();
                CreativePortfolio portfolio = creativePortfolio.get();
                response.put("id", portfolio.getId());
                response.put("email", portfolio.getEmail());
                response.put("name", portfolio.getName());
                response.put("description", portfolio.getDescription());
                response.put("photoPath", portfolio.getPhotoPath());
                response.put("age", portfolio.getAge());
                response.put("location", portfolio.getLocation());
                response.put("phone", portfolio.getPhone());
                response.put("creativeField", portfolio.getCreativeField());
                response.put("projects", portfolio.getProjects());
                response.put("tools", portfolio.getTools());
                response.put("socialMedia", portfolio.getSocialMedia());
                response.put("linkedinUrl", portfolio.getLinkedinUrl());
                response.put("type", "Créatif");
                logger.info("Réponse JSON pour portfolio Créatif: {}", response);
                return ResponseEntity.ok(response);
            }
            logger.info("Aucun portfolio trouvé pour {}", email);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération du portfolio: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Erreur lors de la récupération du portfolio: " + e.getMessage());
        }
    }

    @GetMapping("/image/{email}")
    public ResponseEntity<byte[]> getImage(@PathVariable String email) {
        logger.info("Récupération de l'image pour {}", email);
        try {
            Optional<BasicPortfolio> basicPortfolio = basicPortfolioRepository.findByEmail(email);
            if (basicPortfolio.isPresent() && basicPortfolio.get().getPhotoPath() != null) {
                String photoPath = basicPortfolio.get().getPhotoPath();
                String fileName = photoPath.replace("/Uploads/", "");
                Path filePath = Paths.get(UPLOAD_DIR + fileName);
                logger.info("Tentative de lecture du fichier image: {}", filePath.toAbsolutePath());
                if (Files.exists(filePath)) {
                    byte[] imageBytes = Files.readAllBytes(filePath);
                    String contentType = Files.probeContentType(filePath);
                    logger.info("Image récupérée avec succès pour {}, type: {}", email, contentType);
                    return ResponseEntity.ok()
                            .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                            .body(imageBytes);
                } else {
                    logger.error("Fichier image non trouvé: {}", filePath.toAbsolutePath());
                }
            }
            Optional<ProfessionalPortfolio> professionalPortfolio = professionalPortfolioRepository.findByEmail(email);
            if (professionalPortfolio.isPresent() && professionalPortfolio.get().getPhotoPath() != null) {
                String photoPath = professionalPortfolio.get().getPhotoPath();
                String fileName = photoPath.replace("/Uploads/", "");
                Path filePath = Paths.get(UPLOAD_DIR + fileName);
                logger.info("Tentative de lecture du fichier image: {}", filePath.toAbsolutePath());
                if (Files.exists(filePath)) {
                    byte[] imageBytes = Files.readAllBytes(filePath);
                    String contentType = Files.probeContentType(filePath);
                    logger.info("Image récupérée avec succès pour {}, type: {}", email, contentType);
                    return ResponseEntity.ok()
                            .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                            .body(imageBytes);
                } else {
                    logger.error("Fichier image non trouvé: {}", filePath.toAbsolutePath());
                }
            }
            Optional<CreativePortfolio> creativePortfolio = creativePortfolioRepository.findByEmail(email);
            if (creativePortfolio.isPresent() && creativePortfolio.get().getPhotoPath() != null) {
                String photoPath = creativePortfolio.get().getPhotoPath();
                String fileName = photoPath.replace("/Uploads/", "");
                Path filePath = Paths.get(UPLOAD_DIR + fileName);
                logger.info("Tentative de lecture du fichier image: {}", filePath.toAbsolutePath());
                if (Files.exists(filePath)) {
                    byte[] imageBytes = Files.readAllBytes(filePath);
                    String contentType = Files.probeContentType(filePath);
                    logger.info("Image récupérée avec succès pour {}, type: {}", email, contentType);
                    return ResponseEntity.ok()
                            .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                            .body(imageBytes);
                } else {
                    logger.error("Fichier image non trouvé: {}", filePath.toAbsolutePath());
                }
            }
            logger.info("Aucune image trouvée pour {}", email);
            return ResponseEntity.notFound().build();
        } catch (IOException e) {
            logger.error("Erreur lors de la récupération de l'image: {}", e.getMessage(), e);
            return ResponseEntity.status(500).build();
        }
    }
}