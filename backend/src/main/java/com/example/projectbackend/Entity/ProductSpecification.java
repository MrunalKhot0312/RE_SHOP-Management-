package com.example.projectbackend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class ProductSpecification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // ✅ correct

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonBackReference
    private Product product;


//    public Long getProduct_Id() {
//        return Product_Id;
//    }
//
//    public void setProduct_Id(Long product_Id) {
//        Product_Id = product_Id;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
