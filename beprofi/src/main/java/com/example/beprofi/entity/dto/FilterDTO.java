package com.example.beprofi.entity.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class FilterDTO {
    private List<String> languages;
    private List<String> levels;
}
