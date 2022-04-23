package com.example.beprofi.repository;

import com.example.beprofi.entity.OrderCall;
import com.example.beprofi.entity.OrderProfessions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderProfessionsRepository extends JpaRepository<OrderProfessions, Long> {
    List<OrderProfessions> findAllByNameAndPhone(String name, String phone);
}
