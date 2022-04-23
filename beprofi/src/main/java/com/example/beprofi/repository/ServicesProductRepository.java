package com.example.beprofi.repository;

import com.example.beprofi.entity.CoursesProduct;
import com.example.beprofi.entity.ProfessionsProduct;
import com.example.beprofi.entity.ServicesProduct;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServicesProductRepository extends JpaRepository<ServicesProduct, Long> {
    @Query(value = "SELECT p FROM ServicesProduct p")
    List<ServicesProduct> findAllByPage(Pageable pageable);
    List<ServicesProduct> findAllByPrice(Float price);
    List<ServicesProduct> findAllByPriceWithDiscountGreaterThanAndPriceWithDiscountLessThan(Float minPrice, Float maxPrice);
    List<ServicesProduct> findAllByParentCategory(String category);
    List<ServicesProduct> findAllByParentCategoryAndCategory(String parentCategory, String category);
    List<ServicesProduct> findAllByParentCategoryAndCategoryAndChildCategory(String parentCategory, String category, String childCategory);
    List<ServicesProduct> findAllByParentCategoryAndIsRecommended(String category, Boolean isRecommended);
    List<ServicesProduct> findAllByParentCategoryAndCategoryAndIsRecommended(String parentCategory, String category, Boolean isRecommended);
    List<ServicesProduct> findAllByParentCategoryAndCategoryAndChildCategoryAndIsRecommended(String parentCategory, String category, String childCategory, Boolean isRecommended);
}
