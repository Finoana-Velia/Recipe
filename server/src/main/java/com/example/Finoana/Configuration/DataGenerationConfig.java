package com.example.Finoana.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.example.Finoana.Entity.Account;
import com.example.Finoana.Entity.Category;
import com.example.Finoana.Entity.Chef;
import com.example.Finoana.Entity.Contact;
import com.example.Finoana.Entity.Gender;
import com.example.Finoana.Entity.Location;
import com.example.Finoana.Entity.Product;
import com.example.Finoana.Repository.AccountRepository;
import com.example.Finoana.Repository.ChefRepository;
import com.example.Finoana.Repository.ProductRepository;

@Configuration
public class DataGenerationConfig {

//	@Bean
//	CommandLineRunner commandLineRunner(ChefRepository chefRepository) {
//		return args -> chefRepository.saveAll(generateChef());
//	}
	
	@Bean
	CommandLineRunner commandLineRunner(
			AccountRepository accountRepository,
			ChefRepository chefRepository,
			ProductRepository productRepository) {
		return args -> {
			chefRepository.saveAll(generateChef());
			accountRepository.saveAll(generateAccount());
			productRepository.saveAll(generateProduct(chefRepository));
		};
	}
	
	
	private List<Product> generateProduct(ChefRepository chefRepository) {
		Chef chef = chefRepository.getReferenceById(1L);
		Chef chef1 = chefRepository.getReferenceById(2L);
		
		return List.of(
				Product.builder()
				.name("Amaretto")
				.price(2.50)
				.image("Amaretto.png")
				.availability(true)
				.category(Category.DRINKS)
				.chef(chef)
				.build(),
				Product.builder()
				.name("Moscow mule")
				.price(2.00)
				.image("moscow.jpg")
				.availability(true)
				.category(Category.DRINKS)
				.chef(chef)
				.build(),
				Product.builder()
				.name("Ice cream caramel")
				.price(10.00)
				.image("caramel.jpg")
				.availability(false)
				.category(Category.DISHS)
				.chef(chef1)
				.build()
				);
	}
	
	
	private List<Account> generateAccount() {
		return List.of(
				Account.builder()
				.firstName("John")
				.lastName("Doe")
				.birthDate(new Date())
				.gender(Gender.MAN)
				.location(
						Location.builder()
						.address("109 Garden Road")
						.city("New York city")
						.provinceState("New York")
						.build()
				)
				.contact(
						Contact.builder()
						.email("john@example.com")
						.phone("1234567890")
						.build()
				)
				.build(),
				Account.builder()
				.firstName("Jane")
				.lastName("Dowson")
				.birthDate(new Date())
				.gender(Gender.MAN)
				.location(
						Location.builder()
						.address("42 Sunset Street")
						.city("Miami")
						.provinceState("Floride")
						.build()
				)
				.contact(
						Contact.builder()
						.email("jane@mail.com")
						.phone("897564321")
						.build()
				)
				.build()
				);
	}
	
	private List<Chef> generateChef(){
		return List.of(
				Chef.builder()
				.name("Jack Daniels")
				.birthDate(LocalDate.of(1986, 12, 12))
				.profile("chef1.png")
				.gender(Gender.MAN)
				.speciality(Category.DRINKS)
				.description("Long Description")
				.build(),
				Chef.builder()
				.name("Alfredo Linguini")
				.birthDate(LocalDate.of(1996, 6, 11))
				.profile("chef2.png")
				.gender(Gender.MAN)
				.speciality(Category.DISHS)
				.description("The best man to make dishs")
				.build()
				);
	}
}
