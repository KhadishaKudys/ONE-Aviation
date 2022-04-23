package com.example.beprofi.rest;

import com.example.beprofi.entity.CoursesProduct;
import com.example.beprofi.entity.ProfessionsProduct;
import com.example.beprofi.entity.ServicesProduct;
import com.example.beprofi.entity.dto.CoursesProductDTO;
import com.example.beprofi.entity.dto.FilterDTO;
import com.example.beprofi.entity.dto.SubmitRequestDTO;
import com.example.beprofi.entity.enums.Language;
import com.example.beprofi.helpers.CurrencyHelper;
import com.example.beprofi.repository.CoursesProductRepository;
import com.example.beprofi.repository.ServicesProductRepository;
import com.example.beprofi.service.MailSender;
import com.example.beprofi.store.PictureManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/courses/products")
public class CoursesProductRestController {
    private final CoursesProductRepository coursesProductRepository;
    private final CurrencyHelper currencyHelper;

    public CoursesProductRestController(CoursesProductRepository coursesProductRepository, CurrencyHelper currencyHelper) {
        this.coursesProductRepository = coursesProductRepository;
        this.currencyHelper = currencyHelper;
    }

    @GetMapping
    public List<CoursesProduct> getProductsByLanguage(@RequestParam("page") int page, @RequestParam("currency") String currency) {
        List<CoursesProduct> products = coursesProductRepository.findAllByPage(PageRequest.of(page - 1, 18));
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }
        return products;
    }

    @GetMapping("/{id}")
    public CoursesProduct getProductById(@PathVariable("id") Long id, @RequestParam("currency") String currency) {
        CoursesProduct product = coursesProductRepository.findById(id).orElseThrow();
        product.setPriceWithDiscount(currencyHelper.convert(product.getCurrency(), currency, product.getPriceWithDiscount()));
        product.setPrice(currencyHelper.convert(product.getCurrency(), currency, product.getPrice()));
        product.setCurrency(currency);


        return product;
    }

    @GetMapping("/recommended")
    public List<CoursesProduct> getProductById(@RequestParam("ids") List<Long> ids, @RequestParam("currency") String currency) {
        List<CoursesProduct> recommended = coursesProductRepository.findAllById(ids);
        recommended.forEach(product -> {
            product.setPriceWithDiscount(currencyHelper.convert(product.getCurrency(), currency, product.getPriceWithDiscount()));
            product.setPrice(currencyHelper.convert(product.getCurrency(), currency, product.getPrice()));
            product.setCurrency(currency);
        });

        return recommended;
    }


    @GetMapping("/recommended/{parent_category}")
    public List<CoursesProduct> getProductByParentCategory(@PathVariable("parent_category") String parentCategory, @RequestParam("currency") String currency) {
        List<CoursesProduct> products = coursesProductRepository.findAllByParentCategoryAndIsRecommended(parentCategory, true);
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }
        return products;
    }

    @GetMapping("/recommended/{parent_category}/{child_category}")
    public List<CoursesProduct> getRecommendedProductsByCategory(@PathVariable("parent_category") String parentCategory, @PathVariable("child_category") String childCategory, @RequestParam("currency") String currency) {
        List<CoursesProduct> products = coursesProductRepository.findAllByParentCategoryAndChildCategoryAndIsRecommended(parentCategory, childCategory, true);
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }
        return products;
    }

    @GetMapping("/{parent_category}/{child_category}")
    public List<CoursesProduct> getProductsByCategory(@PathVariable("parent_category") String parentCategory, @PathVariable("child_category") String childCategory, @RequestParam("currency") String currency) {
        if (childCategory == null || childCategory.equals("")) {
            List<CoursesProduct> products = coursesProductRepository.findAllByParentCategory(parentCategory);
            for (int i = 0; i < products.size(); i++) {
                products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
                products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
                products.get(i).setCurrency(currency);
            }
            return products;
        }
        List<CoursesProduct> products = coursesProductRepository.findAllByParentCategoryAndChildCategory(parentCategory, childCategory);
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }
        return products;
    }


    @PostMapping("/request")
    public SubmitRequestDTO sendRequest(@RequestBody SubmitRequestDTO submitRequestDTO) {
        return submitRequestDTO;
    }

    @PostMapping("/save")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public CoursesProduct saveCourse(@RequestParam("product") CoursesProductDTO coursesProductDTO, @RequestParam("image") MultipartFile image) {
        CoursesProduct coursesProduct = new CoursesProduct();
        coursesProduct.setCurrency("KZT");
        coursesProduct.setArticle(coursesProductDTO.getArticle());
        coursesProduct.setImageUrl(PictureManager.storeCoursesFile(image));
        coursesProduct.setName(coursesProductDTO.getName());
        coursesProduct.setOverview(coursesProductDTO.getOverview());
        coursesProduct.setParentCategory(coursesProductDTO.getParentCategory());
        coursesProduct.setChildCategory(coursesProductDTO.getChildCategory());
        coursesProduct.setChildCategory(coursesProductDTO.getChildCategory());
        coursesProduct.setPrice(currencyHelper.convert(coursesProductDTO.getCurrency(), "KZT", coursesProductDTO.getPrice()));
        coursesProduct.setSyllabusList(coursesProductDTO.getSyllabus());
        coursesProduct.setDiscount(coursesProductDTO.getDiscount());
        coursesProduct.setLevel(coursesProductDTO.getLevel());
        coursesProduct.setPriceWithDiscount(coursesProduct.getPrice() - (coursesProduct.getPrice() * coursesProductDTO.getDiscount() / 100.0f));
        coursesProduct.setLanguage(coursesProductDTO.getLanguage());
        coursesProduct.setIsRecommended(coursesProductDTO.getIsRecommended());
        coursesProduct.setSyllabusTitle(coursesProductDTO.getSyllabusTitle());

        return coursesProductRepository.save(coursesProduct);
    }
    @PostMapping("/edit")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public CoursesProduct editCourse(@RequestParam("product") CoursesProductDTO coursesProductDTO, @RequestParam("image") MultipartFile image, @RequestParam("id") Long id) {
        CoursesProduct coursesProduct = coursesProductRepository.findById(id).orElseThrow();
        coursesProduct.setCurrency("KZT");
        coursesProduct.setArticle(coursesProductDTO.getArticle());
        coursesProduct.setImageUrl(PictureManager.storeCoursesFile(image));
        coursesProduct.setName(coursesProductDTO.getName());
        coursesProduct.setOverview(coursesProductDTO.getOverview());
        coursesProduct.setChildCategory(coursesProductDTO.getChildCategory());
        coursesProduct.setParentCategory(coursesProductDTO.getParentCategory());
        coursesProduct.setChildCategory(coursesProductDTO.getChildCategory());
        coursesProduct.setPrice(currencyHelper.convert(coursesProductDTO.getCurrency(), "KZT", coursesProductDTO.getPrice()));
        coursesProduct.setSyllabusList(coursesProductDTO.getSyllabus());
        coursesProduct.setDiscount(coursesProductDTO.getDiscount());
        coursesProduct.setLevel(coursesProductDTO.getLevel());
        coursesProduct.setPriceWithDiscount(coursesProduct.getPrice() - (coursesProduct.getPrice() * coursesProductDTO.getDiscount() / 100.0f));
        coursesProduct.setLanguage(coursesProductDTO.getLanguage());
        coursesProduct.setIsRecommended(coursesProductDTO.getIsRecommended());
        coursesProduct.setSyllabusTitle(coursesProductDTO.getSyllabusTitle());

        return coursesProductRepository.save(coursesProduct);
    }

    @PostMapping("/delete")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public boolean deleteProductById(@RequestParam("id") Long id) {
        coursesProductRepository.deleteById(id);
        return true;
    }



    @PostMapping("/discount")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public CoursesProduct setDiscount(@RequestParam("discount") int discount, @RequestParam("id") Long id) throws Exception {
        if (discount > 100) {
            throw new Exception("Discount can not be more than 100");
        }
        CoursesProduct coursesProduct = coursesProductRepository.findById(id).orElseThrow(() -> new Exception("Product not found"));
        coursesProduct.setDiscount(discount);
        coursesProduct.setPriceWithDiscount(coursesProduct.getPrice() - (coursesProduct.getPrice() * discount / 100.0f));

        return coursesProductRepository.save(coursesProduct);
    }

    @PostMapping("/filter/parent")
    public List<CoursesProduct> filter(@RequestBody FilterDTO filterDTO,
                                       @RequestParam("parent_category") String parentCategory,
                                       @RequestParam("min_price") Float minPrice,
                                       @RequestParam("max_price") Float maxPrice,
                                       @RequestParam("currency") String currency) {
        if (filterDTO.getLanguages().isEmpty() && filterDTO.getLevels().isEmpty() && maxPrice == 0.0f) {
            return coursesProductRepository.findAllByParentCategory(parentCategory);
        }
        minPrice = currencyHelper.convert(currency, "KZT", minPrice);
        maxPrice = currencyHelper.convert(currency, "KZT", maxPrice);

        List<CoursesProduct> categoryProducts = new ArrayList<>(coursesProductRepository.findAllByParentCategory(parentCategory));
        List<CoursesProduct> priceProducts = new ArrayList<>();
        List<CoursesProduct> products = new ArrayList<>();

        coursesProductRepository.findAllByPriceWithDiscountGreaterThanAndPriceWithDiscountLessThan(minPrice - 1, maxPrice + 1).forEach(product ->{
            if (categoryProducts.contains(product)) {
                product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                priceProducts.add(product);
            }
        });
        filterDTO.getLanguages().forEach(language -> {
            coursesProductRepository.findAllByLanguage(language).forEach(product -> {
                if (categoryProducts.contains(product) && priceProducts.contains(product)) {
                    product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                    product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                    products.add(product);
                }
            });
        });
        filterDTO.getLevels().forEach(level -> {
            coursesProductRepository.findAllByLevel(level).forEach(product -> {
                if (categoryProducts.contains(product) && priceProducts.contains(product)) {
                    product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                    product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                    products.add(product);
                }
            });
        });

        return products;
    }

    @PostMapping("/filter/child")
    public List<CoursesProduct> filter(@RequestBody FilterDTO filterDTO,
                                       @RequestParam("parent_category") String parentCategory,
                                       @RequestParam("child_category") String childCategory,
                                       @RequestParam("min_price") Float minPrice,
                                       @RequestParam("max_price") Float maxPrice,
                                       @RequestParam("currency") String currency) {
        if (filterDTO.getLanguages().isEmpty() && filterDTO.getLevels().isEmpty() && maxPrice == 0.0f) {
            return coursesProductRepository.findAllByParentCategoryAndChildCategory(parentCategory, childCategory);
        }
        minPrice = currencyHelper.convert(currency, "KZT", minPrice);
        maxPrice = currencyHelper.convert(currency, "KZT", maxPrice);

        List<CoursesProduct> categoryProducts = new ArrayList<>(coursesProductRepository.findAllByParentCategoryAndChildCategory(parentCategory, childCategory));
        List<CoursesProduct> priceProducts = new ArrayList<>();
        List<CoursesProduct> products = new ArrayList<>();

        coursesProductRepository.findAllByPriceWithDiscountGreaterThanAndPriceWithDiscountLessThan(minPrice - 1, maxPrice + 1).forEach(product ->{
            if (categoryProducts.contains(product)) {
                product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                priceProducts.add(product);
            }
        });
        filterDTO.getLanguages().forEach(language -> {
            coursesProductRepository.findAllByLanguage(language).forEach(product -> {
                if (categoryProducts.contains(product) && priceProducts.contains(product)) {
                    product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                    product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                    products.add(product);
                }
            });
        });
        filterDTO.getLevels().forEach(level -> {
            coursesProductRepository.findAllByLevel(level).forEach(product -> {
                if (categoryProducts.contains(product) && priceProducts.contains(product)) {
                    product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                    product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                    products.add(product);
                }
            });
        });

        return products;
    }

}