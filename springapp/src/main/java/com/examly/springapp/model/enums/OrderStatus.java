package com.examly.springapp.model.enums;

public enum OrderStatus {
    pending,
    processing,
    accepted,
    packed,
    shipped,
    delivered,
    out_for_delivery, // replaced spaces with underscore
    cancel,
    returned,
    cancelled
}