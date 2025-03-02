package com.example.Finoana.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Finoana.Entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{

	@Query("select n from Notification n order by n.createdAt desc")
	Page<Notification> findAllNotification(Pageable pageable);
}
