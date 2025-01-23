package com.example.Finoana.Dto;

import java.time.LocalDate;
import java.util.Set;

import com.example.Finoana.Entity.Category;
import com.example.Finoana.Entity.Gender;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChefRequestDto {
	private Long id;
	private String name;
	private LocalDate birthDate;
	private String profile;
	private Gender gender;
	private Set<Category> specialities;
	private String description;
}
