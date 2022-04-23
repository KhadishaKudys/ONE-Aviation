package com.example.beprofi.converters;

import com.example.beprofi.entity.dto.CoursesProductDTO;
import com.example.beprofi.entity.dto.ServicesProductDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToServicesProductDtoConverter implements Converter<String, ServicesProductDTO> {

    @Autowired
    private ObjectMapper objectMapper;

    @SneakyThrows
    @Override
    public ServicesProductDTO convert(String s) {
        return objectMapper.readValue(s, ServicesProductDTO.class);
    }
}
