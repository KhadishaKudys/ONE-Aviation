package com.example.beprofi.entity;

import com.example.beprofi.entity.enums.Language;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladmihalcea.hibernate.type.array.ListArrayType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "courses_products")
@TypeDef(name = "list-array", typeClass = ListArrayType.class)
public class CoursesProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Float price;
    private String article;
    private String currency;
    @JsonProperty("image_url")
    @Column(name = "image_url")
    private String imageUrl;
    private String overview;
    @JsonProperty("parent_category")
    @Column(name = "parent_category")
    private String parentCategory;
    @JsonProperty("child_category")
    @Column(name = "child_category")
    private String childCategory;
    @JsonProperty("syllabus_title")
    @Column(name = "syllabus_title")
    private String syllabusTitle;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonProperty("syllabus_list")
    private List<Syllabus> syllabusList = new ArrayList<>();
    private int discount;
    @JsonProperty("price_with_discount")
    @Column(name = "price_with_discount")
    private Float priceWithDiscount;
    private String language;
    private String level;
    @JsonProperty("is_recommended")
    @Column(name = "is_recommended")
    private Boolean isRecommended;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CoursesProduct that = (CoursesProduct) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
