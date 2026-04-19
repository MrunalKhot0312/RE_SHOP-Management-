package com.example.projectbackend.Controller;

import com.example.projectbackend.DTO.SubCategoryDTO;
import com.example.projectbackend.Entity.SubCategory;
import com.example.projectbackend.Service.SubcategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subcategory")
public class SubcategoryController {

    private final SubcategoryService service;

    public SubcategoryController(SubcategoryService service) {
        this.service = service;
    }
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody SubCategoryDTO dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody SubCategoryDTO dto){
        return service.update(id,dto);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return service.delete(id);
    }
//    @GetMapping("/by-category/{categoryId}")
//    public ResponseEntity<?> getByCategory(@PathVariable Long categoryId) {
//        return service.getByCategory(categoryId);
//    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return service.getAll();
    }
    @GetMapping("/by-category/{categoryId}")
    public ResponseEntity<?> getByCategory(@PathVariable Long categoryId) {
        return service.getByCategory(categoryId);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return service.getById(id);
    }

}
