package com.examly.springapp.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(exception404.class)
    public ResponseEntity<String> notfound(exception404 e){
        return ResponseEntity.status(404).body(e.getMessage());
    }
    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<String> UsernameAlreadyExistsException(UsernameAlreadyExistsException e) {
        return ResponseEntity.status(500).body(e.getMessage());
    }

    
}
