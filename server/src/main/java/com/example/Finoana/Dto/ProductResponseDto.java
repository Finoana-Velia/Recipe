package com.example.Finoana.Dto;

import com.example.Finoana.Entity.Category;
import com.example.Finoana.Entity.Chef;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {
	private Long id;
	private String name;
	private double price;
	private int quantity;
	private String image;
	private Category category;
	private Chef chef;
}
