package com.example.projectbackend.Controller;

import com.example.projectbackend.Entity.Enquiry;
import com.example.projectbackend.Service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/enquiry")
public class EnquiryController {

    @Autowired
    public EnquiryService service;

    @PostMapping
    public ResponseEntity<Enquiry> saveData(@RequestBody Enquiry enquiry){
        return ResponseEntity.ok(service.create(enquiry));
    }

    @GetMapping
    public ResponseEntity<List<Enquiry>> getData(){
        return ResponseEntity.ok(service.getData());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enquiry> updateData(@PathVariable Long id, @RequestBody Enquiry enquiry){
        return ResponseEntity.ok(service.updateData(id,enquiry));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id){
        return ResponseEntity.ok(service.deleteData(id));
    }
}