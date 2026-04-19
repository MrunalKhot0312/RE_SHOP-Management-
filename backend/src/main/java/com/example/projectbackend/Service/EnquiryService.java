package com.example.projectbackend.Service;

import com.example.projectbackend.Entity.Enquiry;
import com.example.projectbackend.Repository.EnquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnquiryService {

    @Autowired
    public EnquiryRepository repo;

    public List<Enquiry> getData() {
        return repo.findAll();
    }

    public Enquiry create(Enquiry enquiry) {
        return repo.save(enquiry);
    }

    public String deleteData(Long id){
        Optional<Enquiry> byId = repo.findById(id);

        if(byId.isPresent()){
            repo.deleteById(id);
            return "Record deleted Successfully";
        }

        return "User Not Found";
    }

    public Enquiry updateData(Long id, Enquiry enquiry){
        Optional<Enquiry> existing = repo.findById(id);

        if(existing.isPresent()){
            enquiry.setId(id);
            return repo.save(enquiry);
        }

        return null;
    }
}