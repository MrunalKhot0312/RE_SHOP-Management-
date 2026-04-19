package com.example.projectbackend.Controller;

import com.example.projectbackend.Entity.FeedBack;
import com.example.projectbackend.Service.FeedBackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedBackController {
    private final FeedBackService service;

    public FeedBackController(FeedBackService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody FeedBack feedback){
        return service.create(feedback);
    }

    @GetMapping
    public ResponseEntity<List<FeedBack>> all(){
        return   service.findAll();
    }
}
