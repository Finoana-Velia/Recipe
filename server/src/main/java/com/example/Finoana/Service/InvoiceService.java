package com.example.Finoana.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Finoana.Dto.InvoiceRequestDto;
import com.example.Finoana.Dto.InvoiceResponseDto;

public interface InvoiceService {
	
	Page<InvoiceResponseDto> searchInvoiceByReference(String reference,Pageable request);
	InvoiceResponseDto findById(Long id);
	InvoiceResponseDto createInvoice(InvoiceRequestDto invoice);
	InvoiceResponseDto updateInvoice(Long id,InvoiceRequestDto invoice);
	InvoiceResponseDto confirmDelivery(Long id);
	void deleteById(Long id);

}
