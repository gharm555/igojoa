package com.itwill.igojoa.dto.users;

import org.springframework.web.multipart.MultipartFile;

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
    private String phone1;
    private String phone2;
    private String phone3;
    private String nickName;
    private MultipartFile file;

}
