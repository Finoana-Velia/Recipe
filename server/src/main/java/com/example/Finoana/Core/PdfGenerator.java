package com.example.Finoana.Core;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.Finoana.Dto.InvoiceResponseDto;
import com.example.Finoana.Entity.Account;
import com.example.Finoana.Entity.Product;
import com.example.Finoana.Service.InvoiceService;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfTable;
import com.lowagie.text.pdf.PdfWriter;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
public class PdfGenerator {
	
	public byte[] export(InvoiceResponseDto invoice) throws Exception {
		
		Document document = new Document(PageSize.HALFLETTER);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		PdfWriter.getInstance(document, outputStream);
		
		document.open();
		this.header(document,invoice);
		this.body(document, invoice.getAccount(),invoice.getDeliveryAdress());
		this.productTable(document,invoice.getProducts());
		this.footer(document, invoice);
		document.close();
		
		return outputStream.toByteArray();
	}
	
	private void header(Document document,InvoiceResponseDto invoice) throws Exception{
		/* Image */
		String logoPath = "src/main/resources/static/Ginyard-removebg-preview.png";
		Image image = Image.getInstance(logoPath);
		image.scaleAbsolute(75, 75);
		image.setAlignment(Paragraph.ALIGN_LEFT);
	
		document.add(image);
		document.add(
				this.setElement(
						PdfElement.builder()
						.text("developermail@example.com")
						.font(FontFactory.getFont(FontFactory.HELVETICA))
						.fontSize(12)
						.align(Paragraph.ALIGN_LEFT)
						.build() 
						)
				);
		document.add(
				this.setElement(
						PdfElement.builder()
						.text("+123456789")
						.font(FontFactory.getFont(FontFactory.HELVETICA))
						.fontSize(12)
						.align(Paragraph.ALIGN_LEFT)
						.build()
						)
				);
		document.add(
				this.setElement(PdfElement.builder()
						.text(invoice.getId() + invoice.getReference())
						.font(FontFactory.getFont(FontFactory.HELVETICA))
						.fontSize(12)
						.align(Paragraph.ALIGN_LEFT)
						.build())
				);
	}
	
	private void body(Document document, Account account, String address) {
		document.add(this.setElement(PdfElement.builder()
				.text("Client informations")
				.font(FontFactory.getFont(FontFactory.HELVETICA_BOLD))
				.fontSize(14)
				.align(Paragraph.ALIGN_CENTER)
				.build()));
		document.add(this.setElement(PdfElement.builder()
				.text("Complete Name : " + account.getFirstName() + " " + account.getLastName())
				.font(FontFactory.getFont(FontFactory.HELVETICA))
				.fontSize(12)
				.align(Paragraph.ALIGN_LEFT)
				.build()));
		document.add(this.setElement(PdfElement.builder()
				.text("Email : " + account.getContact().getEmail())
				.font(FontFactory.getFont(FontFactory.HELVETICA))
				.fontSize(12)
				.align(Paragraph.ALIGN_LEFT)
				.build()));
		document.add(this.setElement(PdfElement.builder()
				.text("Phone : " + account.getContact().getPhone())
				.font(FontFactory.getFont(FontFactory.HELVETICA))
				.fontSize(12)
				.align(Paragraph.ALIGN_LEFT)
				.build()));
		document.add(this.setElement(PdfElement.builder()
				.text("Address : " + address)
				.font(FontFactory.getFont(FontFactory.HELVETICA))
				.fontSize(12)
				.align(Paragraph.ALIGN_LEFT)
				.build()));
	}
	
	private void footer(Document document,InvoiceResponseDto invoice) {
		document.add(this.setElement(PdfElement.builder()
				.text("Discount : " + invoice.getDiscount())
				.font(FontFactory.getFont(FontFactory.HELVETICA_BOLD))
				.fontSize(12)
				.align(Paragraph.ALIGN_RIGHT)
				.build()));
		
		document.add(this.setElement(PdfElement.builder()
				.text("Delivery fee : " + invoice.getDeliveryFee())
				.font(FontFactory.getFont(FontFactory.HELVETICA_BOLD))
				.fontSize(12)
				.align(Paragraph.ALIGN_RIGHT)
				.build()));
		
		document.add(this.setElement(PdfElement.builder()
				.text("Total : " + invoice.getTotal())
				.font(FontFactory.getFont(FontFactory.HELVETICA_BOLD))
				.fontSize(12)
				.align(Paragraph.ALIGN_RIGHT)
				.build()));
	}
	
	private void productTable(Document document,List<Product> products) {
		/* Config table */
		PdfPTable table = new PdfPTable(3);
		table.setWidthPercentage(100);
		table.setWidths(new float[] { 1f, 3.5f, 2.5f});
		table.setSpacingBefore(10);
		
		/* table header */
		this.setCell(table,"qty");
		this.setCell(table, "Product");
		this.setCell(table,"Price ($)");
		
		/* Collumn */
		for(Product product : products) {
			PdfPCell cell = new PdfPCell();
			cell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			cell.setPhrase(new Phrase("1"));
			table.addCell(cell);
			cell.setPhrase(new Phrase(product.getName()));
			table.addCell(cell);
			cell.setPhrase(new Phrase(String.valueOf(product.getPrice())));
			table.addCell(cell);
		}
		
		for(int i = 0; i <= 3; i++) {
			PdfPCell bottomCell = new PdfPCell();
			bottomCell.setBorder(Rectangle.BOTTOM);
			bottomCell.setPhrase(new Phrase(""));
			table.addCell(bottomCell);
		}
		
	
		document.add(table);
	}
	
	
	
	private void setCell(PdfPTable table,String title) {
		PdfPCell cell = new PdfPCell();
		cell.setPadding(5);
		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		cell.setPhrase(new Phrase(title,font));
		table.addCell(cell);
			
	}
	
	private Paragraph setElement(PdfElement element) {
		element.getFont().setSize(element.getFontSize());
		Paragraph paragraph = new Paragraph(element.getText(),element.getFont());
		paragraph.setAlignment(element.getAlign());
		return paragraph;
	}
	
}
