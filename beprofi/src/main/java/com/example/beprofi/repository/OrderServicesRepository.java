package com.example.beprofi.repository;

import com.example.beprofi.entity.OrderCall;
import com.example.beprofi.entity.OrderServices;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderServicesRepository extends JpaRepository<OrderServices, Long> {
    List<OrderServices> findAllByNameAndPhone(String name, String phone);
}
