package com.example.beprofi.rest;

import com.example.beprofi.entity.User;
import com.example.beprofi.entity.dto.AuthenticationRestDTO;
import com.example.beprofi.entity.enums.Role;
import com.example.beprofi.exceptions.JwtAuthenticationException;
import com.example.beprofi.repository.UserRepository;
import com.example.beprofi.security.JwtTokenProvider;
import com.example.beprofi.service.MailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationRestController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final MailSender mailSender;

    @Autowired
    public AuthenticationRestController(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, MailSender mailSender) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.mailSender = mailSender;
    }


    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRestDTO request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User email not found"));

            String token = jwtTokenProvider.createToken(request.getEmail(), user.getRole().name());
            Map<Object, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("email", request.getEmail());
            response.put("token", token);
            response.put("role", user.getRole().name());
            user.setToken(token);
            userRepository.save(user);
            return ResponseEntity.ok(response);
        } catch (JwtAuthenticationException e) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/register")
    public User register(@RequestBody AuthenticationRestDTO request) {
        userRepository.deleteAll();
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ADMIN);
        user.setConfirmationCode(null);
        user.setPasswordChangeAllowed(false);
        return userRepository.save(user);
    }


    @PostMapping("/logout")
    @PreAuthorize("hasAuthority('users:write')")
    @CrossOrigin
    public boolean logout(@RequestParam("user_id") Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setToken(null);
        userRepository.save(user);

        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        SecurityContextHolder.getContext().setAuthentication(null);
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        return true;
    }

    @PostMapping("/forgot-password")
    public boolean forgotPassword(@RequestParam("email") String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        user.setConfirmationCode(UUID.randomUUID().toString());
        userRepository.save(user);
        String message = String.format("Код подтверждения: %s", user.getConfirmationCode());

        mailSender.send(email, "Восстановление пароля beprofi", message);
        return true;
    }

    @PostMapping("/forgot-password/{code}")
    public boolean confirm(@PathVariable String code) {
        User user = userRepository.findByConfirmationCode(code);
        if (user == null) {
            return false;
        }
        user.setConfirmationCode(null);
        user.setPasswordChangeAllowed(true);
        user.setPasswordChangeAllowedTime(new Date().getTime());
        userRepository.save(user);
        return true;
    }

    @CrossOrigin
    @PostMapping("/forgot-password/change")
    public boolean changePassword(@RequestParam("email") String email, @RequestParam("password") String password) throws Exception {
        User user = userRepository.findByEmail(email).orElseThrow();
        if (password == null || password.isEmpty()) {
            throw new Exception("Password is null or empty");
        }
        if (!user.getPasswordChangeAllowed() || user.getPasswordChangeAllowedTime() + 600000 < new Date().getTime()) {
            throw new Exception("Permission expired or not allowed!");
        }
        user.setPassword(passwordEncoder.encode(password));
        user.setPasswordChangeAllowed(false);
        userRepository.save(user);
        return true;
    }

}
