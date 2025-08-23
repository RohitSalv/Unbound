package com.unbound.dto;

import com.unbound.entity.User;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private User.UserRole role;
}
