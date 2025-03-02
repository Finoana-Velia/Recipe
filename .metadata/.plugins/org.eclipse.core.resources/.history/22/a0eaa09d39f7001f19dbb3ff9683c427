package com.example.Finoana.Controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Finoana.Dto.NotificationDto;
import com.example.Finoana.Service.NotificationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/notifications")
@AllArgsConstructor
public class NotificationController {
	
	private final NotificationService notificationService;
	
	@GetMapping
	public ResponseEntity<Page<NotificationDto>> findAll(
			@RequestParam(defaultValue="0") int page,
			@RequestParam(defaultValue="5")int size
			){
		PageRequest request = PageRequest.of(page, size != 0 ? size : Integer.MAX_VALUE);
		Page<NotificationDto> notifications = this.notificationService.findAll(request);
		return ResponseEntity.status(HttpStatus.OK).body(notifications);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<NotificationDto> findById(@PathVariable Long id) {
		NotificationDto notification = this.notificationService.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(notification);
	}

}
