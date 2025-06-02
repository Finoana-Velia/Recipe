package com.example.Finoana.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Finoana.Dto.AccountRequestDto;
import com.example.Finoana.Dto.AccountResponseDto;

public interface AccountService {
	
	Page<AccountResponseDto> findAll(Pageable request);
	AccountResponseDto findById(Long id);
	AccountResponseDto createAccount(AccountRequestDto account);
	AccountResponseDto updateAccount(Long id,AccountRequestDto account);
	AccountResponseDto addProductFavorite(Long idUser,Long idProduct);
	AccountResponseDto retireProductFavorite(Long idUser, Long idProduct);

}
