package com.itwill.igojoa.dto.users;

import com.itwill.igojoa.entity.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsersLoginDto {
    private String userId;
    private String password;

    public Users toEntity() {
        return Users.builder()
                .userId(userId)
                .password(password)
                .build();
    }
}
