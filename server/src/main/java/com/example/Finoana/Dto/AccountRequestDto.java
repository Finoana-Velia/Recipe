package com.example.Finoana.Dto;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import com.example.Finoana.Entity.Contact;
import com.example.Finoana.Entity.Gender;
import com.example.Finoana.Entity.Location;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AccountRequestDto {
	private Long id;
	private String firstName;
	private String lastName;
	private Date birthDate;
	private String profilePicture;
	private Gender gender;
	private Location location;
	private Contact contact;
//	private Set<Long> invoiceIds;
//	private Set<Long> idProducts;
}
