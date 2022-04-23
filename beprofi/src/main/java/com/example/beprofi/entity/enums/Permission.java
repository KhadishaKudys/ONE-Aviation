package com.example.beprofi.entity.enums;

public enum Permission {
    USERS_WRITE("users:write");


    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
