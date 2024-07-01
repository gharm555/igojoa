package com.itwill.igojoa.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.itwill.igojoa.service.PlaceVerifiedService;
import com.itwill.igojoa.service.PointsService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/place")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceVerifiedService placeVerifiedService;
    private final PointsService pointsService;

    @PostMapping("/verifyLocation")
    public ResponseEntity<String> verifyPlace(@RequestParam(name = "latitude") double latitude,
            @RequestParam(name = "longitude") double longitude,
            @RequestParam(name = "userId") String userId) {
        boolean isVerified = placeVerifiedService.verifyUserLocation(latitude, longitude, userId);
        if (isVerified) {
            pointsService.addPlaceVerifiedPoints(userId);
            pointsService.insertPointLog(userId, "위치인증", 1000);
            return ResponseEntity.ok("위치인증 성공");
        } else {
            return ResponseEntity.badRequest().body("위치인증 실패");
        }
    }

}
