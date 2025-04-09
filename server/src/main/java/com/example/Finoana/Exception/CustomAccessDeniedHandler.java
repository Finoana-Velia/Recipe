package com.example.Finoana.Exception;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.example.Finoana.Core.ErrorResponse;
import com.example.Finoana.Core.ErrorType;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler{

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.setContentType("application/json");
		response.getWriter().write(mapErrorResponse(accessDeniedException));
	}
	
	private String mapErrorResponse(AccessDeniedException accessDeniedException) {
		Map<String , String> errorMessage = new HashMap<>();
		errorMessage.put("error", accessDeniedException.getMessage());
		ErrorResponse errorResponse = ErrorResponse.builder()
				.statusCode(403)
				.errorType(ErrorType.NOT_AUTHORIZED)
				.details(errorMessage)
				.suggestion("You can't access to this resource due to your role try something else")
				.timeStamp(LocalDateTime.now())
				.build();
		return errorResponse.toString();
		
	}

}
