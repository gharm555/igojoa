package com.itwill.igojoa.dto.users;

import org.springframework.web.multipart.MultipartFile;

import com.itwill.igojoa.entity.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersRegisterDto {
    private String userId;
    private String password;
    private String email;
    private String phoneNumber;
    private String nickName;
    private MultipartFile file;

}
