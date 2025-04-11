package com.example.Finoana.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Finoana.Dto.AuthRequest;
import com.example.Finoana.Dto.AuthResponse;
import com.example.Finoana.Exception.UsernameNotFoundException;
import com.example.Finoana.Service.Impl.AuthService;
import com.example.Finoana.Service.Impl.JwtService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class SecurityContoller {

	private JwtService jwtService;
	private AuthenticationManager authManager;
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> authentication(@Valid @RequestBody AuthRequest auth) {
		Authentication authentication = this.authManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						auth.getUsername(),
						auth.getPassword()
				));
		if(authentication.isAuthenticated()) {
			//return authentication.getAuthorities()+" " + this.jwtService.tokenGenerator(authentication.getName());
			return ResponseEntity.status(HttpStatus.OK).body(
					AuthResponse.builder()
					.token(this.jwtService.tokenGenerator(authentication.getName()))
					.role(authentication.getAuthorities())
					.build()
					);
		}else {
			throw new UsernameNotFoundException("Auth failed");
		}
	}

	
	
	
	
}
