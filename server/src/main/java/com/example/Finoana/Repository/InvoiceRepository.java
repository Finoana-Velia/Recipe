package com.example.Finoana.Repository;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.Finoana.Entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice,Long>{
	
	@Query("select i from Invoice i where i.reference like :x")
	Page<Invoice> searchInvoiceByReference(@Param("x")String reference,Pageable pageable);

	@Query("select avg(i.subtotal) from Invoice i")
	Double averageEaring();
	
	@Query("select count(i) from Invoice i where i.date =:x")
	Integer todaysOrder(@Param("x")LocalDate date);
	
	@Query("select count(u) from Account u")
	Integer dailyUser();
}
