package com.example.Finoana.Controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Finoana.Core.EmailSender;
import com.example.Finoana.Core.PdfGenerator;
import com.example.Finoana.Dto.InvoiceRequestDto;
import com.example.Finoana.Dto.InvoiceResponseDto;
import com.example.Finoana.Service.InvoiceService;

import static com.example.Finoana.Core.FileManagement.registerDocument;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/invoices")
public class InvoiceController {
	
	private final InvoiceService invoiceService;
	private final PdfGenerator pdfGenerator;
	private final EmailSender emailSender;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Page<InvoiceResponseDto>> searchInvoice(
			@RequestParam(defaultValue="")String reference,
			@RequestParam(defaultValue="0")int page,
			@RequestParam(defaultValue="0")int size
			){
		PageRequest request = PageRequest.of(page,size == 0 ? Integer.MAX_VALUE : size);
		Page<InvoiceResponseDto> invoices = this.invoiceService.searchInvoiceByReference(reference, request);
		return ResponseEntity.status(HttpStatus.OK).body(invoices);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<InvoiceResponseDto> findById(@PathVariable Long id) {
		InvoiceResponseDto invoice = this.invoiceService.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(invoice);
	}
	
	@PostMapping
	public ResponseEntity<InvoiceResponseDto> create(
			@RequestBody InvoiceRequestDto invoice
			) throws Exception{
		InvoiceResponseDto invoiceResponse = this.invoiceService.createInvoice(invoice);
		byte[] file = this.pdfGenerator.export(invoiceResponse);
		registerDocument(file,"invoices",invoiceResponse);
		//this.emailSender.sendMailWithAttachment(invoiceResponse.getId());	
		return ResponseEntity.status(HttpStatus.CREATED).body(invoiceResponse);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<InvoiceResponseDto> update(
			@PathVariable Long id,
			@RequestBody InvoiceRequestDto invoice
			){
		invoice.setId(id);
		System.out.println("#############");
		System.out.println(invoice);
		System.out.println("#############");
		InvoiceResponseDto invoiceResponse = this.invoiceService.updateInvoice(id, invoice);
		return ResponseEntity.status(HttpStatus.OK).body(invoiceResponse);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteInvoice(@PathVariable Long id){
		this.invoiceService.deleteById(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@GetMapping("/export/{id}")
	public ResponseEntity<byte[]> exportToPdf(@PathVariable Long id) throws Exception {
		InvoiceResponseDto invoice = this.invoiceService.findById(id);
		byte[] pdfBytes = this.pdfGenerator.export(invoice);
	
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		String invoiceDate = formatter.format(invoice.getDate());
		String fileName = "invoice_" + id + invoiceDate + ".pdf";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentDisposition(
				ContentDisposition
				.attachment()
				.filename(fileName)
				.build());
		
		return new ResponseEntity<>(pdfBytes,headers,HttpStatus.OK);
	}

}
