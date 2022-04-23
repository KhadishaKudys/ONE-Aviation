package com.example.beprofi.repository;

import com.example.beprofi.entity.OrderCall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderCallRepository extends JpaRepository<OrderCall, Long> {
    List<OrderCall> findAllByNameAndPhone(String name, String phone);
}
