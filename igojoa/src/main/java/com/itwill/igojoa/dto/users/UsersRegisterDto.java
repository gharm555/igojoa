package com.itwill.igojoa.dto.Userss;

import org.springframework.web.multipart.MultipartFile;

import com.itwill.igojoa.entity.Userss;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserssRegisterDto {
    private String UsersId;
    private String password;
    private String email;
    private String phoneNumber;
    private String nickName;
    private MultipartFile file;

}
