package com.itwill.igojoa.dto.place;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.itwill.igojoa.entity.PlaceConfirm;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceConfirmDto {
    private String placeName;
    private String reporterId;
    private String address;
    private String placeDescription;
    private String operatingHours;


    public PlaceConfirm toEntity() {
        String[] addressParts = splitAddress(address);
        return PlaceConfirm.builder()
                .placeName(placeName)
                .reporterId(reporterId)
                .largeAddress(addressParts[0])
                .mediumAddress(addressParts[1])
                .smallAddress(addressParts[2])
                .placeDescription(placeDescription)
                .operatingHours(operatingHours)
                .build();
    }

    private String[] splitAddress(String address) {
        String[] result = new String[]{"", "", ""};
        if (address != null && !address.isEmpty()) {
            String[] parts = address.split(" ");
            if (parts.length >= 1) result[0] = parts[0];
            if (parts.length >= 2) result[1] = parts[1];
            if (parts.length >= 3) result[2] = String.join(" ", Arrays.copyOfRange(parts, 2, parts.length));
        }
        return result;
    }

    
}