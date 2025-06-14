package com.example.Finoana.Dto;

import java.time.LocalDateTime;

import com.example.Finoana.Entity.EntityType;
import com.example.Finoana.Entity.OperationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {
	
	private Long id;
	private String message;
	private LocalDateTime createdAt;
	private Long idEntity;
	private OperationType operationType;
	private EntityType entityType;

}
