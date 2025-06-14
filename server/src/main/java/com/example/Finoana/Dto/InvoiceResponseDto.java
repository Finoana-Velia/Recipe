package com.example.Finoana.Dto;

import java.time.LocalDate;
import java.util.List;

import com.example.Finoana.Entity.Account;
import com.example.Finoana.Entity.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class InvoiceResponseDto {
	private Long id;
	private String reference;
	private LocalDate date;
	private String deliveryAdress;
	private boolean isDelivered;
	private double subtotal;
	private double total;
	private double discount;
	private double deliveryFee;
	private List<Product> products;
	private Account account;
}
