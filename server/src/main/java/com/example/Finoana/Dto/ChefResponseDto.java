package com.example.Finoana.Dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.example.Finoana.Entity.Category;
import com.example.Finoana.Entity.Gender;
import com.example.Finoana.Entity.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChefResponseDto {
	private Long id;
	private String name;
	private LocalDate birthDate;
	private String profile;
	private Gender gender;
	private Category speciality;
	private String description;
}
