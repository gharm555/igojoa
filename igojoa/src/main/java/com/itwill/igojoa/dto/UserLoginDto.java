package com.itwill.igojoa.dto;

import com.itwill.igojoa.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserLoginDto {
    private String userId;
    private String password;

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .password(password)
                .build();
    }
}
