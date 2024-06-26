package com.itwill.igojoa.dto.user;

import org.springframework.web.multipart.MultipartFile;

import com.itwill.igojoa.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegisterDto {
    private String userId;
    private String password;
    private String email;
    private String phoneNumber;
    private String nickName;
    private MultipartFile file;

}
