package com.example.projectbackend.Repository;

import com.example.projectbackend.Entity.ProductSpecification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductSpecificationRepository extends JpaRepository<ProductSpecification,Long> {
    List<ProductSpecification>findByProduct_Id(Long product_id);
}
