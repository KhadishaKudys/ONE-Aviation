package com.example.beprofi.entity;

import com.example.beprofi.entity.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "admins")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Enumerated(value = EnumType.STRING)
    @Column(name = "role")
    private Role role;
    @Column(name = "token")
    private String token;
    @JsonIgnore
    @Column(name = "confirmation_code")
    private String confirmationCode;
    @JsonIgnore
    @Column(name = "password_change_allowed")
    private Boolean passwordChangeAllowed = false;
    @JsonIgnore
    @Column(name = "password_change_allowed_time")
    private Long passwordChangeAllowedTime;
}
