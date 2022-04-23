package com.example.beprofi.repository;

import com.example.beprofi.entity.CoursesProduct;
import com.example.beprofi.entity.ProfessionsProduct;
import com.example.beprofi.entity.ServicesProduct;
import com.example.beprofi.entity.enums.Language;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProfessionsProductRepository extends JpaRepository<ProfessionsProduct, Long> {
    @Query(value = "SELECT p FROM ProfessionsProduct p")
    List<ProfessionsProduct> findAllByPage(Pageable pageable);
    List<ProfessionsProduct> findAllByLanguage(String language, Pageable pageable);
    List<ProfessionsProduct> findAllByPriceWithDiscountGreaterThanAndPriceWithDiscountLessThan(Float minPrice, Float maxPrice);
    List<ProfessionsProduct> findAllByPrice(Float price);
    List<ProfessionsProduct> findAllByLanguage(String language);
    List<ProfessionsProduct> findAllByLevel(String level);
    List<ProfessionsProduct> findAllByParentCategory(String category);
    List<ProfessionsProduct> findAllByParentCategoryAndChildCategory(String parentCategory, String childCategory);
    List<ProfessionsProduct> findAllByParentCategoryAndIsRecommended(String category, Boolean isRecommended);
    List<ProfessionsProduct> findAllByParentCategoryAndChildCategoryAndIsRecommended(String parentCategory, String childCategory, Boolean isRecommended);
}
