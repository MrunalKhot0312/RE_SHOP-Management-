package com.example.projectbackend.Controller;

import com.example.projectbackend.DTO.LoginRequest;
import com.example.projectbackend.Entity.Customer;
import com.example.projectbackend.Entity.User;
import com.example.projectbackend.Service.CustomerService;
import com.example.projectbackend.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    public final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user)
    {
        return userService.registration(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        return userService.login(request);
    }

}
