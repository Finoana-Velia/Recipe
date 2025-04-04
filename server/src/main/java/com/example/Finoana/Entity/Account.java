package com.example.Finoana.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Account {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	@Column(unique = true, nullable = false)
	private String username;
	private String password;
	private String role;
	
	private String firstName;
	private String lastName;
	private Date birthDate;
	private String profilePicture;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Embedded
	private Location location;
	
	@Embedded
	private Contact contact;
	
	@OneToMany
	@JsonIgnore
	private Set<Invoice> invoices;
	
	@ManyToMany
	@JoinTable(
			name = "account_product",
			joinColumns = @JoinColumn(name = "account_id"),
			inverseJoinColumns = @JoinColumn(name = "product_id")
	)
	private Set<Product> favorites;

}
