package com.example.Finoana.Service.Impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.Finoana.Dto.InvoiceRequestDto;
import com.example.Finoana.Dto.InvoiceResponseDto;
import com.example.Finoana.Entity.Account;
import com.example.Finoana.Entity.EntityType;
import com.example.Finoana.Entity.Invoice;
import com.example.Finoana.Entity.Notification;
import com.example.Finoana.Entity.OperationType;
import com.example.Finoana.Entity.Product;
import com.example.Finoana.Exception.ResourceNotFoundException;
import com.example.Finoana.Repository.AccountRepository;
import com.example.Finoana.Repository.InvoiceRepository;
import com.example.Finoana.Repository.ProductRepository;
import com.example.Finoana.Service.InvoiceService;
import com.example.Finoana.Service.NotificationService;

import static com.example.Finoana.Core.EntityMapper.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class InvoiceServiceImpl implements InvoiceService{
	
	private InvoiceRepository invoiceRepository;
	private ProductRepository productRepository;
	private AccountRepository accountRepository;
	private NotificationService notificationService;
	
	@Override
	public Page<InvoiceResponseDto> searchInvoiceByReference(String reference, Pageable request) {
		return this.invoiceRepository.searchInvoiceByReference("%" + reference + "%", request).map(
				invoice -> toDto(invoice,InvoiceResponseDto.class)
				);
	}

	@Override
	public InvoiceResponseDto findById(Long id) {
		return this.invoiceRepository.findById(id).map(
				invoice -> toDto(invoice,InvoiceResponseDto.class)
				).orElseThrow(
						() -> new ResourceNotFoundException("Invoice with the id :" + id + " is not found")
						);
	}

	@Override
	public InvoiceResponseDto createInvoice(InvoiceRequestDto invoice) {
		Invoice invoiceMapped = toEntity(invoice,Invoice.class);
		invoiceMapped.setCreatedAt(LocalDateTime.now());
		if(invoice.getIdAccount() != null) {
			Account owner = this.findAccountById(invoice.getIdAccount());
			invoiceMapped.setAccount(owner);
		}
		List<Product> productList = new ArrayList<>();
		invoice.getProductIds().forEach(
				idProduct -> {
					Product productFound = this.findProductById(idProduct);
					productList.add(productFound);
				}
				);
		invoiceMapped.setProducts(productList);
		Invoice invoiceSaved = this.invoiceRepository.save(invoiceMapped);
		this.generateNotification(invoiceSaved, OperationType.CREATE);	
		return toDto(invoiceSaved, InvoiceResponseDto.class);
	}
	
	@Override
	public InvoiceResponseDto confirmDelivery(Long id) {
		return this.invoiceRepository.findById(id).map(
				invoice -> {
					invoice.setDelivered(true);
					Invoice invoiceSaved = this.invoiceRepository.save(invoice);
					return toDto(invoiceSaved,InvoiceResponseDto.class);
				})
				.orElseThrow(() -> new ResourceNotFoundException("Invoice : " + id + " not found"));
	}

	@Override
	public InvoiceResponseDto updateInvoice(Long id, InvoiceRequestDto invoice) {
		Invoice invoiceEntity = toEntity(invoice,Invoice.class);
		invoiceEntity.setUpdatedAt(LocalDateTime.now());
		return this.invoiceRepository.findById(id)
				.map(invoiceFound -> {
					invoiceEntity.setCreatedAt(invoiceFound.getCreatedAt());
					if(invoice.getIdAccount() != null) {
						Account owner = this.findAccountById(invoice.getIdAccount());
						invoiceEntity.setAccount(owner);
					}
					List<Product> productList = new ArrayList<>();
					invoice.getProductIds().forEach(
							idProduct -> {
								Product productFound = this.findProductById(idProduct);
								productList.add(productFound);
							}
							);
					invoiceEntity.setProducts(productList);
					Invoice invoiceSaved = this.invoiceRepository.save(invoiceEntity);
					this.generateNotification(invoiceSaved, OperationType.UPDATE);
					return toDto(invoiceSaved, InvoiceResponseDto.class);
				})
				.orElseThrow(
						() -> new ResourceNotFoundException("Invoice with id : " + id + " is not found")
						);
	}

	@Override
	public void deleteById(Long id) {
		Invoice invoice = this.invoiceRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Invoice " + id + " not found")
				);
		this.generateNotification(invoice, OperationType.DELETE);
		this.invoiceRepository.deleteById(id);
	}
	
	private Account findAccountById(Long id) {
		return this.accountRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Account not found")
				);
	}
	
	private Product findProductById(Long id) {
		return this.productRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Product not found")
				);
	}
	
	private void generateNotification(Invoice invoice,OperationType operationType) {
		String message = "";
		if(operationType.equals(OperationType.CREATE)) {
			message = invoice.getAccount().getFirstName() + " placed an order";
		}
		if(operationType.equals(OperationType.UPDATE)) {
			message = invoice.getAccount().getFirstName() + " has moved forward";
		}
		this.notificationService.save(Notification.builder()
				.createdAt(LocalDateTime.now())
				.idEntity(invoice.getAccount().getId())
				.operationType(operationType)
				.entityType(EntityType.INVOICE)
				.message(message)
				.build());
	}

	
	

}
