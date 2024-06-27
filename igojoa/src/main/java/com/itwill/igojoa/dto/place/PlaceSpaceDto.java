package com.itwill.igojoa.dto.place;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceSpaceDto {
    private String placeName;
    private double placeLatitude;
    private double placeLongitude;
}
