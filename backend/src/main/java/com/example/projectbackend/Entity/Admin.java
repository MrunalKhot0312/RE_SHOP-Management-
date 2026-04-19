package com.example.projectbackend.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long Id;
    @Column(unique = true,nullable = false)
    private String username;

    @Column(unique = true,nullable = false)
    private String password;

    private LocalDateTime createdAt;

    public Admin() {
       this.createdAt=LocalDateTime.now();
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
