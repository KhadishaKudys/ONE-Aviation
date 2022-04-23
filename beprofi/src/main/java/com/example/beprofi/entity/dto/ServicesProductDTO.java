package com.example.beprofi.entity.dto;

import com.example.beprofi.entity.Syllabus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.List;

@Data
@NoArgsConstructor
public class ServicesProductDTO {
    private String name;
    private Float price;
    private String currency;
    private String article;
    private String overview;
    private String parentCategory;
    private String category;
    private String childCategory;
    private int discount = 0;
    private List<Syllabus> syllabus = null;
    private Boolean isRecommended;
    @JsonProperty("syllabus_title")
    private String syllabusTitle;
}
