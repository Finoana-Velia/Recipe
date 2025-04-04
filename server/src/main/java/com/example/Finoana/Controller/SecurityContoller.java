package com.example.Finoana.Controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Finoana.Service.Impl.AuthService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class SecurityContoller {

	private AuthService authService;
	private AuthenticationManager authManager;
	
	@GetMapping("/welcome")
	public String welcome() {
		return "Welcome this endpoint doesn't need auth";
	}
	
	
}
