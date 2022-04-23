package com.example.beprofi.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "order_professions")
public class OrderProfessions {
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
