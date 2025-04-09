package com.example.Finoana.Exception;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.example.Finoana.Core.ErrorResponse;
import com.example.Finoana.Core.ErrorType;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint{

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		response.setStatus((HttpServletResponse.SC_UNAUTHORIZED));
		response.setContentType("application/json");
		response.getWriter().write(writeErrorResponse(authException.getMessage()));
	}
	
	private String writeErrorResponse(String exception) {
		Map<String , String> errorMessage = new HashMap<>();
		errorMessage.put("error", exception);
		ErrorResponse errorResponse = ErrorResponse.builder()
				.statusCode(401)
				.errorType(ErrorType.AUTHENTICATION_NEED)
				.details(errorMessage)
				.suggestion("Connect with an account to access this resources")
				.timeStamp(LocalDateTime.now())
				.build();
		return errorResponse.toString();
	}

}
