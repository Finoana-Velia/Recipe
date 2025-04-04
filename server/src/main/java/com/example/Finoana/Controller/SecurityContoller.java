package com.example.Finoana.Controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Finoana.Dto.AuthRequest;
import com.example.Finoana.Service.Impl.AuthService;
import com.example.Finoana.Service.Impl.JwtService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class SecurityContoller {

	private JwtService jwtService;
	private AuthenticationManager authManager;
	
	@GetMapping("/welcome")
	public String welcome() {
		return "Welcome this endpoint doesn't need auth";
	}
	
	@PostMapping("/login")
	public String authentication(@RequestBody AuthRequest auth) {
		Authentication authentication = this.authManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						auth.getUsername(),
						auth.getPassword()
				));
		if(authentication.isAuthenticated()) {
			return this.jwtService.tokenGenerator(authentication.getName());
		}else {
			throw new UsernameNotFoundException("Auth failed");
		}
	}
	
	
}
