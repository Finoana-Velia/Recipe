package com.example.Finoana.Configuration;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class DataInitializer implements CommandLineRunner{
	
	private final AccountRepository accountRepository;
	private final ChefRepository chefRepository;
	private final ProductRepository productRepository;
	private final CryptConfig passwordEncoder;

	@Override
	public void run(String... args) throws Exception {
		this.generateAccount();
		this.generateChef();
		this.generateProduct(chefRepository);
	}
	
	private void generateProduct(ChefRepository chefRepository) {
		Chef chef1 = chefRepository.getReferenceById(1L);
		Chef chef2 = chefRepository.getReferenceById(2L);
		this.productRepository.saveAll(List.of(
				Product.builder()
				.name("Amaretto")
				.price(2.50)
				.image("Amaretto.png")
				.availability(true)
				.category(Category.DRINKS)
				.chef(chef1)
				.ingredients(List.of("amaretto","lemon juice","simple syrup",
						"egg white","lemon slice garnish","brandied cherry"))
				.build(),
				Product.builder()
				.name("Moscow mule")
				.price(2.00)
				.image("moscow.jpg")
				.availability(true)
				.category(Category.DRINKS)
				.chef(chef1)
				.ingredients(List.of("premium vodka", "lime juice","ginger beer",
						"lime and mint"))
				.build(),
				Product.builder()
				.name("Ice cream caramel")
				.price(10.00)
				.image("caramel.jpg")
				.availability(false)
				.category(Category.DISHS)
				.chef(chef2)
				.ingredients(List.of("Butter and borwn sugar","heavy cream","egg yolks"
						,"whole milk","granulated sugar","salt","vanilla exgtract"))
				.build()));
	}
	
	private void generateChef() {
		this.chefRepository.saveAll(List.of(
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
				));
	}
	
	private void generateAccount() {
		List<Account> accounts = List.of(
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
				.username("john")
				.role("ADMIN")
				.password(this.passwordEncoder.passwordEncoder().encode("password"))
				.build(),
				Account.builder()
				.firstName("Jane")
				.lastName("Dowson")
				.birthDate(new Date())
				.profilePicture("Jane.png")
				.gender(Gender.WOMAN)
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
				.username("jane")
				.role("USER")
				.password(this.passwordEncoder.passwordEncoder().encode("password"))
				.build()
				);
		this.accountRepository.saveAll(accounts);
	}

}
