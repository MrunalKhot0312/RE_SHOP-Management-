package com.example.projectbackend.Repository;

import com.example.projectbackend.Entity.Customer;
import com.example.projectbackend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long>  {
    Optional<User> findByEmail(String email);

}
