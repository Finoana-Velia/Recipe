package com.example.Finoana.Controller;

import org.apache.commons.io.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Finoana.Core.EmailSender;
import com.example.Finoana.Dto.AccountRequestDto;
import com.example.Finoana.Dto.AccountResponseDto;
import com.example.Finoana.Service.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;

import static com.example.Finoana.Core.FileManagement.*;

import java.io.File;
import java.io.FileInputStream;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/accounts")
@AllArgsConstructor
public class AccountController {

	private final AccountService accountService;
	private final EmailSender emailSender;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Page<AccountResponseDto>> findAll(
			@RequestParam(defaultValue="0")int page,
			@RequestParam(defaultValue="0") int size
			) {
		PageRequest request = PageRequest.of(page, size != 0 ? size : Integer.MAX_VALUE);
		Page<AccountResponseDto> accounts = this.accountService.findAll(request);
		return ResponseEntity.status(HttpStatus.OK).body(accounts);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<AccountResponseDto> findById(@PathVariable Long id){
		AccountResponseDto account = this.accountService.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(account);
	}
	
	@GetMapping("/profile")
	@ResponseBody
	public byte[] getProfile(Long id) throws Exception {
		File file = getFile(id,"accounts");
		return IOUtils.toByteArray(new FileInputStream(file));
	}
	
	@PostMapping("/save")
	public ResponseEntity<AccountResponseDto> saveAccount(
			@RequestParam String accountRequest,
			@RequestParam(name="profileUser") MultipartFile file
			) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		AccountRequestDto account = mapper.readValue(accountRequest, AccountRequestDto.class);
		AccountResponseDto accountResponse;
		if(file != null) {
			account.setProfilePicture(file.getOriginalFilename());
			accountResponse = this.accountService.createAccount(account);
			registerFile(file,"account",accountResponse.getId());
		}else {
			accountResponse = this.accountService.createAccount(account);
		}
		//this.emailSender.sendWelcomeEmail(accountResponse.getId());
		return ResponseEntity.status(HttpStatus.CREATED).body(accountResponse);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<AccountResponseDto> update(
			@PathVariable Long id,
			@RequestParam String accountRequest,
			@RequestParam(required = false,name = "profileUser") MultipartFile file
			) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		AccountRequestDto account = mapper.readValue(accountRequest, AccountRequestDto.class);
		account.setId(id);
		AccountResponseDto accountResponse;
		if(file != null) {
			account.setProfilePicture(file.getOriginalFilename());
			accountResponse = this.accountService.updateAccount(id, account);
			updateFile(file,"account",accountResponse.getId());
		}else {
			accountResponse = this.accountService.updateAccount(id,account);
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(accountResponse);
	}
}
