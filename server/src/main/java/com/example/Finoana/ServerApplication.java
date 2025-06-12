package com.example.Finoana;

import java.util.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.Finoana.Entity.Account;
import com.example.Finoana.Entity.Contact;
import com.example.Finoana.Entity.Gender;
import com.example.Finoana.Entity.Location;
import com.example.Finoana.Repository.AccountRepository;

import org.springframework.context.ApplicationContext;

@SpringBootApplication
@EnableScheduling
public class ServerApplication {

	public static void main(String[] args) {
		//SpringApplication.run(ServerApplication.class, args);
		ApplicationContext ctx = SpringApplication.run(ServerApplication.class, args);
		AccountRepository accountRepository = ctx.getBean(AccountRepository.class);
		PasswordEncoder encoder = ctx.getBean(PasswordEncoder.class);
		
		if(!accountRepository.existsById(1L)) {
			accountRepository.save(
					Account.builder()
					.username("john")
					.role("ADMIN")
					.contact(Contact.builder().email("john@example.com").build())
					.password(encoder.encode("password"))
					.build()
					);
		}
	}

}
