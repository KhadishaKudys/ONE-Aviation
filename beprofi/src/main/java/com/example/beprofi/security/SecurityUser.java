package com.example.beprofi.security;

import com.example.beprofi.entity.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class SecurityUser implements UserDetails {

    private final String username;
    private final String password;
    private final List<SimpleGrantedAuthority> authorities;
    private final boolean enabled;
    private final boolean locked;

    public SecurityUser(String username, String password, List<SimpleGrantedAuthority> authorities, boolean enabled, boolean locked) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.enabled = enabled;
        this.locked = locked;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return enabled;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


    public static UserDetails fromUser(User user) {
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(), true, true,
                true, true, user.getRole().getAuthorities());
    }

}
