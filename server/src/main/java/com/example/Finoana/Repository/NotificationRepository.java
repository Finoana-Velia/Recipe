package com.example.Finoana.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.Finoana.Entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{

	@Query("select n from Notification n order by n.createdAt desc")
	Page<Notification> findAllNotification(Pageable pageable);
	
	@Query("select n from Notification n where n.entityType=CHEF or n.entityType=PRODUCT or (n.entityType=INVOICE and idEntity=:x) order by n.createdAt desc")
	Page<Notification> notificationForUsers(@Param("x")Long idUser,Pageable pageable);
	
}
