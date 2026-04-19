package com.example.projectbackend.Controller;

import com.example.projectbackend.Entity.CategoryEntity;
import com.example.projectbackend.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "*")
public class CategoryController
{

    @Autowired
    private CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service; }

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> all() {
        return ResponseEntity.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryEntity> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id)); }

    @PostMapping
    public ResponseEntity<CategoryEntity> create(@RequestBody CategoryEntity c) {
        return ResponseEntity.ok(service.create(c)); }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryEntity> update(@PathVariable Long id, @RequestBody CategoryEntity c) {
        return ResponseEntity.ok(service.update(id, c)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build(); }
}

// CREATE
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public CategoryEntity create(@RequestBody CategoryEntity category) {
//        return service.create(category);
//    }

// UPDATE
//   @PutMapping("/{id}")
//    public CategoryEntity update(@PathVariable Long id, @RequestBody CategoryEntity category) {
//        return service.update(id, category);
//    }
//Delete
//    @DeleteMapping("/{id}")
//   @ResponseStatus(HttpStatus.NO_CONTENT)
//   public void delete(@PathVariable Long id) {
//       service.delete(id);
//    }

