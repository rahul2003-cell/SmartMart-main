package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.enums.OrderStatus;

@Service
public interface OrderService {
    public Order addorder(Order order);
    public Order updateOrder(long id, Order updateOrder);
    public void deleteOrder(long orderId);
    public Order getOrderById(long orderId);
    public List<Order> getOrdersByUser(int userId);
    public List<Order> getOrdersByStatus(OrderStatus status);
    public List<Order> getAllOrders();
    public List<Order> getOrdersByUserId(Long userId);
}
