package com.itwill.igojoa.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class AwsS3Config {
    @Value("${aws.access.key.id}")
    private String accessKeyId;
    @Value("${aws.secret.access.key}")
    private String secretAccessKey;

    @Bean
    public AmazonS3 amazonS3() {
        // 여기에 실제 AWS Access Key와 Secret Key를 입력하세요
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);

        return AmazonS3ClientBuilder.standard()
                .withRegion("ap-northeast-2") // 서울 리전으로 설정
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
