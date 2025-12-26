package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Product;
import com.examly.springapp.repository.ProductRepo;
@Service
public class ProductServiceImpl implements ProductService{

    private ProductRepo productRepository;

    public ProductServiceImpl(ProductRepo productRepository){
        this.productRepository = productRepository;
    }

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public boolean deleteProduct(Long id) {
        productRepository.deleteById(id);
         return true;
    }

    @Override
    public List<Product> getAllProducts() {
      return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
       return productRepository.findById(id).orElse(null);
    }

    @Override
    public List<Product> getProductByUserId(Long userId) {
       return productRepository.findByUserId(userId);
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Override
    public Product updateProduct(Long productId, Product productRequest) {
        Product p = productRepository.findById(productId).orElse(null);
        if(p == null){
            return productRepository.save(productRequest);
        }
        productRequest.setProductId(productId);
        return productRepository.save(productRequest);
    }

    
}
