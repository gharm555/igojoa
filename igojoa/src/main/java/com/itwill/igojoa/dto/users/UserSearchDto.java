package com.itwill.igojoa.dto.users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSearchDto {
	private String userId;
	private String searchKeyword;
	private String largeAddress; // 도/광역시
    private String calendar; // 날짜 (YYYY.MM.DD)
	private String sortKey; // 정렬 키
	private Integer sortValue; // 정렬 값
	private Integer startRowValue; // 시작할 행을 정하는 필드
	private Integer rowCnt; // 몇개나 표시할지 정하는 필드
}
