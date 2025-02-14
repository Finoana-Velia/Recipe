package com.example.Finoana.Service.Impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.Finoana.Dto.ProductRequestDto;
import com.example.Finoana.Dto.ProductResponseDto;
import com.example.Finoana.Entity.Category;
import com.example.Finoana.Entity.Chef;
import com.example.Finoana.Entity.Product;
import com.example.Finoana.Exception.ResourceNotFoundException;
import com.example.Finoana.Repository.ChefRepository;
import com.example.Finoana.Repository.ProductRepository;
import com.example.Finoana.Service.ProductService;
import static com.example.Finoana.Core.EntityMapper.*;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService{

	private ProductRepository productRepository;
	private final ChefRepository chefRepostitory;
	
	@Override
	public Page<ProductResponseDto> findProductByName(String name, Pageable pageable) {
		return this.productRepository.findProductByName("%"+name+"%", pageable).map(
					product -> toDto(product,ProductResponseDto.class)
				);
	}
	
	@Override
	public Page<ProductResponseDto> findProductByCategory(String category, Pageable pageable) {
		Page<Product> products;
		switch(category) {
			case "Dishs" : 
				products = this.productRepository.findProductByCategory(Category.DISHS, pageable);
			case "Pizzas" : 
				products = this.productRepository.findProductByCategory(Category.PIZZAS, pageable);
			case "Drinks" : 
				products = this.productRepository.findProductByCategory(Category.DRINKS, pageable);
			case "Noodles" : 
				products = this.productRepository.findProductByCategory(Category.NOODLES, pageable);
			default : 
				products = this.productRepository.findAll(pageable);
		}
		
		Page<ProductResponseDto> response = products.map(
				product -> toDto(product,ProductResponseDto.class)
				);
		return response;
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
		if(product.getIdChef() != null) {
			Chef chef = this.chefRepostitory.findById(product.getIdChef()).orElseThrow(
					() -> new ResourceNotFoundException("the chef with id : " + product.getIdChef() + " is not found")
					);
			productMapped.setChef(chef);
		}
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
					if(productDto.getIdChef() != null) {
						Chef chef = this.chefRepostitory.findById(productDto.getIdChef()).orElseThrow(
								() -> new ResourceNotFoundException("the chef with id : " + productDto.getIdChef() + " is not found")
								);
						product.setChef(chef);
					}
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
