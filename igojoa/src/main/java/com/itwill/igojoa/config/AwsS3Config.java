package com.itwill.igojoa.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class AwsS3Config {
    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;
    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Bean
    public AmazonS3 amazonS3() {
        log.info("Configuring AmazonS3 bean");
        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);

        return AmazonS3ClientBuilder.standard()
                .withRegion(Regions.AP_NORTHEAST_2) // 서울 리전으로 설정
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
