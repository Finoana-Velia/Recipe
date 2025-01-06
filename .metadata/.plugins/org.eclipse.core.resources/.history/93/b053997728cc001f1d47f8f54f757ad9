package com.example.Finoana.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Finoana.Dto.ProductDto;
import com.example.Finoana.Entity.Product;

public interface ProductService {

	Page<ProductDto> findProductName(String name,Pageable pageable);
	ProductDto findProductById(Long id);
	ProductDto createProduct(Product product);
	ProductDto updateProduct(Long id,Product product);
	void deleteProductById(Long id);
}
