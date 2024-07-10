package com.itwill.igojoa.dto.points;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LottoDto {
    private List<Integer> lottoNum;
    private List<Integer> userNum;
    private int bonusBall;
}
