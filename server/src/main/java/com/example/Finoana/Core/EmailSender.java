package com.example.Finoana.Core;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.Finoana.Dto.AccountResponseDto;
import com.example.Finoana.Dto.InvoiceResponseDto;
import com.example.Finoana.Service.AccountService;
import com.example.Finoana.Service.InvoiceService;

import static com.example.Finoana.Core.FileManagement.getDocument;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailSender {
	
	@Value("${emailFrom}")
	private String emailFrom;
	
	private JavaMailSender mailSender;
	private InvoiceService invoiceService;
	private AccountService accountService;
	
	public EmailSender(
			JavaMailSender mailSender,
			InvoiceService invoiceService,
			AccountService accountService
			) {
		this.mailSender = mailSender;
		this.invoiceService = invoiceService;
		this.accountService = accountService;
	}
	
//	public void sendEmail(String toMail,String subject,String body) {
//		SimpleMailMessage message = new SimpleMailMessage();
//		message.setFrom("sbakery775@gmail.com");
//		message.setTo(toMail);
//		message.setText(body);
//		message.setSubject(subject);
//		
//		mailSender.send(message);
//		System.out.println("Mail sended successfully");
//	}
//	
//	public void sendHtmlEmail(String fromMail,String toMail, String subject) throws MessagingException{
//		MimeMessage message = mailSender.createMimeMessage();
//		message.setFrom(new InternetAddress(fromMail));
//		message.setRecipients(MimeMessage.RecipientType.TO, toMail);
//		message.setSubject(subject);
//		
//		String htmlContent = "<h1>This is a test Spring boot mail</h1>" + 
//				"<p>it contain <strong>HTML</strong> code.</p>";
//		message.setContent(htmlContent,"text/html; charset=utf-8");
//		mailSender.send(message);
//	}
	
	public void sendWelcomeEmail(Long id) throws AddressException, MessagingException, IOException {
		AccountResponseDto account = this.accountService.findById(id);
		MimeMessage message = mailSender.createMimeMessage();
		message.setFrom(new InternetAddress(this.emailFrom));
		message.setRecipients(MimeMessage.RecipientType.TO, account.getContact().getEmail());
		
		String template = this.readFile("src/main/resources/templates/MailBody.html");
		String htmlConfig = template.replace("${name}", account.getFirstName());
		
		message.setContent(htmlConfig, "text/html; charset=utf-8");
		
		mailSender.send(message);
	}
	
	public void sendMailWithAttachment(Long id) throws MessagingException, IOException {
		InvoiceResponseDto invoice = this.invoiceService.findById(id);
		
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message,true,"UTF-8");
		helper.setFrom(this.emailFrom);
		helper.setTo(invoice.getAccount().getContact().getEmail());
		helper.setSubject("Your order details from RestFood and Bakery");
		
		String htmlTemplate = this.readFile("src/main/resources/templates/MailBody.html");
		String htmlContent = htmlTemplate.replace("${name}", invoice.getAccount().getFirstName());
		
		helper.setText(htmlContent,true);
		
		File file = getDocument(invoice,"invoices");
		helper.addAttachment(file.getName(),file);
		
		mailSender.send(message);
		log.info("An email was send to " + invoice.getAccount().getFirstName() + " about invoice");
	}
	
	private String readFile(String filePath) throws IOException {
		Path path = Paths.get(filePath);
		return Files.readString(path, StandardCharsets.UTF_8);
	}

}
