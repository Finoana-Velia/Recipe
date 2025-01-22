package com.example.Finoana.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Finoana.Dto.ChefRequestDto;
import com.example.Finoana.Dto.ChefResponseDto;

public interface ChefService {
	
	Page<ChefResponseDto> searchChefByName(String name, Pageable request);
	ChefResponseDto findById(Long id);
	ChefResponseDto createChef(ChefRequestDto chef);
	ChefResponseDto updateChef(Long id, ChefRequestDto chef);
	void deleteById(Long id);

}
