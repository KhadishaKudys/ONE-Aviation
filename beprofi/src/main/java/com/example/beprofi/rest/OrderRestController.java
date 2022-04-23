package com.example.beprofi.rest;

import com.example.beprofi.entity.*;
import com.example.beprofi.entity.dto.OrderCallDTO;
import com.example.beprofi.entity.dto.OrderEPSDTO;
import com.example.beprofi.repository.*;
import com.example.beprofi.service.MailSender;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = " * ", allowedHeaders = " * ")
@RequestMapping("/api/v1/order")
@RestController
public class OrderRestController {
    private final OrderCallRepository orderCallRepository;
    private final OrderEducationRepository orderEducationRepository;
    private final OrderProfessionsRepository orderProfessionsRepository;
    private final OrderServicesRepository orderServicesRepository;
    private final CoursesProductRepository coursesProductRepository;
    private final ProfessionsProductRepository professionsProductRepository;
    private final ServicesProductRepository servicesProductRepository;
    private final MailSender mailSender;

    public OrderRestController(OrderCallRepository orderCallRepository, OrderEducationRepository orderEducationRepository, OrderProfessionsRepository orderProfessionsRepository, OrderServicesRepository orderServicesRepository, CoursesProductRepository coursesProductRepository, ProfessionsProductRepository professionsProductRepository, ServicesProductRepository servicesProductRepository, MailSender mailSender) {
        this.orderCallRepository = orderCallRepository;
        this.orderEducationRepository = orderEducationRepository;
        this.orderProfessionsRepository = orderProfessionsRepository;
        this.orderServicesRepository = orderServicesRepository;
        this.coursesProductRepository = coursesProductRepository;
        this.professionsProductRepository = professionsProductRepository;
        this.servicesProductRepository = servicesProductRepository;
        this.mailSender = mailSender;
    }

    //SEND CALL
    @PostMapping("/call")
    public OrderCall sendOrder(@RequestBody OrderCallDTO orderCallDTO) {
        OrderCall orderCall = new OrderCall();
        orderCall.setName(orderCallDTO.getName());
        orderCall.setPhone(orderCallDTO.getPhone());

        String message = String.format(
                "ЗАКАЗ НА ЗВОНОК:\n" +
                        "ИМЯ: %s\n" +
                        "НОМЕР: %s",
                orderCallDTO.getName(),
                orderCallDTO.getPhone()
        );
        mailSender.send("info@beprofi.org", "Заказ на зваонок", message);


        return orderCallRepository.saveAndFlush(orderCall);
    }

    //GET CALL ORDERS
    @GetMapping("/call")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public List<OrderCall> getCallOrders() {
        return orderCallRepository.findAll();
    }



    //SEND ORDER TO EDUCATION
    @PostMapping("/education")
    public OrderEducation sendEducationOrder(@RequestBody OrderEPSDTO orderCallDTO) {
        List<OrderEducation> orderCalls = orderEducationRepository.findAllByNameAndPhone(orderCallDTO.getName(), orderCallDTO.getPhone());
        if (!orderCalls.isEmpty()) {
            orderCalls.forEach(orderCall -> {
                if (orderCall.getProductId().equals(orderCallDTO.getProductId())) {
                    try {
                        throw new Exception("Order already exists");
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
        }

        OrderEducation orderCall = new OrderEducation();
        orderCall.setName(orderCallDTO.getName());
        orderCall.setPhone(orderCallDTO.getPhone());
        orderCall.setProductId(orderCallDTO.getProductId());
        orderCall.setEmail(orderCallDTO.getEmail());
        orderCall.setCode(orderCallDTO.getCode());
        orderCall.setStatus("В обработке");

        String message = String.format(
                "Здравствуйте, %s! \n" +
                        "Ваш заказ на покупку курса %s принят! Мы в ближайшее время позвоним вам!",
                orderCallDTO.getName(),
                coursesProductRepository.findById(orderCallDTO.getProductId()).orElseThrow().getName()
        );
        mailSender.send(orderCallDTO.getEmail(), "Заказ на покупку курса", message);

        String ourMessage = String.format(
                "ЗАКАЗ НА КУРС:\n" +
                        "ИМЯ: %s\n" +
                        "НОМЕР: %s" +
                        "EMAIL: %s" +
                        "STATUS: %s",
                orderCallDTO.getName(),
                orderCallDTO.getPhone(),
                orderCallDTO.getEmail(),
                orderCall.getStatus()
        );
        mailSender.send("info@beprofi.org", "Заказ на покупку курса", ourMessage);


        return orderEducationRepository.saveAndFlush(orderCall);
    }


    //SEND ORDER TO PROFESSIONS
    @PostMapping("/professions")
    public OrderProfessions sendProfessionsOrder(@RequestBody OrderEPSDTO orderCallDTO) {
        List<OrderProfessions> orderCalls = orderProfessionsRepository.findAllByNameAndPhone(orderCallDTO.getName(), orderCallDTO.getPhone());
        if (!orderCalls.isEmpty()) {
            orderCalls.forEach(orderCall -> {
                if (orderCall.getProductId().equals(orderCallDTO.getProductId())) {
                    try {
                        throw new Exception("Order already exists");
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
        }

        OrderProfessions orderCall = new OrderProfessions();
        orderCall.setName(orderCallDTO.getName());
        orderCall.setPhone(orderCallDTO.getPhone());
        orderCall.setProductId(orderCallDTO.getProductId());
        orderCall.setEmail(orderCallDTO.getEmail());
        orderCall.setCode(orderCallDTO.getCode());
        orderCall.setStatus("В обработке");

        String message = String.format(
                "Здравствуйте, %s! \n" +
                        "Ваш заказ на покупку курса %s принят! Мы в ближайшее время позвоним вам!",
                orderCallDTO.getName(),
                professionsProductRepository.findById(orderCallDTO.getProductId()).orElseThrow().getName()
        );
        mailSender.send(orderCallDTO.getEmail(), "Заказ на покупку курса", message);

        String ourMessage = String.format(
                "ЗАКАЗ НА ПРОФЕССИИ:\n" +
                        "ИМЯ: %s\n" +
                        "НОМЕР: %s" +
                        "EMAIL: %s" +
                        "STATUS: %s",
                orderCallDTO.getName(),
                orderCallDTO.getPhone(),
                orderCallDTO.getEmail(),
                orderCall.getStatus()
        );
        mailSender.send("info@beprofi.org", "Заказ на профессии", ourMessage);

        return orderProfessionsRepository.saveAndFlush(orderCall);
    }


    //SEND ORDER TO SERVICES
    @PostMapping("/services")
    public OrderServices sendServicesOrder(@RequestBody OrderEPSDTO orderCallDTO) {
        List<OrderServices> orderCalls = orderServicesRepository.findAllByNameAndPhone(orderCallDTO.getName(), orderCallDTO.getPhone());
        if (!orderCalls.isEmpty()) {
            orderCalls.forEach(orderCall -> {
                if (orderCall.getProductId().equals(orderCallDTO.getProductId())) {
                    try {
                        throw new Exception("Order already exists");
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
        }

        OrderServices orderCall = new OrderServices();
        orderCall.setName(orderCallDTO.getName());
        orderCall.setPhone(orderCallDTO.getPhone());
        orderCall.setProductId(orderCallDTO.getProductId());
        orderCall.setEmail(orderCallDTO.getEmail());
        orderCall.setCode(orderCallDTO.getCode());
        orderCall.setStatus("В обработке");

        String message = String.format(
                "Здравствуйте, %s! \n" +
                        "Ваш заказ на покупку курса %s принят! Мы в ближайшее время позвоним вам!",
                orderCallDTO.getName(),
                servicesProductRepository.findById(orderCallDTO.getProductId()).orElseThrow().getName()
        );
        mailSender.send(orderCallDTO.getEmail(), "Заказ на покупку курса", message);

        String ourMessage = String.format(
                "ЗАКАЗ НА УСЛУГИ:\n" +
                        "ИМЯ: %s\n" +
                        "НОМЕР: %s" +
                        "EMAIL: %s" +
                        "STATUS: %s",
                orderCallDTO.getName(),
                orderCallDTO.getPhone(),
                orderCallDTO.getEmail(),
                orderCall.getStatus()
        );
        mailSender.send("info@beprofi.org", "Заказ на покупку услуги", ourMessage);


        return orderServicesRepository.saveAndFlush(orderCall);
    }

    //GET EDUCATION ORDERS
    @GetMapping("/education")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public List<OrderEducation> getEducationOrders() {
        return orderEducationRepository.findAll();
    }

    //GET SERVICES ORDERS
    @GetMapping("/services")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public List<OrderServices> getServicesOrders() {
        return orderServicesRepository.findAll();
    }

    //GET PROFESSIONS ORDERS
    @GetMapping("/professions")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public List<OrderProfessions> getProfessionsOrders() {
        return orderProfessionsRepository.findAll();
    }

    //GET ALL ORDERS
    @GetMapping("")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public ResponseEntity<?> getOrders() {
        List<Map<Object, Object>> orders = new ArrayList<>();
        orderEducationRepository.findAll().forEach(order -> {
            Map<Object, Object> map = new HashMap<>();
            map.put("id", order.getId());
            map.put("email", order.getEmail());
            map.put("name", order.getName());
            map.put("phone", order.getPhone());
            map.put("product_id", order.getProductId());
            map.put("status", order.getStatus());
            map.put("code", order.getCode());
            orders.add(map);
        });
        orderServicesRepository.findAll().forEach(order -> {
            Map<Object, Object> map = new HashMap<>();
            map.put("id", order.getId());
            map.put("email", order.getEmail());
            map.put("name", order.getName());
            map.put("phone", order.getPhone());
            map.put("product_id", order.getProductId());
            map.put("status", order.getStatus());
            map.put("code", order.getCode());
            orders.add(map);
        });
        orderProfessionsRepository.findAll().forEach(order -> {
            Map<Object, Object> map = new HashMap<>();
            map.put("id", order.getId());
            map.put("email", order.getEmail());
            map.put("name", order.getName());
            map.put("phone", order.getPhone());
            map.put("product_id", order.getProductId());
            map.put("status", order.getStatus());
            map.put("code", order.getCode());
            orders.add(map);
        });
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/status/change")
    @CrossOrigin
    @PreAuthorize("hasAuthority('users:write')")
    public boolean changeStatus(@RequestParam("type") String type, @RequestParam("status") String status, @RequestParam("order_id") Long orderId) {
        switch (type) {
            case "courses":
                OrderEducation orderEducation = orderEducationRepository.findById(orderId).orElseThrow();
                orderEducation.setStatus(status);
                orderEducationRepository.saveAndFlush(orderEducation);
                break;
            case "services":
                OrderServices orderServices = orderServicesRepository.findById(orderId).orElseThrow();
                orderServices.setStatus(status);
                orderServicesRepository.saveAndFlush(orderServices);
                break;
            case "professions":
                OrderProfessions orderProfessions = orderProfessionsRepository.findById(orderId).orElseThrow();
                orderProfessions.setStatus(status);
                orderProfessionsRepository.saveAndFlush(orderProfessions);
                break;
        }
        return true;
    }

}
