package com.task.App.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.App.entity.ServiceRequest;

public interface ServiceRequestRepo extends JpaRepository<ServiceRequest, Long> {
	List<ServiceRequest> findByCreatedBy(Long createdBy);

}