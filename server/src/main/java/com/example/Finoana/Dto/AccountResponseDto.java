package com.example.Finoana.Dto;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import com.example.Finoana.Entity.Contact;
import com.example.Finoana.Entity.Gender;
import com.example.Finoana.Entity.Invoice;
import com.example.Finoana.Entity.Location;
import com.example.Finoana.Entity.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AccountResponseDto {
	private Long id;
	
	private String username;
	
	private String firstName;
	private String lastName;
	private Date birthDate;
	private String profilePicture;
	private Gender gender;
	
	private Location location;
	private Contact contact;
	
	private Set<Invoice> invoice;
	private Set<Product> favorites;
}
