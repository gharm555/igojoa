package com.itwill.igojoa.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.itwill.igojoa.dto.place.PlaceConfirmDto;
import com.itwill.igojoa.dto.place.PlaceDetailDto;
import com.itwill.igojoa.dto.place.PlaceImageDto;
import com.itwill.igojoa.dto.place.PlacesFavoriteDto;
import com.itwill.igojoa.entity.PlaceImages;
import com.itwill.igojoa.service.PlaceService;
import com.itwill.igojoa.service.PlaceVerifiedService;
import com.itwill.igojoa.service.PointsService;
import com.itwill.igojoa.service.S3Service;
import com.itwill.igojoa.service.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceController {
	private final HttpSession session;
	private final PlaceVerifiedService placeVerifiedService;
	private final PlaceService placeService;
	private final PointsService pointsService;
	private final UsersService usersService;
	private final S3Service s3Service;

	@Transactional
	@PostMapping("/verifyLocation")
	public ResponseEntity<String> verifyPlace(@RequestParam(name = "latitude") double latitude,
			@RequestParam(name = "longitude") double longitude) {
		String userId = (String) session.getAttribute("userId");
		if (userId == null) {
			return ResponseEntity.badRequest().body("로그인 해주세요");
		}
		String isVerified = placeVerifiedService.verifyUserLocation(latitude, longitude, userId);
		if (isVerified.equals("위치 인증 성공")) {
			pointsService.addPlaceVerifiedPoints(userId);
			pointsService.insertPointLog(userId, "위치인증", 1000);
			return ResponseEntity.ok(isVerified);
		} else if (isVerified.equals("이미 위치 인증 한 장소입니다.")) {
			return ResponseEntity.ok(isVerified);
		} else {
			return ResponseEntity.badRequest().body(isVerified);
		}
	}

	@GetMapping("/details/{placeName}")
	public String placeDetailPage(@PathVariable String placeName, Model model) {
		log.debug("\n\n" + placeName + "\n\n");
		String userId = (String) session.getAttribute("userId");
		if (userId != null) {
			int sessionCheck = usersService.sessionTorF(userId);
			model.addAttribute("userProfileUrl", usersService.getUserInfo(userId).getUserProfileUrl());
			model.addAttribute("points", pointsService.selectPoints(userId));
			if (sessionCheck == 0) {

				return "redirect:/";
			}
		}
		// userId = "오진호"; // 테스트 코드
		PlacesFavoriteDto placesFavoriteDto = PlacesFavoriteDto.builder().placeName(placeName).userId(userId).build();
		PlaceDetailDto res = placeService.selectPlaceDetail(placesFavoriteDto);
		model.addAttribute("PlaceDetailDto", res);

		return "/place/placeDetail";
	}

	
@PostMapping("/insertConfirm")
public ResponseEntity<Integer> insertPlaceConfirm(
        @ModelAttribute PlaceConfirmDto dto,
        @RequestParam(value = "placeImages", required = false) List<MultipartFile> placeImages,
        HttpSession session) {

	log.info("Received PlaceConfirmDto: {}", dto);
    log.info("Received placeImages: {}", placeImages != null ? placeImages.size() : "null");
    String reportUserId = (String) session.getAttribute("userId");
    dto.setReporterId(reportUserId);  // reporterId 설정

    // PlaceConfirm 처리
    int res = placeService.insertPlace(dto);

    // 이미지 처리
    int res2 = 0;
    if (placeImages != null && !placeImages.isEmpty()) {
        PlaceImageDto placeImageDto = new PlaceImageDto();
        placeImageDto.setPlaceName(dto.getPlaceName());

        List<String> imageNames = new ArrayList<>();
        List<String> imageUrls = new ArrayList<>();

        for (MultipartFile image : placeImages) {
            if (!image.isEmpty()) {
                String url = s3Service.uploadImage(image, reportUserId);
                imageNames.add(image.getOriginalFilename());
                imageUrls.add(url);
            }
        }

        placeImageDto.setImageNames(imageNames);
        placeImageDto.setImageUrls(imageUrls);

        res2 = placeService.insertPlaceImages(placeImageDto);
    }

    return ResponseEntity.ok(res & res2);
}
}


