package com.itwill.igojoa.dto.place;

import java.util.Arrays;
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

    // address 쪼개서 나누기
    public PlaceConfirm toEntity() {
        String largeAddress = "";
        String mediumAddress = "";
        String smallAddress = "";

        if (address != null && !address.isEmpty()) {
            String[] addressParts = address.split(" ");
            if (addressParts.length >= 3) {
                largeAddress = addressParts[0];
                mediumAddress = addressParts[1];
                smallAddress = String.join(" ", Arrays.copyOfRange(addressParts, 2, addressParts.length));
            } else if (addressParts.length == 2) {
                largeAddress = addressParts[0];
                mediumAddress = addressParts[1];
            } else if (addressParts.length == 1) {
                largeAddress = addressParts[0];
            }
        }

        return PlaceConfirm.builder()
                .placeName(placeName)
                .reporterId(reporterId)
                .largeAddress(largeAddress)
                .mediumAddress(mediumAddress)
                .smallAddress(smallAddress)
                .placeDescription(placeDescription)
                .operatingHours(operatingHours)
                .build();
    }
}