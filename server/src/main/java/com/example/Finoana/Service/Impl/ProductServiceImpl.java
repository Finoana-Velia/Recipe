package com.example.Finoana.Service.Impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.Finoana.Dto.ProductDto;
import com.example.Finoana.Dto.ProductRequestDto;
import com.example.Finoana.Dto.ProductResponseDto;
import com.example.Finoana.Entity.Product;
import com.example.Finoana.Exception.ResourceNotFoundException;
import com.example.Finoana.Repository.ProductRepository;
import com.example.Finoana.Service.ProductService;
import static com.example.Finoana.Core.EntityMapper.*;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService{

	private ProductRepository productRepository;
	
	@Override
	public Page<ProductResponseDto> findProductByName(String name, Pageable pageable) {
		return this.productRepository.findProductByName("%"+name+"%", pageable).map(
					product -> toDto(product,ProductResponseDto.class)
				);
	}

	@Override
	public ProductResponseDto findProductById(Long id) {
		return this.productRepository.findById(id).map(
					product -> toDto(product, ProductResponseDto.class)
				).orElseThrow(
						() -> new ResourceNotFoundException("Product with id "+ id +" is not found")
				);
	}

	@Override
	public ProductResponseDto createProduct(ProductRequestDto product) {
		Product productMapped = toEntity(product, Product.class);
		productMapped.setCreatedAt(LocalDateTime.now());
		Product productSaved = this.productRepository.save(productMapped);
		return toDto(productSaved,ProductResponseDto.class);
	}

	@Override
	public ProductResponseDto updateProduct(Long id, ProductRequestDto productDto) {
		Product product = toEntity(productDto, Product.class);
		product.setUpdatedAt(LocalDateTime.now());
		return this.productRepository.findById(id)
				.map(productFound -> {
					if(product.getImage() == null || product.getImage() == "") {
						product.setImage(productFound.getImage());
					}
					product.setCreatedAt(productFound.getCreatedAt());
					Product productUpdate = this.productRepository.save(product);
					return toDto(productUpdate,ProductResponseDto.class);
				})
				.orElseThrow(
						() -> new ResourceNotFoundException("Product with id " + id + " not found")
				);
	}

	@Override
	public void deleteProductById(Long id) {
		this.productRepository.deleteById(id);
	}

}
