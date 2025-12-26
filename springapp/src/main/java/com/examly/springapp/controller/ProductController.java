package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Product;
import com.examly.springapp.service.ProductServiceImpl;

@RestController
public class ProductController {
    private ProductServiceImpl service;

    public ProductController(ProductServiceImpl service){
        this.service = service;
    }

    @PostMapping("/api/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> addProduct( @RequestBody Product product){
        Product added = service.addProduct(product);
        if(added == null){
            return ResponseEntity.status(409).build();
        }
        return ResponseEntity.status(201).body(added);
    }

    @PutMapping("/api/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productRequest){
        Product updated = service.updateProduct(id, productRequest);
        if(updated == null){
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(updated);
    }

    @GetMapping("/api/products/user/{userId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')") 
    public ResponseEntity<List<Product>> getProductByUserId( @PathVariable Long userId){
       List <Product> found = service.getProductByUserId(userId);
        if(found.isEmpty()){
            return ResponseEntity.status(200).body(found);
        }
        return ResponseEntity.status(200).body(found);
    }

    @GetMapping("/api/products/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Product> getProductById( @PathVariable Long id) {
       Product found = service.getProductById(id);
       if(found == null){
        return ResponseEntity.status(404).build();
    }
    return ResponseEntity.status(200).body(found);
    }

    @DeleteMapping("/api/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> deleteProduct(@PathVariable Long id){
        boolean found = service.deleteProduct(id);
        if(found){
            return ResponseEntity.status(200).body(found);
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("/api/products/category/{category}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<Product>> getProductsByCategory( @PathVariable String category){
       List<Product> found = service.getProductsByCategory(category);
    if(found == null){
        return ResponseEntity.status(404).build();
    }
    return ResponseEntity.status(200).body(found);
    }
    
    @GetMapping("/api/products")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<Product>> getAllProducts(){
       List<Product> found = service.getAllProducts();
    if(found == null){
        return ResponseEntity.status(400).build();
    }
    return ResponseEntity.status(200).body(found);
    }


}
