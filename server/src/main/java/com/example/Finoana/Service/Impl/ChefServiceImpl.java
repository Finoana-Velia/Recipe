package com.example.Finoana.Service.Impl;

import org.modelmapper.internal.bytebuddy.asm.Advice.This;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.Finoana.Dto.ChefRequestDto;
import com.example.Finoana.Dto.ChefResponseDto;
import com.example.Finoana.Entity.Chef;
import com.example.Finoana.Entity.EntityType;
import com.example.Finoana.Entity.Notification;
import com.example.Finoana.Entity.OperationType;
import com.example.Finoana.Exception.ResourceNotFoundException;
import com.example.Finoana.Repository.ChefRepository;
import com.example.Finoana.Service.ChefService;
import com.example.Finoana.Service.NotificationService;

import static com.example.Finoana.Core.EntityMapper.*;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChefServiceImpl implements ChefService{

	private ChefRepository chefRepository;
	private NotificationService notificationService;
	
	@Override
	public Page<ChefResponseDto> searchChefByName(String name, Pageable request) {
		return this.chefRepository.searchChefByName(name, request).map(
				chef -> toDto(chef, ChefResponseDto.class)
				);
	}

	@Override
	public ChefResponseDto findById(Long id) {
		return this.chefRepository.findById(id)
				.map(chef -> toDto(chef, ChefResponseDto.class))
				.orElseThrow(
						() -> new ResourceNotFoundException("Chef with the id " + id + " not found")
						);
	}

	@Override
	public ChefResponseDto createChef(ChefRequestDto chef) {
		Chef chefEntity = toEntity(chef,Chef.class);
		chefEntity.setCreatedAt(LocalDateTime.now());
		Chef chefSaved = this.chefRepository.save(chefEntity);
		this.generateNotification(chefEntity, OperationType.CREATE);
		return toDto(chefSaved,ChefResponseDto.class);
	}

	@Override
	public ChefResponseDto updateChef(Long id, ChefRequestDto chef) {
		Chef chefEntity = toEntity(chef, Chef.class);
		chefEntity.setUpdatedAt(LocalDateTime.now());
		return this.chefRepository.findById(id)
				.map(chefFound ->{
					if(chefEntity.getProfile() == null) {
						chefEntity.setProfile(chefFound.getProfile());
					}
					chefEntity.setUpdatedAt(LocalDateTime.now());
					Chef chefUpdated = this.chefRepository.save(chefEntity);
					this.generateNotification(chefUpdated, OperationType.UPDATE);
					return toDto(chefUpdated, ChefResponseDto.class);
				}).orElseThrow(
						() -> new ResourceNotFoundException("Chef with id :" + id + " is not found")
						);
	}

	@Override
	public void deleteById(Long id) {
		Chef chef = this.chefRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Chef with id " + id +" was not found")
				);
		this.generateNotification(chef, OperationType.DELETE);
		this.chefRepository.deleteById(id);	
	}

	private void generateNotification(Chef chef,OperationType operationType) {
		String message = "";
		if(operationType.equals(OperationType.CREATE)) {
			message = " was added in the list";
		}
		if(operationType.equals(OperationType.UPDATE)) {
			message = " informations was updated";
		}
		if(operationType.equals(OperationType.DELETE)) {
			message = " was remove from the list";
		}
		this.notificationService.save(Notification.builder()
				.createdAt(LocalDateTime.now())
				.idEntity(chef.getId())
				.operationType(operationType)
				.entityType(EntityType.CHEF)
				.message(chef.getName() + message)
				.build());
	}
}
