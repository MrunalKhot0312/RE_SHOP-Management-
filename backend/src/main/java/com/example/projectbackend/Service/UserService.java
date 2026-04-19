package com.example.projectbackend.Service;

import com.example.projectbackend.DTO.LoginRequest;
import com.example.projectbackend.Entity.Customer;
import com.example.projectbackend.Entity.User;
import com.example.projectbackend.Repository.CustomerRepository;
import com.example.projectbackend.Repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    public ResponseEntity<?> registration(User user){
        Optional<User> byEmail = userRepository.findByEmail(user.getEmail());
        if(byEmail.isPresent()){
            // return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
            return  ResponseEntity.badRequest().body("Email already exists");
        }

        User save = userRepository.save(user);
        save.setPassword(null);
        return ResponseEntity.ok(save);
    }

    public ResponseEntity<?> login(LoginRequest request){
        Optional<User> byEmail = userRepository.findByEmail(request.getEmail());
        if(byEmail.isPresent()){
            User user = byEmail.get();
            if(user.getPassword().equals(request.getPassword())){
                user.setPassword(null); // hide password
                return ResponseEntity.ok(user);
            }
            return ResponseEntity.status(401).body("Invalid username password");
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
