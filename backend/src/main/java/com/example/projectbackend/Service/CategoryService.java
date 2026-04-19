package com.example.projectbackend.Service;

import com.example.projectbackend.Entity.CategoryEntity;
import com.example.projectbackend.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository repo;

    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    public List<CategoryEntity> findAll() {
        return repo.findAll();
    }

    public CategoryEntity findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public CategoryEntity create(CategoryEntity c) {
        if (c.getName() != null && repo.existsByName(c.getName())) {
            throw new RuntimeException("Category already exists");
        }
        return repo.save(c);
    }

    public CategoryEntity update(Long id, CategoryEntity incoming) {
        CategoryEntity existing = findById(id);

        existing.setName(incoming.getName());
        existing.setImageUrl(incoming.getImageUrl());

        return repo.save(existing);
    }

    // SAME AS PHOTO CODE
    public ResponseEntity<?> delete(Long id) {
        Optional<CategoryEntity> byId;
        byId = repo.findById(id);

        if (byId.isPresent()) {
            repo.deleteById(id);
            return ResponseEntity.ok(
                    Map.of("message", "Record Deleted")
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "Category Not Found"));
    }
}
//CREATE

//    public CategoryEntity create(CategoryEntity category) {
//        return repo.save(category);
//    }

// UPDATE
//    public CategoryEntity update(Long id, CategoryEntity categoryDetails) {
//        CategoryEntity category = repo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
//
//        category.setName(categoryDetails.getName());
//        category.setImageUrl(categoryDetails.getImageUrl());
//
//        return repo.save(category);
//    }
// DELETE
//    public void delete(Long id) {
//        CategoryEntity category = repo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
//        repo.delete(category);


