package com.example.projectbackend.Controller;

import com.example.projectbackend.Entity.Product;
import com.example.projectbackend.Repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    // CREATE (FIXED later for multipart if needed)
    @PostMapping
    public Product create(@RequestBody Product product) {
        return repo.save(product);
    }

    // READ ALL
    @GetMapping
    public List<Product> getAll() {
        return repo.findAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        return repo.save(product);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}