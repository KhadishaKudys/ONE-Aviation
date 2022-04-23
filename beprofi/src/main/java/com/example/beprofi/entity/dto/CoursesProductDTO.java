package com.example.beprofi.entity.dto;

import com.example.beprofi.entity.Syllabus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class CoursesProductDTO {
    private String name;
    private Float price;
    private String currency;
    private String article;
    private String overview;
    private String parentCategory;
    private String childCategory;
    private List<Syllabus> syllabus = null;
    private int discount = 0;
    private String language;
    private String level;
    private Boolean isRecommended;
    @JsonProperty("syllabus_title")
    private String syllabusTitle;
}
