package com.examly.springapp.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.examly.springapp.model.enums.OrderStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "orders")
public class Order {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
            private long orderId;

            @NotBlank(message = "Shipping address is required")
            @Size(max = 255, message = "Shipping address cannot exceed 255 characters")
            private String shippingAddress;

            @Positive(message = "Total amount must be greater than zero")
            private double totalAmount;

            @Min(value = 1, message = "Quantity must be at least 1")
            private int quantity;
            @Enumerated(EnumType.STRING)
            private OrderStatus status = OrderStatus.pending;
            
            @PastOrPresent(message = "Created date cannot be in the future")
            private Date createdAt;

            @PastOrPresent(message = "Updated date cannot be in the future")
            private Date updatedAt;

            @ManyToOne
            @JoinColumn(name = "user_id")
            @NotNull(message = "User is required")
            private User user;

            @ManyToMany
            @JoinTable(
                name = "order_products",
                joinColumns = @JoinColumn(name="order_id"),
                inverseJoinColumns = @JoinColumn(name="product_id")
            )
            @NotEmpty(message = "Order must contain at least one product")
            List<Product> product = new ArrayList<>();

            public Order() {
            }

    public Order(long orderId, String shippingAddress, double totalAmount, int quantity, OrderStatus status,
            Date createdAt, Date updatedAt, User user, List<Product> product) {
        this.orderId = orderId;
        this.shippingAddress = shippingAddress;
        this.totalAmount = totalAmount;
        this.quantity = quantity;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
        this.product = product;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Product> getProduct() {
        return product;
    }

    public void setProduct(List<Product> product) {
        this.product = product;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    




}
