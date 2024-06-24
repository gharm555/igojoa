package com.itwill.igojoa.service;

import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.itwill.igojoa.entity.User;
import com.itwill.igojoa.repository.UserDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3 amazonS3;
    private final UserDao userDao;

    private String bucketName = "igojoa";

    public String uploadFile(MultipartFile multipartFile, String userId) throws IOException {
        String fileName = multipartFile.getOriginalFilename();
        String fileUrl = uploadToS3(multipartFile, fileName);
        updateUserProfileUrl(userId, fileUrl);
        return fileUrl;
    }

    private String uploadToS3(MultipartFile multipartFile, String fileName) throws IOException {
        java.io.File file = convertMultiPartToFile(multipartFile);
        try {
            amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            return amazonS3.getUrl(bucketName, fileName).toString();
        } finally {
            file.delete();
        }
    }

    private java.io.File convertMultiPartToFile(MultipartFile file) throws IOException {
        java.io.File convFile = new java.io.File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return convFile;
    }

    private void updateUserProfileUrl(String userId, String fileUrl) {
        User user = userDao.selectByUserId(userId);
        user.setUserProfileUrl(fileUrl);
        saveFileUrl(user);
    }

    private void saveFileUrl(User user) {
        userDao.updateUserProfile(user);
    }
}
