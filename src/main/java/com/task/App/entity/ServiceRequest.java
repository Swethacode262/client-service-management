package com.task.App.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class ServiceRequest {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Client ID cannot be empty")
    private String clientId;

    @NotBlank(message = "Request details cannot be blank")
    @Size(min = 5, message = "Request details must be at least 5 characters")
    private String requestDetails;
    private String status; 
    private Long createdBy; 

}
