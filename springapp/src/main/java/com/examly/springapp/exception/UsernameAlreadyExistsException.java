package com.examly.springapp.exception;

public class UsernameAlreadyExistsException extends RuntimeException{

    public UsernameAlreadyExistsException(String m){
        super(m);
    }
}
