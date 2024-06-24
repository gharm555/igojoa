package com.itwill.igojoa.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.itwill.igojoa.entity.User;
import com.itwill.igojoa.repository.UserDao;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class S3Service {
    private AmazonS3 amazonS3;
    private UserDao userDao;
    private String bucketName = "igojoa";

    @Autowired
    public S3Service(AmazonS3 amazonS3, UserDao userDao) {
        this.amazonS3 = amazonS3;
        this.userDao = userDao;
    }

    public String uploadFileAndSaveUrl(MultipartFile multipartFile, String userId) throws IOException {
        if (multipartFile == null || multipartFile.isEmpty()) {
            throw new IllegalArgumentException("파일이 제공되지 않았습니다.");
        }

        String fileName = generateFileName(multipartFile, userId);
        String fileUrl = uploadToS3(multipartFile, fileName);
        saveFileUrlInDatabase(userId, fileUrl);
        return fileUrl;
    }

    private String uploadToS3(MultipartFile multipartFile, String fileName) throws IOException {
        File file = convertMultiPartToFile(multipartFile);
        try {
            amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            return amazonS3.getUrl(bucketName, fileName).toString();
        } finally {
            file.delete();
        }
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return convFile;
    }

    private void saveFileUrlInDatabase(String userId, String fileUrl) {
        User user = userDao.selectByUserId(userId);
        if (user == null) {
            throw new IllegalArgumentException("유저 ID가 유효하지 않습니다: " + userId);
        }
        user.setUserProfileUrl(fileUrl);
        userDao.updateUserProfile(user);
    }

    private String generateFileName(MultipartFile multipartFile, String userId) {
        return userId + "_" + System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();
    }
}
