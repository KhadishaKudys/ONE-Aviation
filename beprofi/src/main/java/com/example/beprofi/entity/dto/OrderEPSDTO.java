package com.example.beprofi.entity.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@NoArgsConstructor
public class OrderEPSDTO {
    private String name;
    private String phone;
    @JsonProperty("product_id")
    private Long productId;
    private String email;
    private String code;
}
