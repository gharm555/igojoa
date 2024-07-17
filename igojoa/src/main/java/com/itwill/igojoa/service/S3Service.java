package com.itwill.igojoa.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.itwill.igojoa.entity.Users;
import com.itwill.igojoa.repository.UsersDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3Service {
    private String bucketName = "igojoa";
    private final AmazonS3 amazonS3;
    private final UsersDao usersDao;

    private String changedImageName(String UsersId, String originName) { // 이미지 이름 중복 방지를 위해 랜덤으로 생성
        return UsersId + "_" + originName;
    }

    private String uploadImageToS3(MultipartFile image, String UsersId) {
        String originName = image.getOriginalFilename();
        String extension = originName.substring(originName.lastIndexOf("."));
        String changedName = changedImageName(UsersId, originName);
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("image/" + extension);
        try (InputStream inputStream = image.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucketName, changedName, inputStream, objectMetadata));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return amazonS3.getUrl(bucketName, changedName).toString(); // 데이터베이스에 저장할 이미지가 저장된 주소를 반환
    }

    public Users uploadImage(MultipartFile image, Users user) {
        if (image == null || image.isEmpty()) {
            String defaultImageUrl = getUserProfileDefaultImageUrl();
            Users newUser = Users.builder()
                    .userId(user.getUserId()).password(user.getPassword()).email(user.getEmail())
                    .phoneNumber(user.getPhoneNumber()).nickName(user.getNickName())
                    .userProfileUrl(defaultImageUrl).userProfileName("default.jpg")
                    .build();

            return newUser;
        } else {
            String changedName = changedImageName(user.getUserId(), image.getOriginalFilename());
            String storedImagePath = uploadImageToS3(image, user.getUserId());

            Users newUser = Users.builder() // 이미지에 대한 정보를 담아서 반환
                    .userId(user.getUserId()).password(user.getPassword()).email(user.getEmail())
                    .phoneNumber(user.getPhoneNumber()).nickName(user.getNickName())
                    .userProfileUrl(storedImagePath).userProfileName(changedName)
                    .build();

            return newUser;
        }
    }

    // TODO S3에서 이미지 삭제하는 메서드(private)
    private void deleteImageFromS3(String imageName) {
        if (imageName != null && !imageName.equals("default.jpg")) {
            amazonS3.deleteObject(new DeleteObjectRequest("igojoa", imageName));
        }
    }

    // TODO 이미지 삭제하는 메서드 실행 후, user의 profileName과 profileUrl을 새로운 것으로 set하는
    // 메서드(public)
    public String updateProfileImage(MultipartFile newImage, Users user) {
        // 현재 프로필 이미지가 default가 아닌 경우 삭제
        if (!user.getUserProfileName().equals("default.jpg")) {
            deleteImageFromS3(user.getUserProfileName());
        }

        // 새로운 이미지 업로드
        String newImageUrl = uploadImageToS3(newImage, user.getUserId());
        String newImageName = changedImageName(user.getUserId(), newImage.getOriginalFilename());

        // 사용자 정보 업데이트
        user.setUserProfileUrl(newImageUrl);
        user.setUserProfileName(newImageName);

        usersDao.updateProfileImage(user);

        return newImageUrl;
    }

    public void setDefaultImage(String userId) {
        Users user = usersDao.selectByUserId(userId);
        deleteImageFromS3(user.getUserProfileName());

        String defaultImage = getUserProfileDefaultImageUrl();

        user.setUserProfileName("default.jpg");
        user.setUserProfileUrl(defaultImage);

        usersDao.updateProfileImage(user);
    }

    public String getUserProfileDefaultImageUrl() {
        return amazonS3.getUrl(bucketName, "default.jpg").toString();
    }
}
