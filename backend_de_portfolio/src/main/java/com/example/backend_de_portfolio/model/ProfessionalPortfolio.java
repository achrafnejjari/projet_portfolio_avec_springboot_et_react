package com.example.backend_de_portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "professional_portfolios")
public class ProfessionalPortfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(name = "photo_path")
    private String photoPath;

    @Column
    private Integer age;

    @Column
    private String location;

    @Column
    private String phone;

    @Column
    private String profession;

    @Column
    private Integer experienceYears;

    @Column
    private String education;

    @Column
    private String skills;

    @Column
    private String languages;

    @Column
    private String linkedinUrl;

    @Column
    private String githubUrl;

    public ProfessionalPortfolio() {}

    public ProfessionalPortfolio(String email, String name, String description, String photoPath, Integer age, String location, String phone, String profession, Integer experienceYears, String education, String skills, String languages, String linkedinUrl, String githubUrl) {
        this.email = email;
        this.name = name;
        this.description = description;
        this.photoPath = photoPath;
        this.age = age;
        this.location = location;
        this.phone = phone;
        this.profession = profession;
        this.experienceYears = experienceYears;
        this.education = education;
        this.skills = skills;
        this.languages = languages;
        this.linkedinUrl = linkedinUrl;
        this.githubUrl = githubUrl;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPhotoPath() { return photoPath; }
    public void setPhotoPath(String photoPath) { this.photoPath = photoPath; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getProfession() { return profession; }
    public void setProfession(String profession) { this.profession = profession; }
    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
    public String getLanguages() { return languages; }
    public void setLanguages(String languages) { this.languages = languages; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
}