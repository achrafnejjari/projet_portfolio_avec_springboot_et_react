package com.example.backend_de_portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "creative_portfolios")
public class CreativePortfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column
    private String photoPath;

    @Column
    private Integer age;

    @Column
    private String location;

    @Column
    private String phone;

    @Column
    private String creativeField;

    @Column
    private String projects;

    @Column
    private String tools;

    @Column
    private String socialMedia;

    @Column
    private String linkedinUrl;

    public CreativePortfolio() {}

    public CreativePortfolio(String email, String name, String description, String photoPath, Integer age, String location, String phone, String creativeField, String projects, String tools, String socialMedia, String linkedinUrl) {
        this.email = email;
        this.name = name;
        this.description = description;
        this.photoPath = photoPath;
        this.age = age;
        this.location = location;
        this.phone = phone;
        this.creativeField = creativeField;
        this.projects = projects;
        this.tools = tools;
        this.socialMedia = socialMedia;
        this.linkedinUrl = linkedinUrl;
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
    public String getCreativeField() { return creativeField; }
    public void setCreativeField(String creativeField) { this.creativeField = creativeField; }
    public String getProjects() { return projects; }
    public void setProjects(String projects) { this.projects = projects; }
    public String getTools() { return tools; }
    public void setTools(String tools) { this.tools = tools; }
    public String getSocialMedia() { return socialMedia; }
    public void setSocialMedia(String socialMedia) { this.socialMedia = socialMedia; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
}