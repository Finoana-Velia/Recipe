package com.example.Finoana.Dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class InvoiceRequestDto {
	private Long id;
	private String reference;
	private LocalDate date;
	private String deliveryAdress;
	private boolean isDelivered;
	private double subtotal;
	private double total;
	private double discount;
	private double deliveryFee;
	private List<Long> productIds;
	private Long idAccount;
}
