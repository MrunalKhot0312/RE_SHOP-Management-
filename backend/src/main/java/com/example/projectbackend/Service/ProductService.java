package com.example.projectbackend.Service;

import com.example.projectbackend.DTO.ProductDTO;
import com.example.projectbackend.DTO.SpecificationDTO;
import com.example.projectbackend.Entity.CategoryEntity;
import com.example.projectbackend.Entity.Product;
import com.example.projectbackend.Entity.ProductImage;
import com.example.projectbackend.Entity.ProductSpecification;
import com.example.projectbackend.Repository.CategoryRepository;
import com.example.projectbackend.Repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repo;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository repo, CategoryRepository categoryRepository) {
        this.repo = repo;
        this.categoryRepository = categoryRepository;
    }

    // ================= CREATE =================
    public ResponseEntity<?> create(ProductDTO dto) {

        Product product = new Product();

        product.setProductName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : true);

        // CATEGORY
        Optional<CategoryEntity> categoryOpt = categoryRepository.findById(dto.getCategoryId());

        if (categoryOpt.isEmpty()) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

       // product.s(categoryOpt.get());

        // ================= IMAGES =================
        if (dto.getImageurls() != null) {

            boolean isPrimary = true;

            for (String imgUrl : dto.getImageurls()) {

                ProductImage img = new ProductImage();
                img.setImageurl(imgUrl); // ✔ FIXED (was incorrect in your code)
                img.setProduct(product);
                img.setPrimary(isPrimary);

                isPrimary = false;

                product.getImages().add(img);
            }
        }

        // ================= SPECIFICATIONS =================
        if (dto.getSpecifications() != null) {

            for (SpecificationDTO s : dto.getSpecifications()) {

                ProductSpecification specification = new ProductSpecification();
                specification.setName(s.getName());
                specification.setValue(s.getValue());
                specification.setProduct(product);

                product.getSpecifications().add(specification);
            }
        }

        Product saved = repo.save(product);
        return ResponseEntity.ok(saved);
    }

    // ================= UPDATE =================
    public ResponseEntity<?> update(Long id, ProductDTO dto) {

        Optional<Product> productOpt = repo.findById(id);

        if (productOpt.isEmpty()) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }

        Product product = productOpt.get();

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : true);

        // CATEGORY
        Optional<CategoryEntity> categoryOpt = categoryRepository.findById(dto.getCategoryId());

        if (categoryOpt.isEmpty()) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        product.setCategory(categoryOpt.get());

        // ================= IMAGES =================
        if (dto.getImageurls() != null && !dto.getImageurls().isEmpty()) {

            product.getImages().clear();

            boolean isPrimary = true;

            for (String imgUrl : dto.getImageurls()) {

                ProductImage img = new ProductImage();
                img.setImageUrl(imgUrl); // ✔ FIXED (IMPORTANT BUG)
                img.setProduct(product);
                img.setPrimary(isPrimary);

                isPrimary = false;

                product.getImages().add(img);
            }
        }

        // ================= SPECIFICATIONS =================
        if (dto.getSpecifications() != null) {

            product.getSpecifications().clear();

            for (SpecificationDTO s : dto.getSpecifications()) {

                ProductSpecification specification = new ProductSpecification();
                specification.setName(s.getName());
                specification.setValue(s.getValue());
                specification.setProduct(product);

                product.getSpecifications().add(specification);
            }
        }

        Product updated = repo.save(product);
        return ResponseEntity.ok(updated);
    }

    // ================= DELETE =================
    public ResponseEntity<String> delete(Long id) {

        if (!repo.existsById(id)) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }

        repo.deleteById(id);
        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }

    // ================= GET ALL =================
    public ResponseEntity<List<Product>> getAllProduct() {

        List<Product> list = repo.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // ================= GET BY ID =================
    public ResponseEntity<?> getById(Long id) {

        Optional<Product> productOpt = repo.findById(id);

        if (productOpt.isEmpty()) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(productOpt.get(), HttpStatus.OK);
    }
}