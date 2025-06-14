package com.example.Finoana.Controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Finoana.Dto.ProductRequestDto;
import com.example.Finoana.Dto.ProductResponseDto;
import com.example.Finoana.Entity.Category;
import com.example.Finoana.Service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;

import static com.example.Finoana.Core.FileManagement.getFile;
import static com.example.Finoana.Core.FileManagement.registerFile;
import static com.example.Finoana.Core.FileManagement.updateFile;
import static com.example.Finoana.Core.FileManagement.deleteFile;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {

	private ProductService productService;
	
	@GetMapping
	public ResponseEntity<Page<ProductResponseDto>> findByName(
			@RequestParam(defaultValue="")String name,
			@RequestParam(defaultValue="0") int page,
			@RequestParam(defaultValue="10") int size
			){
		
		PageRequest request = PageRequest.of(page, size == 0 ? Integer.MAX_VALUE : size,Sort.by("createdAt").descending());
		Page<ProductResponseDto> products = this.productService.findProductByName(name, request);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(products);
	}
	
	@GetMapping("/category/{category}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Page<ProductResponseDto>> findByCategory(
			@PathVariable Category category,
			@RequestParam(defaultValue="0")int page,
			@RequestParam(defaultValue="10")int size) {
		PageRequest request = PageRequest.of(page, size == 0 ? Integer.MAX_VALUE : size);
		Page<ProductResponseDto> products = this.productService.findProductByCategory(category,request);
		return ResponseEntity.status(HttpStatus.OK).body(products);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ProductResponseDto> findroductById(
			@PathVariable Long id
			) {
		ProductResponseDto product = this.productService.findProductById(id);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(product);
	}
	
	@GetMapping("/image")
	@ResponseBody
	public byte[] getImage(Long id) throws FileNotFoundException, IOException  {
		File file = getFile(id,"products");
		return IOUtils.toByteArray(new FileInputStream(file));
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<ProductResponseDto> saveProduct(
			@RequestParam String product,
			@RequestParam MultipartFile file
			) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		ProductRequestDto request = objectMapper.readValue(product, ProductRequestDto.class);
		ProductResponseDto productResponse;
		if(file != null) {
			request.setImage(file.getOriginalFilename());
			productResponse = this.productService.createProduct(request);
			registerFile(file,"products",productResponse.getId());
		}else {
			productResponse = this.productService.createProduct(request);
		}
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(productResponse);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<ProductResponseDto> updateProduct(
			@PathVariable Long id,
//			@RequestParam ProductRequestDto product,
			@RequestParam String productDto,
			@RequestParam(required = false) MultipartFile file
			) throws Exception  {
		ObjectMapper objectMapper = new ObjectMapper();
		ProductRequestDto product = objectMapper.readValue(productDto, ProductRequestDto.class);
		product.setId(id);
		ProductResponseDto productResponse;
		if(file != null) {
			product.setImage(file.getOriginalFilename());
			productResponse = this.productService.updateProduct(id, product);
			updateFile(file,"products",id);
		}else {
			productResponse = this.productService.updateProduct(id, product);
		}
		return ResponseEntity.status(HttpStatus.OK).body(productResponse);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
		productService.deleteProductById(id);
		log.warn("Product with id : " + id + " was deleted");
		//deleteFile(id,"products");
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
