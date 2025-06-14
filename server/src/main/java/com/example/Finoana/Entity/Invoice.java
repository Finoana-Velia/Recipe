package com.example.Finoana.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Invoice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String reference;
	private LocalDate date;
	private String deliveryAdress;
	private boolean isDelivered;
	
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	private double subtotal;
	private double total;
	private double discount;
	private double deliveryFee;
	
	@ManyToMany
	@JoinTable(
			name = "invoice_product",
			joinColumns = @JoinColumn(name = "invoice_id"),
			inverseJoinColumns = @JoinColumn(name = "product_id")
			)
	private List<Product> products;
	
	@ManyToOne
	@JoinColumn(name="account_id")
	private Account account;
	
	//User
	
}
