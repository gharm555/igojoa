package com.itwill.igojoa.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {
    private String userId;
    private String password;
    private String email;
    private String phoneNumber;
    private String nickName;
    private String userProfileName;
    private String userProfileUrl;
}