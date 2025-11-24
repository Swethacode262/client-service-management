package com.task.App.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task.App.entity.ServiceRequest;
import com.task.App.entity.User;
import com.task.App.repo.ServiceRequestRepo;
import com.task.App.repo.UserRepo;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/request")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceRequestController {

    @Autowired private ServiceRequestRepo repo;
    @Autowired
    private UserRepo userRepo; 

    @PostMapping("/create")
    public Object create(@Valid @RequestBody ServiceRequest r, BindingResult result) {

        if (result.hasErrors()) {
            return result.getAllErrors().get(0).getDefaultMessage();
        }

        if (r.getCreatedBy() == null) {
            return "createdBy (user id) is required!";
        }

        r.setStatus("OPEN");
        return repo.save(r);
    }
    @GetMapping("/my/{userId}")
    public List<ServiceRequest> getMyRequests(@PathVariable Long userId) {
        return repo.findByCreatedBy(userId);
    }

    
    @GetMapping("/all")
    public List<ServiceRequest> all() {
        return repo.findAll();
    }

@GetMapping("/{id}")
public ServiceRequest getById(@PathVariable("id") Long id) {
    Optional<ServiceRequest> request = repo.findById(id);
    if(request.isPresent()) {
        return request.get();
    } else {
        throw new RuntimeException("ServiceRequest not found with ID: " + id);
    }
}
    @DeleteMapping("/delete/{id}")
    public String deleteRequest(@PathVariable("id") Long id) {
        repo.deleteById(id);
        return "Request with ID " + id + " deleted successfully!";
    
    
}      
    
    @PutMapping("/update-status/{id}/{status}")
    public ServiceRequest updateStatus(
            @PathVariable("id") Long id,
            @PathVariable("status") String status) {

        ServiceRequest req = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus(status.toUpperCase());
        return repo.save(req);
    }



}