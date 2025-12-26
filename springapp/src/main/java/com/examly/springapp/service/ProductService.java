package com.examly.springapp.service;

import com.examly.springapp.model.Product;
import java.util.List;

public interface ProductService {

    public Product addProduct(Product product);
    public List<Product> getAllProducts();
    public Product getProductById(Long id);
    public List<Product> getProductByUserId(Long userId);
    public List<Product> getProductsByCategory(String category);
    public boolean deleteProduct(Long id);
    public Product updateProduct(Long productId, Product productRequest);

}
