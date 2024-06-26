package com.itwill.igojoa.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itwill.igojoa.entity.PlaceVerified;
import com.itwill.igojoa.service.PlaceVerifiedService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/place")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceVerifiedService placeVerifiedService;

    @PostMapping("/verify")
    public void verifyPlace(@ModelAttribute PlaceVerified placeVerified) {
        placeVerifiedService.verifyUserLocation(placeVerified.getPlaceLatitude(), placeVerified.getPlaceLongitude(),
                placeVerified.getUserId());
    }

}
