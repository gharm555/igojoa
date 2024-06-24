package com.itwill.igojoa.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PVerified {

    private String pVerifiedUser;
    private String pVerifiedPlace;
    private String pVLatitude;
    private String pVLongitude;
    private LocalDateTime VTime;
}