package com.example.Finoana.Service.Impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import com.example.Finoana.Dto.NotificationDto;
import com.example.Finoana.Entity.Notification;
import com.example.Finoana.Exception.ResourceNotFoundException;
import com.example.Finoana.Repository.NotificationRepository;
import com.example.Finoana.Service.NotificationService;


import static com.example.Finoana.Core.EntityMapper.*;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationServiceImpl implements NotificationService{
	
	private final NotificationRepository notificationRepository;
	
	@Override
	public Page<NotificationDto> findAll(Pageable request) {
		return this.notificationRepository.findAllNotification(request).map(
				notification -> toDto(notification,NotificationDto.class)
				);
	}

	@Override
	public NotificationDto findById(Long id) {
		return this.notificationRepository.findById(id).map(
				notification -> toDto(notification,NotificationDto.class)
				).orElseThrow(
						() -> new ResourceNotFoundException("Notification " + id + " not found")
						);
	}

	@Override
	public NotificationDto save(Notification notification) {
		Notification notificationSaved = this.notificationRepository.save(notification);
		return toDto(notificationSaved,NotificationDto.class);
	}

	@Override
	public Page<NotificationDto> notificationForUsers(Long id,Pageable request) {
		return this.notificationRepository.notificationForUsers(id,request).map(
				notification -> toDto(notification,NotificationDto.class));
	}
	

}
