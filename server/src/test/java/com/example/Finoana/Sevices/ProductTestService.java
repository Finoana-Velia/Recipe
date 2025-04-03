package com.example.Finoana.Sevices;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.example.Finoana.Dto.ProductResponseDto;
import com.example.Finoana.Entity.Category;
import com.example.Finoana.Entity.Product;
import com.example.Finoana.Exception.ResourceNotFoundException;
import com.example.Finoana.Repository.ProductRepository;
import com.example.Finoana.Service.Impl.ProductServiceImpl;

@ExtendWith(MockitoExtension.class)
public class ProductTestService {
	
	@Mock
	ProductRepository productRepository;
	
	@InjectMocks
	ProductServiceImpl productService;
	
	List<Product> productList;
	PageRequest request;
	
	
	@BeforeEach
	void setUp() {
		productList = generateProduct();
		request = PageRequest.of(0,10);
	}
	
	@Test
	@DisplayName("Test find product by name")
	void testFindByName() {
		String name = "Coca Cola";
		Product product = productList.get(0);
		 
		when(productRepository.findProductByName("%"+name+"%", request))
		.thenReturn(new PageImpl<>(List.of(product)));
		
		Page<ProductResponseDto> response = productService.findProductByName(name, request);
		
		assertAll(
				() -> assertNotNull(response),
				() -> assertEquals("Coca Cola",response.getContent().get(0).getName())
				);
	}
	
	@Test
	@DisplayName("Test find product by name with an empty value")
	void testFindByEmptyName() {
		when(productRepository.findProductByName("%%", request))
		.thenReturn(new PageImpl<>(productList));
		
		Page<ProductResponseDto> response = productService.findProductByName("",request);
		
		assertAll(
				() -> assertNotNull(response),
				() -> assertEquals(6,response.getContent().size()),
				() -> assertEquals("sprite.png",response.getContent().get(1).getImage()),
				() -> assertEquals(15.00,response.getContent().get(2).getPrice())
				);
	}
	
	@Test
	@DisplayName("test find by id succeed")
	void testFindByIdSucceed() {
		Long id = 1L;
		when(productRepository.findById(id)).thenReturn(Optional.of(productList.get(0)));
		ProductResponseDto response = productService.findProductById(id);
		
		assertAll(
				() -> assertNotNull(response),
				() -> assertEquals("Coca Cola",response.getName()),
				() -> assertEquals("Coca.jpg",response.getImage()),
				() -> assertEquals(5.00, response.getPrice())
				);
		
	}
	
	@Test
	@DisplayName("test find by id failed")
	void testFindByIdFailed() {
		Long id = 300L;
		when(productRepository.findById(id)).thenReturn(Optional.empty());
		
		assertThrows(ResourceNotFoundException.class,
				() -> productService.findProductById(id)
				);
		
	}
	
	
	
	List<Product> generateProduct(){
		return List.of(
				Product.builder().name("Coca Cola").price(5.00).image("Coca.jpg").availability(true).category(Category.DRINKS).build(),
				Product.builder().name("Sprite").price(5.00).image("sprite.png").availability(true).category(Category.DRINKS).build(),
				Product.builder().name("PadThai").price(15.00).image("padthai.jpg").availability(false).category(Category.DISHS).build(),
				Product.builder().name("Ratatouille").price(12.00).image("ratatouille.jpg").availability(true).category(Category.DISHS).build(),
				Product.builder().name("Hamburger").price(7.99).image("burger.jpg").availability(true).category(Category.DISHS).build(),
				Product.builder().name("Paela").price(20.00).image("paela.jpg").availability(false).category(Category.DISHS).build()
				);

	}

}
