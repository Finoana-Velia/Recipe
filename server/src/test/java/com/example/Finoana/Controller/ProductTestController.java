package com.example.Finoana.Controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductTestController {

	@Autowired
	MockMvc mock;
	
	String url;
	
	@BeforeEach
	void setUp() {
		this.url = "/api/v1/product";
	}
	
	@Test
	@DisplayName("Test search all product by name")
	void searchAll() throws Exception{
		mock.perform(get("/api/v1/products")).andExpect(status().isOk());
	}
	
	@Test
	@DisplayName("Test search product by name and category")
	void searchByCategory() throws Exception {
		mock.perform(get("/api/v1/products/category/DRINKS"))
		.andExpect(status().isOk());
	}
	
}
