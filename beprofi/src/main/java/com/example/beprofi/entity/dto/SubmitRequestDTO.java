package com.example.beprofi.entity.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SubmitRequestDTO {
    private Long productId;
    private String fio;
    private String phone;
}
