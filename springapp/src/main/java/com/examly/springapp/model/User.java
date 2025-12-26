package com.examly.springapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id") // This is critical
    private long userId;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")

    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "Username is required")
    private String username;

    @Pattern(regexp = "^\\d{10}$", message = "Mobile number must be 10 digits")
    private String mobileNumber;

    @NotBlank(message = "User role is required")
    private String userRole;

    // @OneToMany(mappedBy = "user")
    // @JsonManagedReference
    // @JsonIgnoreProperties({"user"})
    // private List<Product> products;

    // @OneToMany(mappedBy = "user")
    // @JsonManagedReference
    // @JsonIgnoreProperties({"user"})
    // private List<Feedback> feedbackList;

    public User() {
    }

    public User(long userId, String email, String password, String username, String mobileNumber, String userRole) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.username = username;
        this.mobileNumber = mobileNumber;
        this.userRole = userRole;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    // public List<Product> getProducts() {
    //     return products;
    // }

    // public void setProducts(List<Product> products) {
    //     this.products = products;
    // }

    // public List<Feedback> getFeedbackList() {
    //     return feedbackList;
    // }

    // public void setFeedbackList(List<Feedback> feedbackList) {
    //     this.feedbackList = feedbackList;
    // }
    

}
