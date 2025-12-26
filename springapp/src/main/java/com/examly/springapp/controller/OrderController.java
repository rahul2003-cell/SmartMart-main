package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import com.examly.springapp.model.Order;
import com.examly.springapp.service.OrderServiceImpl;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class OrderController {
    private OrderServiceImpl ser;

    public OrderController(OrderServiceImpl ser){
        this.ser=ser;
    }

    @PostMapping("/api/orders")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Order> addorder(@RequestBody Order order){
        log.info("Added order Method Called");
        Order found = ser.addorder(order);
        if(found==null){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(200).body(found);
    }

    @GetMapping("/api/orders/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Order> getOrderById(@PathVariable long id){
        log.info("Get order Method Called");
        Order found = ser.getOrderById(id);
        if(found==null){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(200).body(found);
    }

    @PutMapping("/api/orders/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrder(@PathVariable long id, @RequestBody Order updateOrder){
        log.info("Update  order Method Called");
        Order found = ser.updateOrder(id,updateOrder);
        if(found==null){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(200).body(found);
    }

    @DeleteMapping("/api/orders/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteOrder(@PathVariable long id){
        ser.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/api/orders")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> found = ser.getAllOrders();
        if(found==null){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(200).body(found);
    }

    @GetMapping("/api/orders/user/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable long userId){
        List<Order> found = ser.getOrdersByUserId(userId);
        if(found==null){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(200).body(found);
    }


}
