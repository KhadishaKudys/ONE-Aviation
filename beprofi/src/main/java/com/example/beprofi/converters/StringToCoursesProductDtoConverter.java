package com.example.beprofi.converters;

import com.example.beprofi.entity.dto.CoursesProductDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToCoursesProductDtoConverter implements Converter<String, CoursesProductDTO> {

    @Autowired
    private ObjectMapper objectMapper;

    @SneakyThrows
    @Override
    public CoursesProductDTO convert(String s) {
        return objectMapper.readValue(s, CoursesProductDTO.class);
    }
}
