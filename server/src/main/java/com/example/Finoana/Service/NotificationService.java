package com.example.Finoana.Service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Finoana.Dto.NotificationDto;
import com.example.Finoana.Entity.Notification;


public interface NotificationService {
	NotificationDto save(Notification notification);
	Page<NotificationDto> findAll(Pageable request);
	Page<NotificationDto> notificationForUsers(Long id,Pageable request);
	//Page<NotificationDto> notificationForUsers(Long id,Pageable request);
	NotificationDto findById(Long id);
}
