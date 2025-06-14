package com.example.Finoana.Core;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Finoana.Dto.InvoiceResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileManagement {
	
	private static String home = System.getProperty("user.home");
	//private static final Path rootPath = Paths.get(home + File.separator + "files" + File.separator);
	private static String rootPath = home + File.separator + "files" + File.separator;
	private static String filePath;
	
	private static void createMainFolder() {
		File mainFolder = new File(rootPath);
		if(!mainFolder.exists()) {
			mainFolder.mkdir();
			log.info("Main folder was created in the source path");
		}
	}
	
	private static void createFolder(String folderName) {
		filePath = rootPath + File.separator + folderName + File.separator;
		File folder = new File(filePath);
		if(!folder.exists()) {
			folder.mkdir();
			log.info("Folder : " + folderName + " was created");
		}
	}
	
	public static void registerDocument(byte[] document,String folderName, InvoiceResponseDto invoice) throws IOException {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		String currentDate = formatter.format(invoice.getDate());
		String fileName = "invoice_" + invoice.getId() + currentDate + ".pdf";
		
		if(document != null) {
			createMainFolder();
			createFolder(folderName);
			FileOutputStream fos = new FileOutputStream(filePath + fileName);
			fos.write(document);
			log.info("Document " + fileName + " has been saved in " + filePath);
		}
	}
	
	public static void registerFile(
			MultipartFile file,
			String folderName,
			Long id
			) throws IllegalStateException, IOException {
		if(!file.isEmpty()) {
			createMainFolder();
			createFolder(folderName);
			file.transferTo(new File(filePath + id));
			log.info("File " + file.getOriginalFilename() + " has been saved");
		}else {
			log.warn("File not found");
		}
	}
	
	public static void updateFile(
			MultipartFile file,
			String folderName,
			Long id
			) throws IllegalStateException, IOException  {
		if(!file.isEmpty()) {
			createMainFolder();
			createFolder(folderName);
			Path fileUpdate = Paths.get(filePath + id);
			file.transferTo(fileUpdate);
			log.info("File with id " + id + " in folder " + 
			folderName + " has been changed to " + 
					file.getOriginalFilename());
		}else {
			log.warn("File not update");
		}
	}
	
	public static File getDocument(InvoiceResponseDto invoice, String folder) {
		filePath = rootPath + File.separator + folder + File.separator;
		
//		DateFormat dateFormatter = new SimpleDateFormat("yyyyMMdd");
//		String currentDate = dateFormatter.format(invoice.getDate());
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		String currentDate = formatter.format(invoice.getDate());
		String fileName = "invoice_" + invoice.getId() + currentDate + ".pdf";
		
		File file = new File(filePath + fileName);
		if(file.exists()) {
			return file;
		}
		
		return null;
	}
	
	public static File getFile(Long id, String folderName) {
		filePath = rootPath + File.separator + folderName + File.separator;
		File file = new File(filePath + id);
		if(file.exists()) {
			return file;
		}else {
			return null;
		}
	}
	
	public static void deleteFile(Long id, String folder) {
		filePath = rootPath + File.separator + folder + File.separator + id;
		File file = new File(filePath);
		if(file.exists()) {
			file.delete();
			log.warn("File with id " + id + " into " + folder + " was deleted");
		}else {
			log.warn("This file doesn't exists");
		}
	}
}
