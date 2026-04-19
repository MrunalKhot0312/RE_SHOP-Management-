package com.example.projectbackend.Service;

import com.example.projectbackend.Entity.FeedBack;
import com.example.projectbackend.Repository.FeedbackRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedBackService {
    private final FeedbackRepository repo;

    public FeedBackService(FeedbackRepository repo) {
        this.repo = repo;
    }

    public ResponseEntity<?> create(FeedBack feedback){
        FeedBack save = repo.save(feedback);
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    }

    public ResponseEntity<List<FeedBack>> findAll(){
        List<FeedBack> all = repo.findAll();
        return new ResponseEntity<>(all,HttpStatus.OK);
    }
}
