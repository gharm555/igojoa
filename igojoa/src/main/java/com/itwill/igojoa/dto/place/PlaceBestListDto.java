package com.itwill.igojoa.dto.place;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceBestListDto {
    private String placeName;
    private String firstUrl;
}
