package com.example.Finoana.Dto;

import java.util.List;

import com.example.Finoana.Entity.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDto {

	private Long id;
	private String name;
	private double price;
	private String image;
	private Category category;
	private boolean availability;
	private List<String> ingredients;
	private Long idChef;
}
