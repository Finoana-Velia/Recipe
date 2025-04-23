package com.example.Finoana.Service.Impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.Finoana.Configuration.CryptConfig;
import com.example.Finoana.Dto.AccountRequestDto;
import com.example.Finoana.Dto.AccountResponseDto;
import com.example.Finoana.Entity.Account;
import com.example.Finoana.Exception.ResourceNotFoundException;
import com.example.Finoana.Repository.AccountRepository;
import com.example.Finoana.Service.AccountService;
import static com.example.Finoana.Core.EntityMapper.*;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService{
	
	private AccountRepository accountRepository;
	private final CryptConfig passwordEncoder; 

	@Override
	public AccountResponseDto findById(Long id) {
		return this.accountRepository.findById(id)
				.map(account -> toDto(account,AccountResponseDto.class))
				.orElseThrow(
						() -> new ResourceNotFoundException("Account : " + id + " not found")
						);
	}

	@Override
	public AccountResponseDto createAccount(AccountRequestDto account) {
		String passwordHashed = this.passwordEncoder.passwordEncoder().encode(account.getPassword());
		Account accountEntity = toEntity(account,Account.class);
		accountEntity.setPassword(passwordHashed);
		accountEntity.setCreatedAt(LocalDateTime.now());
		return toDto(this.accountRepository.save(accountEntity),AccountResponseDto.class);
	}

	@Override
	public AccountResponseDto updateAccount(Long id, AccountRequestDto account) {
		return this.accountRepository.findById(id)
				.map(accountFound -> {
					Account accountEntity = toEntity(account,Account.class);
					if(accountEntity.getProfilePicture() == null) {
						accountEntity.setProfilePicture(accountFound.getProfilePicture());
					}
					accountEntity.setCreatedAt(accountFound.getCreatedAt());
					accountEntity.setUpdatedAt(LocalDateTime.now());
					Account accountSaved = this.accountRepository.save(accountEntity);
					return toDto(accountSaved,AccountResponseDto.class);
				})
				.orElseThrow(
						() -> new ResourceNotFoundException("Account : " + id + " not found")
						);
	}

	@Override
	public Page<AccountResponseDto> findAll(Pageable request) {
		return this.accountRepository.findAll(request).map(
				account -> toDto(account,AccountResponseDto.class)
				);
	}

}
