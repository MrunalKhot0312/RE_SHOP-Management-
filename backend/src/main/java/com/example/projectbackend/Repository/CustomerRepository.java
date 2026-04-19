package com.example.projectbackend.Repository;

import com.example.projectbackend.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CustomerRepository {

    Optional<Customer> findByEmail(String email);

}
