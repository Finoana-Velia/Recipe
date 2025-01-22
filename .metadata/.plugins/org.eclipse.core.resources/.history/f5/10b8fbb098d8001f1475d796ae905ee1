package com.example.Finoana.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Finoana.Dto.ProductDto;
import com.example.Finoana.Entity.Product;

public interface ProductService {

	Page<ProductDto> findProductByName(String name,Pageable pageable);
	ProductDto findProductById(Long id);
	ProductDto createProduct(ProductDto product);
	ProductDto updateProduct(Long id,ProductDto product);
	void deleteProductById(Long id);
}
