package com.task.App.service;



import com.task.App.entity.ServiceRequest;
import com.task.App.repo.ServiceRequestRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceRequestService {

    @Autowired
    private ServiceRequestRepo requestRepository;

    public ServiceRequest createRequest(ServiceRequest req) {
        req.setStatus("OPEN");
        return requestRepository.save(req);
    }

    public List<ServiceRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public ServiceRequest getRequestById(Long id) {
        return requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public ServiceRequest updateStatus(Long id, String status) {
        ServiceRequest req = getRequestById(id);
        req.setStatus(status);
        return requestRepository.save(req);
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }
}
