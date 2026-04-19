package com.example.projectbackend.Repository;

import com.example.projectbackend.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
