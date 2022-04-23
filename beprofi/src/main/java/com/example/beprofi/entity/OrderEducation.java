package com.example.beprofi.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "order_education")
public class OrderEducation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;
    @JsonProperty("product_id")
    @Column(name = "product_id")
    private Long productId;
    private String email;
    private String code;
    private String status;
}
