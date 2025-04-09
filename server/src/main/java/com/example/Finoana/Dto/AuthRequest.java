package com.example.Finoana.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
	
	@NotNull(message = "identifier should not be null")
	@NotBlank(message = "identifier is mandatory")
	private String username;
	@NotNull(message = "password should not be null")
	@NotBlank(message = "password is mandatory")
	private String password;

}
