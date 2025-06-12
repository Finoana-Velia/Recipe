package com.example.Finoana.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatisticDto {
	private Double averageEaring;
	private Integer todaysOrder;
	private Integer dailyUser;
}
