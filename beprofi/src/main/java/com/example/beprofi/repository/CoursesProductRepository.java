package com.example.beprofi.repository;

import com.example.beprofi.entity.CoursesProduct;
import com.example.beprofi.entity.ProfessionsProduct;
import com.example.beprofi.entity.ServicesProduct;
import com.example.beprofi.entity.enums.Language;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CoursesProductRepository extends JpaRepository<CoursesProduct, Long> {
    @Query(value = "SELECT p FROM CoursesProduct p")
    List<CoursesProduct> findAllByPage(Pageable pageable);
    List<CoursesProduct> findAllByLanguage(String language, Pageable pageable);
    List<CoursesProduct> findAllByPriceWithDiscountGreaterThanAndPriceWithDiscountLessThan(Float minPrice, Float maxPrice);
    List<CoursesProduct> findAllByPrice(Float price);
    List<CoursesProduct> findAllByLanguage(String language);
    List<CoursesProduct> findAllByLevel(String level);
    List<CoursesProduct> findAllByParentCategory(String category);
    List<CoursesProduct> findAllByParentCategoryAndChildCategory(String parentCategory, String childCategory);
    List<CoursesProduct> findAllByParentCategoryAndIsRecommended(String category, Boolean isRecommended);
    List<CoursesProduct> findAllByParentCategoryAndChildCategoryAndIsRecommended(String parentCategory, String child, Boolean isRecommended);
    List<CoursesProduct> findAllByLanguageAndLevel(String language, String level);
}
