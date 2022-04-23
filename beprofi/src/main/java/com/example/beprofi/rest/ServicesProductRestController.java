package com.example.beprofi.rest;

import com.example.beprofi.entity.CoursesProduct;
import com.example.beprofi.entity.ProfessionsProduct;
import com.example.beprofi.entity.ServicesProduct;
import com.example.beprofi.entity.dto.ServicesProductDTO;
import com.example.beprofi.entity.dto.SubmitRequestDTO;
import com.example.beprofi.helpers.CurrencyHelper;
import com.example.beprofi.repository.ServicesProductRepository;
import com.example.beprofi.store.PictureManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/services/products")
public class ServicesProductRestController {
    private final ServicesProductRepository servicesProductRepository;
    private final CurrencyHelper currencyHelper;

    public ServicesProductRestController(ServicesProductRepository servicesProductRepository, CurrencyHelper currencyHelper) {
        this.servicesProductRepository = servicesProductRepository;
        this.currencyHelper = currencyHelper;
    }

    @GetMapping
    public List<ServicesProduct> getProducts(@RequestParam("page") int page, @RequestParam("currency") String currency) {
        List<ServicesProduct> products = servicesProductRepository.findAllByPage(PageRequest.of(page - 1, 18));
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }

        return products;
    }

    @GetMapping("/{id}")
    public ServicesProduct getProductById(@PathVariable("id") Long id, @RequestParam("currency") String currency) {
        ServicesProduct product = servicesProductRepository.findById(id).orElseThrow();
        product.setPriceWithDiscount(currencyHelper.convert(product.getCurrency(), currency, product.getPriceWithDiscount()));
        product.setPrice(currencyHelper.convert(product.getCurrency(), currency, product.getPrice()));
        product.setCurrency(currency);

        return product;
    }


    @GetMapping("/recommended")
    public List<ServicesProduct> getProductById(@RequestParam("ids") List<Long> ids, @RequestParam("currency") String currency) {
        List<ServicesProduct> recommended = servicesProductRepository.findAllById(ids);
        recommended.forEach(product -> {
            product.setPriceWithDiscount(currencyHelper.convert(product.getCurrency(), currency, product.getPriceWithDiscount()));
            product.setPrice(currencyHelper.convert(product.getCurrency(), currency, product.getPrice()));
            product.setCurrency(currency);
        });

        return recommended;
    }


    @GetMapping("/{parent_category}/{category}")
    public List<ServicesProduct> getProductsByCategory(@PathVariable("parent_category") String parentCategory, @PathVariable("category") String category, @RequestParam("currency") String currency) {
        if (category.equals("")) {
            List<ServicesProduct> products = servicesProductRepository.findAllByParentCategory(parentCategory);
            for (int i = 0; i < products.size(); i++) {
                products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
                products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
                products.get(i).setCurrency(currency);
            }
            return products;
        }
        List<ServicesProduct> products = servicesProductRepository.findAllByParentCategoryAndCategory(parentCategory, category);
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }
        return products;
    }

    @GetMapping("/{parent_category}/{category}/{child_category}")
    public List<ServicesProduct> getProductsByChildCategory(@PathVariable("parent_category") String parentCategory, @PathVariable("category") String category, @PathVariable("child_category") String childCategory, @RequestParam("currency") String currency) {
        List<ServicesProduct> products = servicesProductRepository.findAllByParentCategoryAndCategoryAndChildCategory(parentCategory, category, childCategory);
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }
        return products;
    }


    @GetMapping("/recommended/{parent_category}")
    public List<ServicesProduct> getRecommendedProductsByParentCategory(@PathVariable("parent_category") String parentCategory, @RequestParam("currency") String currency) {
        List<ServicesProduct> products = servicesProductRepository.findAllByParentCategoryAndIsRecommended(parentCategory, true);
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }
        return products;
    }

    @GetMapping("/recommended/{parent_category}/{category}")
    public List<ServicesProduct> getRecommendedProductsByCategory(@PathVariable("parent_category") String parentCategory, @PathVariable("category") String category, @RequestParam("currency") String currency) {
        List<ServicesProduct> products = servicesProductRepository.findAllByParentCategoryAndCategoryAndIsRecommended(parentCategory, category, true);
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }
        return products;
    }

    @GetMapping("/recommended/{parent_category}/{category}/{child_category}")
    public List<ServicesProduct> getRecommendedProductsByChildCategory(@PathVariable("parent_category") String parentCategory, @PathVariable("category") String category, @PathVariable("child_category") String childCategory, @RequestParam("currency") String currency) {
        List<ServicesProduct> products = servicesProductRepository.findAllByParentCategoryAndCategoryAndChildCategoryAndIsRecommended(parentCategory, category, childCategory, true);
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
    public ServicesProduct saveCourse(@RequestParam("servicesProductDTO") ServicesProductDTO servicesProductDTO, @RequestParam("image") MultipartFile image) {
        ServicesProduct servicesProduct = new ServicesProduct();
        servicesProduct.setCurrency("KZT");
        servicesProduct.setArticle(servicesProductDTO.getArticle());
        servicesProduct.setImageUrl(PictureManager.storeServicesFile(image));
        servicesProduct.setName(servicesProductDTO.getName());
        servicesProduct.setOverview(servicesProductDTO.getOverview());
        servicesProduct.setParentCategory(servicesProductDTO.getParentCategory());
        servicesProduct.setCategory(servicesProductDTO.getCategory());
        servicesProduct.setChildCategory(servicesProductDTO.getChildCategory());
        servicesProduct.setPrice(currencyHelper.convert(servicesProductDTO.getCurrency(), "KZT", servicesProductDTO.getPrice()));
        servicesProduct.setDiscount(servicesProductDTO.getDiscount());
        servicesProduct.setSyllabusList(servicesProductDTO.getSyllabus());
        servicesProduct.setIsRecommended(servicesProductDTO.getIsRecommended());
        servicesProduct.setPriceWithDiscount(servicesProduct.getPrice() - (servicesProduct.getPrice() * servicesProductDTO.getDiscount() / 100.0f));
        servicesProduct.setSyllabusTitle(servicesProductDTO.getSyllabusTitle());

        return servicesProductRepository.save(servicesProduct);
    }

    @PostMapping("/edit")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public ServicesProduct editCourse(@RequestParam("servicesProductDTO") ServicesProductDTO servicesProductDTO, @RequestParam("image") MultipartFile image, @RequestParam("id") Long id) {
        ServicesProduct servicesProduct = servicesProductRepository.findById(id).orElseThrow();
        servicesProduct.setCurrency("KZT");
        servicesProduct.setArticle(servicesProductDTO.getArticle());
        servicesProduct.setImageUrl(PictureManager.storeServicesFile(image));
        servicesProduct.setName(servicesProductDTO.getName());
        servicesProduct.setOverview(servicesProductDTO.getOverview());
        servicesProduct.setCategory(servicesProductDTO.getCategory());
        servicesProduct.setParentCategory(servicesProductDTO.getParentCategory());
        servicesProduct.setChildCategory(servicesProductDTO.getChildCategory());
        servicesProduct.setPrice(currencyHelper.convert(servicesProductDTO.getCurrency(), "KZT", servicesProductDTO.getPrice()));
        servicesProduct.setDiscount(servicesProductDTO.getDiscount());
        servicesProduct.setSyllabusList(servicesProductDTO.getSyllabus());
        servicesProduct.setIsRecommended(servicesProductDTO.getIsRecommended());
        servicesProduct.setPriceWithDiscount(servicesProduct.getPrice() - (servicesProduct.getPrice() * servicesProductDTO.getDiscount() / 100.0f));
        servicesProduct.setSyllabusTitle(servicesProductDTO.getSyllabusTitle());

        return servicesProductRepository.save(servicesProduct);
    }


    @PostMapping("/delete")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public boolean deleteProductById(@RequestParam("id") Long id) {
        servicesProductRepository.deleteById(id);
        return true;
    }


    @PostMapping("/discount")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public ServicesProduct setDiscount(@RequestParam("discount") int discount, @RequestParam("id") Long id) throws Exception {
        if (discount > 100) {
            throw new Exception("Discount can not be more than 100");
        }
        ServicesProduct servicesProduct = servicesProductRepository.findById(id).orElseThrow(() -> new Exception("Product not found"));
        servicesProduct.setDiscount(discount);
        servicesProduct.setPriceWithDiscount(servicesProduct.getPrice() - (servicesProduct.getPrice() * discount / 100.0f));

        return servicesProductRepository.save(servicesProduct);
    }

    @PostMapping("/filter/parent")
    public List<ServicesProduct> filter(@RequestParam("parent_category") String parentCategory,
                                        @RequestParam("min_price") Float minPrice,
                                        @RequestParam("max_price") Float maxPrice,
                                        @RequestParam("currency") String currency) {
        if (maxPrice == 0.0f) {
            return servicesProductRepository.findAllByParentCategory(parentCategory);
        }
        minPrice = currencyHelper.convert(currency, "KZT", minPrice);
        maxPrice = currencyHelper.convert(currency, "KZT", maxPrice);

        List<ServicesProduct> categoryProducts = new ArrayList<>(servicesProductRepository.findAllByParentCategory(parentCategory));
        List<ServicesProduct> products = new ArrayList<>();
        servicesProductRepository.findAllByPriceWithDiscountGreaterThanAndPriceWithDiscountLessThan(minPrice - 1, maxPrice + 1).forEach(product -> {
            if (categoryProducts.contains(product)) {
                product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                products.add(product);
            }
        });
        return products;
    }

    @PostMapping("/filter/category")
    public List<ServicesProduct> filter(@RequestParam("parent_category") String parentCategory,
                                        @RequestParam("category") String category,
                                        @RequestParam("min_price") Float minPrice,
                                        @RequestParam("max_price") Float maxPrice,
                                        @RequestParam("currency") String currency) {
        if (maxPrice == 0.0f) {
            return servicesProductRepository.findAllByParentCategoryAndCategory(parentCategory, category);
        }
        minPrice = currencyHelper.convert(currency, "KZT", minPrice);
        maxPrice = currencyHelper.convert(currency, "KZT", maxPrice);


        List<ServicesProduct> categoryProducts = new ArrayList<>(servicesProductRepository.findAllByParentCategoryAndCategory(parentCategory, category));
        List<ServicesProduct> products = new ArrayList<>();
        servicesProductRepository.findAllByPriceWithDiscountGreaterThanAndPriceWithDiscountLessThan(minPrice - 1, maxPrice + 1).forEach(product -> {
            if (categoryProducts.contains(product)) {
                product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                products.add(product);
            }
        });
        return products;
    }

    @PostMapping("/filter/child")
    public List<ServicesProduct> filter(@RequestParam("parent_category") String parentCategory,
                                        @RequestParam("category") String category,
                                        @RequestParam("child_category") String childCategory,
                                        @RequestParam("min_price") Float minPrice,
                                        @RequestParam("max_price") Float maxPrice,
                                        @RequestParam("currency") String currency) {
        if (maxPrice == 0.0f) {
            return servicesProductRepository.findAllByParentCategoryAndCategoryAndChildCategory(parentCategory, category, childCategory);
        }
        minPrice = currencyHelper.convert(currency, "KZT", minPrice);
        maxPrice = currencyHelper.convert(currency, "KZT", maxPrice);

        List<ServicesProduct> categoryProducts = new ArrayList<>(servicesProductRepository.findAllByParentCategoryAndCategoryAndChildCategory(parentCategory, category, childCategory));
        List<ServicesProduct> products = new ArrayList<>();
        servicesProductRepository.findAllByPriceWithDiscountGreaterThanAndPriceWithDiscountLessThan(minPrice - 1, maxPrice + 1).forEach(product -> {
            if (categoryProducts.contains(product)) {
                product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                products.add(product);
            }
        });
        return products;
    }
}