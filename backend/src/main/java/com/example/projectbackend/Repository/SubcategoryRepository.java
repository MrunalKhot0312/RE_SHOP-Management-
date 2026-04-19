package com.example.projectbackend.Repository;

import com.example.projectbackend.Entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubcategoryRepository extends JpaRepository<SubCategory ,Long> {
    List<SubCategory> findByCategoryId(Long categoryId);
}
