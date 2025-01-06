package com.example.Finoana.Controller;

import org.junit.jupiter.api.BeforeEach;
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
	
	
}
