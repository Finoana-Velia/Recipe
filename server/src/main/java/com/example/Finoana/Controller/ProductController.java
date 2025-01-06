package com.example.Finoana.Controller;

import java.io.File;
import java.io.FileInputStream;

import org.apache.commons.io.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.example.Finoana.Core.FileManagement;
import com.example.Finoana.Dto.ProductDto;
import com.example.Finoana.Entity.Product;
import com.example.Finoana.Service.ProductService;

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
	public ResponseEntity<Page<ProductDto>> findByName(
			@RequestParam(defaultValue="")String name,
			@RequestParam int page,
			@RequestParam int size
			){
		PageRequest request = PageRequest.of(page, size);
		Page<ProductDto> products = this.productService.findProductByName(name, request);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(products);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ProductDto> findroductById(
			@PathVariable Long id
			) {
		ProductDto product = this.productService.findProductById(id);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(product);
	}
	
	@GetMapping("/image")
	@ResponseBody
	public byte[] getImage(Long id) throws Exception {
		File file = getFile(id,"products");
		return IOUtils.toByteArray(new FileInputStream(file));
	}
	
	@PostMapping
	public ResponseEntity<ProductDto> saveProduct(
			ProductDto product,
			@RequestParam MultipartFile file
			) throws Exception{
		ProductDto productResponse;
		if(!file.isEmpty()) {
			product.setImage(file.getOriginalFilename());
			productResponse = this.productService.createProduct(product);
			registerFile(file,"products",productResponse.getId());
		}else {
			productResponse = this.productService.createProduct(product);
		}
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(productResponse);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ProductDto> updateProduct(
			@PathVariable Long id,
			ProductDto product,
			@RequestParam(required = false) MultipartFile file
			) throws Exception {
		product.setId(id);
		ProductDto productResponse;
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
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
		productService.deleteProductById(id);
		log.warn("Product with id : " + id + " was deleted");
		deleteFile(id,"products");
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
