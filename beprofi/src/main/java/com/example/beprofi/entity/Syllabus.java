package com.example.beprofi.entity;

import com.vladmihalcea.hibernate.type.array.ListArrayType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "syllabus")
@TypeDef(name = "list-array", typeClass = ListArrayType.class)
public class Syllabus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Type(type = "list-array")
    @Column(name = "syllabuses", columnDefinition = "text[]")
    private List<String> syllabuses;
}
