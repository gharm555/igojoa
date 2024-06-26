package com.itwill.igojoa.dto.Users;

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
    private String UsersId;
    private String password;

    public Users toEntity() {
        return Users.builder()
                .UsersId(UsersId)
                .password(password)
                .build();
    }
}
