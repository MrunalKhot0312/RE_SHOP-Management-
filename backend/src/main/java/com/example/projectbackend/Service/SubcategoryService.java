package com.example.projectbackend.Service;

import com.example.projectbackend.DTO.SubCategoryDTO;
import com.example.projectbackend.Entity.CategoryEntity;
import com.example.projectbackend.Entity.SubCategory;
import com.example.projectbackend.Repository.CategoryRepository;
import com.example.projectbackend.Repository.SubcategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubcategoryService {
    private final SubcategoryRepository repository;
    private final CategoryRepository categoryRepository;

    public SubcategoryService(SubcategoryRepository repository, CategoryRepository categoryRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
    }


    private SubCategoryDTO mapToDTO(SubCategory sub) {
        SubCategoryDTO dto = new SubCategoryDTO();

        dto.setName(sub.getName());
        dto.setImageurl(sub.getImageurl());
        dto.setCategoryId(sub.getCategory().getId());

        return dto;
    }
    public ResponseEntity<?> create(SubCategoryDTO dto) {

        SubCategory subCategory = new SubCategory();
        subCategory.setName(dto.getName());

        Optional<CategoryEntity> byIdCategory =
                categoryRepository.findById(dto.getCategoryId());

        if (byIdCategory.isPresent()) {
            CategoryEntity category = byIdCategory.get();
            subCategory.setCategory(category);
        } else {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }


        SubCategory save = repository.save(subCategory);

        return ResponseEntity.ok(save);
    }

    // GET ALL
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    //  GET BY ID
    public ResponseEntity<?> getById(Long id) {

        Optional<SubCategory> sub = repository.findById(id);

        if (sub.isPresent()) {
            return ResponseEntity.ok(sub.get());
        } else {
            return new ResponseEntity<>("SubCategory not found", HttpStatus.NOT_FOUND);
        }
    }

//   // ✅ GET BY CATEGORY (CRITICAL)
//public ResponseEntity<?> getByCategory(Long categoryId) {
//    return ResponseEntity.ok(repository.findByCategoryId(categoryId));
//}
    public ResponseEntity<?> update(Long id, SubCategoryDTO dto) {

        Optional<SubCategory> optionalSub = repository.findById(id);

        if (optionalSub.isEmpty()) {
            return new ResponseEntity<>("SubCategory not found", HttpStatus.NOT_FOUND);
        }

        SubCategory sub = optionalSub.get();
        sub.setName(dto.getName());

        Optional<CategoryEntity> category =
                categoryRepository.findById(dto.getCategoryId());

        if (category.isEmpty()) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        sub.setCategory(category.get());

        SubCategory updated = repository.save(sub);

        return ResponseEntity.ok(updated);
    }

    //  DELETE
    public ResponseEntity<?> delete(Long id) {

        if (!repository.existsById(id)) {
            return new ResponseEntity<>("SubCategory not found", HttpStatus.NOT_FOUND);
        }

        repository.deleteById(id);

        return ResponseEntity.ok("Deleted successfully");
    }
    //  GET BY CATEGORY (CRITICAL)
    public ResponseEntity<?> getByCategory(Long categoryId) {
        return ResponseEntity.ok(repository.findByCategoryId(categoryId));
    }

}
