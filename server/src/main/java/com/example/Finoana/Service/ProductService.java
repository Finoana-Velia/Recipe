package com.example.Finoana.Service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Finoana.Dto.ProductRequestDto;
import com.example.Finoana.Dto.ProductResponseDto;
import com.example.Finoana.Entity.Category;
import com.example.Finoana.Entity.Product;

public interface ProductService {

	Page<ProductResponseDto> findProductByName(String name,Pageable pageable);
	Page<ProductResponseDto> findProductByCategory(Category category,Pageable pageable);
	ProductResponseDto findProductById(Long id);
	ProductResponseDto createProduct(ProductRequestDto product);
	ProductResponseDto updateProduct(Long id,ProductRequestDto product);
	void deleteProductById(Long id);
}
