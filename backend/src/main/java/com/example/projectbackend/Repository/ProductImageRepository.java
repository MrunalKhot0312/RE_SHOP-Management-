package com.example.projectbackend.Repository;

import com.example.projectbackend.Entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage,Long> {
}
