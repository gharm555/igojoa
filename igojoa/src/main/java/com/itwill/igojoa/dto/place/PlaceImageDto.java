package com.itwill.igojoa.dto.place;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.itwill.igojoa.entity.PlaceImages;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaceImageDto {
    private String placeName;
    private List<MultipartFile> images;
    private List<String> imageNames;
    private List<String> imageUrls;
}