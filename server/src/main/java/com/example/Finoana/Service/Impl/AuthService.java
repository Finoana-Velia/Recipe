package com.example.Finoana.Service.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.Finoana.Entity.Account;
import com.example.Finoana.Exception.UsernameNotFoundException;
import com.example.Finoana.Repository.AccountRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService implements UserDetailsService{
	
	private AccountRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String identifier) {
		Optional<Account> account = this.accountRepository.findByUsernameOrEmail(identifier);
		return account.map(user -> new User(user.getUsername(), user.getPassword(), getGrantedAuthorities(user.getRole())))
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}
	
	private List<GrantedAuthority> getGrantedAuthorities(String role) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
		return authorities;
	}

}
