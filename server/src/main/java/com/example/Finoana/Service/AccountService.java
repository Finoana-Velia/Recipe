package com.example.Finoana.Service;

import com.example.Finoana.Dto.AccountRequestDto;
import com.example.Finoana.Dto.AccountResponseDto;

public interface AccountService {
	
	AccountResponseDto findById(Long id);
	AccountResponseDto createAccount(AccountRequestDto account);
	AccountResponseDto updateAccount(Long id,AccountRequestDto account);

}
