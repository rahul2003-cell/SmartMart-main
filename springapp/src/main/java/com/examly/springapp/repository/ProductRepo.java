package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long>{
    List<Product> findByCategory(String category);
    // List<Product> findByUserId(Long userId);

    @Query("select o from Product o where o.user.userId = :id")
    List<Product> findByUserId(@Param("id") long id);
}
