package com.example.Finoana.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Finoana.Dto.AccountRequestDto;
import com.example.Finoana.Dto.AccountResponseDto;
import com.example.Finoana.Service.AccountService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/accounts")
@AllArgsConstructor
public class AccountController {

	private final AccountService accountService;
	
	@GetMapping("/{id}")
	public ResponseEntity<AccountResponseDto> findById(@PathVariable Long id){
		AccountResponseDto account = this.accountService.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(account);
	}
	
	@PostMapping
	public ResponseEntity<AccountResponseDto> create(AccountRequestDto account) {
		AccountResponseDto accountCreated = this.accountService.createAccount(account);
		return ResponseEntity.status(HttpStatus.CREATED).body(accountCreated);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<AccountResponseDto> update(
			@PathVariable Long id,
			AccountRequestDto account
			) {
		AccountResponseDto accountUpdated = this.accountService.updateAccount(id, account);
		return ResponseEntity.status(HttpStatus.OK).body(accountUpdated);
	}
}
