package com.example.beprofi.repository;

import com.example.beprofi.entity.OrderCall;
import com.example.beprofi.entity.OrderEducation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderEducationRepository extends JpaRepository<OrderEducation, Long> {
    List<OrderEducation> findAllByNameAndPhone(String name, String phone);
}
