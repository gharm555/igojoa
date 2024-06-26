package com.itwill.igojoa.service;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.itwill.igojoa.entity.Userss;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {
    private String bucketName = "igojoa";
    private final AmazonS3 amazonS3;

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
            PutObjectResult putObjectResult = amazonS3.putObject(new PutObjectRequest(
                    bucketName, changedName, inputStream, objectMetadata));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return amazonS3.getUrl(bucketName, changedName).toString(); // 데이터베이스에 저장할 이미지가 저장된 주소를 반환
    }

    public Userss uploadImage(MultipartFile image, Userss Users) {
        String changedName = changedImageName(Users.getUsersId(), image.getOriginalFilename());
        String storedImagePath = uploadImageToS3(image, Users.getUsersId());

        Userss newUsers = Userss.builder() // 이미지에 대한 정보를 담아서 반환
                .UsersId(Users.getUsersId()).password(Users.getPassword()).email(Users.getEmail())
                .phoneNumber(Users.getPhoneNumber()).nickName(Users.getNickName())
                .UsersProfileUrl(storedImagePath).UsersProfileName(changedName)
                .build();
        return newUsers;
    }

    public String getUsersProfileDefaultImageUrl() {
        return amazonS3.getUrl(bucketName, "default.jpg").toString();
    }
}
