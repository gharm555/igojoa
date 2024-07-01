package com.itwill.igojoa.dto.place;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceSearchDto {
	private String userId;
	private String addressCategory;
	private String searchKeyword;
	private String sortKey;
	private Integer sortValue;
	private Integer startRowValue;
	private Integer rowCnt;
}