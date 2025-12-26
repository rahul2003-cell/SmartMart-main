package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.Product;
import com.examly.springapp.model.User;
import com.examly.springapp.model.enums.OrderStatus;
import com.examly.springapp.repository.OrderRepo;
import com.examly.springapp.repository.ProductRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class OrderServiceImpl implements OrderService {
    private OrderRepo orderRepository;
    private UserRepo urepo;
    private ProductRepo productRepository;

    public OrderServiceImpl(OrderRepo orderRepository, UserRepo urepo, ProductRepo productRepository) {
        this.orderRepository = orderRepository;
        this.urepo = urepo;
        this.productRepository = productRepository;
    }

    @Override
public Order addorder(Order order) {
    User user = urepo.findById(order.getUser().getUserId())
        .orElseThrow(() -> new RuntimeException("User not found"));

    // Fetch products from DB using IDs
    List<Product> managedProducts = new ArrayList<>();
    for (Product p : order.getProduct()) {
        Product dbProduct = productRepository.findById(p.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found: " + p.getProductId()));
           //added this line(Gladson)
            dbProduct.setUser(user);
            managedProducts.add(dbProduct); 
            
        if (order.getQuantity() > dbProduct.getStock()) {
        throw new RuntimeException("Insufficient stock for product: " + dbProduct.getName());
        }
        dbProduct.setStock(dbProduct.getStock() - order.getQuantity());
    }
    order.setUser(user);
    order.setProduct(managedProducts);
    //added this line(Gladson) 
    productRepository.saveAll(managedProducts);
    return orderRepository.save(order);
    
}

    @Override
    public void deleteOrder(long orderId) {
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    @Override
    public List<Order> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    @Override
    public List<Order> getOrdersByUser(int userId) {
        long id = userId;
        return orderRepository.findByUserId(id);
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        User user = urepo.findById(userId).orElse(null);
        if (user != null) {

        }
        return orderRepository.findByUser(user);
    }

    @Override
    public Order updateOrder(long id, Order updateOrder) {
        return orderRepository.save(updateOrder);
    }

}
