package com.example.beprofi.rest;

import com.example.beprofi.entity.CoursesProduct;
import com.example.beprofi.entity.ProfessionsProduct;
import com.example.beprofi.entity.ServicesProduct;
import com.example.beprofi.entity.dto.CoursesProductDTO;
import com.example.beprofi.entity.dto.FilterDTO;
import com.example.beprofi.entity.dto.SubmitRequestDTO;
import com.example.beprofi.entity.enums.Language;
import com.example.beprofi.helpers.CurrencyHelper;
import com.example.beprofi.repository.ProfessionsProductRepository;
import com.example.beprofi.store.PictureManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/professions/products")
public class ProfessionsProductRestController {
    private final ProfessionsProductRepository professionsProductRepository;
    private final CurrencyHelper currencyHelper;

    public ProfessionsProductRestController(ProfessionsProductRepository professionsProductRepository, CurrencyHelper currencyHelper) {
        this.professionsProductRepository = professionsProductRepository;
        this.currencyHelper = currencyHelper;
    }

    @GetMapping
    public List<ProfessionsProduct> getProducts(@RequestParam("page") int page, @RequestParam("currency") String currency) {
        List<ProfessionsProduct> products = professionsProductRepository.findAllByPage(PageRequest.of(page - 1, 18));
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }

        return products;
    }

    @GetMapping("/all")
    public List<ProfessionsProduct> getAllProducts(@RequestParam("currency") String currency) {
        List<ProfessionsProduct> products = professionsProductRepository.findAll();
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }

        return products;
    }

    @GetMapping("/{id}")
    public ProfessionsProduct getProductById(@PathVariable("id") Long id, @RequestParam("currency") String currency) {
        ProfessionsProduct product = professionsProductRepository.findById(id).orElseThrow();
        product.setPriceWithDiscount(currencyHelper.convert(product.getCurrency(), currency, product.getPriceWithDiscount()));
        product.setPrice(currencyHelper.convert(product.getCurrency(), currency, product.getPrice()));
        product.setCurrency(currency);

        return product;
    }



    @GetMapping("/recommended/{parent_category}")
    public List<ProfessionsProduct> getRecommendedProductsByParentCategory(@PathVariable("parent_category") String parentCategory, @RequestParam("currency") String currency) {
        List<ProfessionsProduct> products =  professionsProductRepository.findAllByParentCategoryAndIsRecommended(parentCategory, true);
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }
        return products;
    }


    @GetMapping("/recommended/{parent_category}/{child_category}")
    public List<ProfessionsProduct> getRecommendedProductsByCategory(@PathVariable("parent_category") String parentCategory, @PathVariable("child_category") String childCategory, @RequestParam("currency") String currency) {
        List<ProfessionsProduct> products =  professionsProductRepository.findAllByParentCategoryAndChildCategoryAndIsRecommended(parentCategory, childCategory, true);
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
            products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
            products.get(i).setCurrency(currency);
        }
        return products;
    }


    @GetMapping("/{parent_category}/{child_category}")
    public List<ProfessionsProduct> getProductsByCategory(@PathVariable("parent_category") String parentCategory, @PathVariable("child_category") String category, @RequestParam("currency") String currency) {
        if (category.equals("")) {
            List<ProfessionsProduct> products = professionsProductRepository.findAllByParentCategory(parentCategory);
            for (int i = 0; i < products.size(); i++) {
                products.get(i).setPriceWithDiscount(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPriceWithDiscount()));
                products.get(i).setPrice(currencyHelper.convert(products.get(i).getCurrency(), currency, products.get(i).getPrice()));
                products.get(i).setCurrency(currency);
            }
            return products;
        }
        List<ProfessionsProduct> products =  professionsProductRepository.findAllByParentCategoryAndChildCategory(parentCategory, category);
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
    public ProfessionsProduct saveCourse(@RequestParam("product") CoursesProductDTO coursesProductDTO, @RequestParam("image") MultipartFile image) {
        ProfessionsProduct professionsProduct = new ProfessionsProduct();
        professionsProduct.setCurrency("KZT");
        professionsProduct.setArticle(coursesProductDTO.getArticle());
        professionsProduct.setImageUrl(PictureManager.storeProfessionsFile(image));
        professionsProduct.setName(coursesProductDTO.getName());
        professionsProduct.setOverview(coursesProductDTO.getOverview());
        professionsProduct.setParentCategory(coursesProductDTO.getParentCategory());
        professionsProduct.setChildCategory(coursesProductDTO.getChildCategory());
        professionsProduct.setPrice(currencyHelper.convert(coursesProductDTO.getCurrency(), "KZT", coursesProductDTO.getPrice()));
        professionsProduct.setSyllabusList(coursesProductDTO.getSyllabus());
        professionsProduct.setDiscount(coursesProductDTO.getDiscount());
        professionsProduct.setLevel(coursesProductDTO.getLevel());
        professionsProduct.setLanguage(coursesProductDTO.getLanguage());
        professionsProduct.setIsRecommended(coursesProductDTO.getIsRecommended());
        professionsProduct.setPriceWithDiscount(professionsProduct.getPrice() - (professionsProduct.getPrice() * coursesProductDTO.getDiscount() / 100.0f));
        professionsProduct.setSyllabusTitle(professionsProduct.getSyllabusTitle());


        return professionsProductRepository.save(professionsProduct);
    }


    @PostMapping("/edit")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public ProfessionsProduct editCourse(@RequestParam("product") CoursesProductDTO coursesProductDTO, @RequestParam("image") MultipartFile image, @RequestParam("id") Long id) {
        ProfessionsProduct professionsProduct = professionsProductRepository.findById(id).orElseThrow();
        professionsProduct.setCurrency("KZT");
        professionsProduct.setArticle(coursesProductDTO.getArticle());
        professionsProduct.setImageUrl(PictureManager.storeProfessionsFile(image));
        professionsProduct.setName(coursesProductDTO.getName());
        professionsProduct.setOverview(coursesProductDTO.getOverview());
        professionsProduct.setChildCategory(coursesProductDTO.getChildCategory());
        professionsProduct.setParentCategory(coursesProductDTO.getParentCategory());
        professionsProduct.setPrice(currencyHelper.convert(coursesProductDTO.getCurrency(), "KZT", coursesProductDTO.getPrice()));
        professionsProduct.setSyllabusList(coursesProductDTO.getSyllabus());
        professionsProduct.setDiscount(coursesProductDTO.getDiscount());
        professionsProduct.setLevel(coursesProductDTO.getLevel());
        professionsProduct.setLanguage(coursesProductDTO.getLanguage());
        professionsProduct.setIsRecommended(coursesProductDTO.getIsRecommended());
        professionsProduct.setPriceWithDiscount(professionsProduct.getPrice() - (professionsProduct.getPrice() * coursesProductDTO.getDiscount() / 100.0f));
        professionsProduct.setSyllabusTitle(professionsProduct.getSyllabusTitle());


        return professionsProductRepository.save(professionsProduct);
    }

    @PostMapping("/delete")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public boolean deleteProductById(@RequestParam("id") Long id) {
        professionsProductRepository.deleteById(id);
        return true;
    }


    @PostMapping("/discount")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public ProfessionsProduct setDiscount(@RequestParam("discount") int discount, @RequestParam("id") Long id) throws Exception {
        if (discount > 100) {
            throw new Exception("Discount can not be more than 100");
        }
        ProfessionsProduct professionsProduct = professionsProductRepository.findById(id).orElseThrow(() -> new Exception("Product not found"));
        professionsProduct.setDiscount(discount);
        professionsProduct.setPriceWithDiscount(professionsProduct.getPrice() - (professionsProduct.getPrice() * discount / 100.0f));

        return professionsProductRepository.save(professionsProduct);
    }

    @PostMapping("/filter/parent")
    public List<ProfessionsProduct> filter(@RequestBody FilterDTO filterDTO,
                                           @RequestParam("parent_category") String parentCategory,
                                           @RequestParam("min_price") Float minPrice,
                                           @RequestParam("max_price") Float maxPrice,
                                           @RequestParam("currency") String currency) {
        if (filterDTO.getLanguages().isEmpty() && filterDTO.getLevels().isEmpty() && maxPrice == 0.0f) {
            return professionsProductRepository.findAll();
        }
        minPrice = currencyHelper.convert(currency, "KZT", minPrice);
        maxPrice = currencyHelper.convert(currency, "KZT", maxPrice);

        List<ProfessionsProduct> categoryProducts = new ArrayList<>(professionsProductRepository.findAllByParentCategory(parentCategory));
        List<ProfessionsProduct> priceProducts = new ArrayList<>();
        List<ProfessionsProduct> products = new ArrayList<>();
        professionsProductRepository.findAllByPriceWithDiscountGreaterThanAndPriceWithDiscountLessThan(minPrice - 1, maxPrice + 1).forEach(product ->{
            if (categoryProducts.contains(product)) {
                product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                priceProducts.add(product);
            }
        });
        filterDTO.getLanguages().forEach(language -> {
            professionsProductRepository.findAllByLanguage(language).forEach(product -> {
                if (categoryProducts.contains(product) && priceProducts.contains(product)) {
                    product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                    product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                    products.add(product);
                }
            });
        });
        filterDTO.getLevels().forEach(level -> {
            professionsProductRepository.findAllByLevel(level).forEach(product -> {
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
    public List<ProfessionsProduct> filter(@RequestBody FilterDTO filterDTO,
                                           @RequestParam("parent_category") String parentCategory,
                                           @RequestParam("child_category") String childCategory,
                                           @RequestParam("min_price") Float minPrice,
                                           @RequestParam("max_price") Float maxPrice,
                                           @RequestParam("currency") String currency) {
        if (filterDTO.getLanguages().isEmpty() && filterDTO.getLevels().isEmpty() && maxPrice == 0.0f) {
            return professionsProductRepository.findAllByParentCategoryAndChildCategory(parentCategory, childCategory);
        }
        minPrice = currencyHelper.convert(currency, "KZT", minPrice);
        maxPrice = currencyHelper.convert(currency, "KZT", maxPrice);

        List<ProfessionsProduct> categoryProducts = new ArrayList<>(professionsProductRepository.findAllByParentCategoryAndChildCategory(parentCategory, childCategory));
        List<ProfessionsProduct> priceProducts = new ArrayList<>();
        List<ProfessionsProduct> products = new ArrayList<>();
        professionsProductRepository.findAllByPriceWithDiscountGreaterThanAndPriceWithDiscountLessThan(minPrice - 1, maxPrice + 1).forEach(product ->{
            if (categoryProducts.contains(product)) {
                product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                priceProducts.add(product);
            }
        });
        filterDTO.getLanguages().forEach(language -> {
            professionsProductRepository.findAllByLanguage(language).forEach(product -> {
                if (categoryProducts.contains(product) && priceProducts.contains(product)) {
                    product.setPrice(currencyHelper.convert("KZT", currency, product.getPrice()));
                    product.setPriceWithDiscount(currencyHelper.convert("KZT", currency, product.getPriceWithDiscount()));
                    products.add(product);
                }
            });
        });
        filterDTO.getLevels().forEach(level -> {
            professionsProductRepository.findAllByLevel(level).forEach(product -> {
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
