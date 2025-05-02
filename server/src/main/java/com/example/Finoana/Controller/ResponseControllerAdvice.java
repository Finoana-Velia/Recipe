package com.example.Finoana.Controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

import com.example.Finoana.Core.ErrorResponse;
import com.example.Finoana.Core.ErrorType;
import com.example.Finoana.Exception.NotAuthorizedException;
import com.example.Finoana.Exception.ResourceNotFoundException;
import com.example.Finoana.Exception.UsernameNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestControllerAdvice
public class ResponseControllerAdvice {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException exception) {
		Map<String, String> errorMessage = new HashMap<>();
		errorMessage.put("error", exception.getMessage());
		ErrorResponse errorResponse = ErrorResponse.builder()
				.statusCode(404)
				.errorType(ErrorType.RESOURCE_NOT_FOUND)
				.details(errorMessage)
				.suggestion("Please make sure that informations you have entered are correct")
				.timeStamp(LocalDateTime.now())
				.build();
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(errorResponse);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> methodInvalid(MethodArgumentNotValidException exception){
		Map<String , String> errors = new HashMap<>();
		exception.getBindingResult().getFieldErrors()
		.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
		ErrorResponse errorResponse = ErrorResponse.builder()
				.statusCode(400)
				.errorType(ErrorType.INPUT_MISMATCH)
				.details(errors)
				.suggestion("Make sure that all datas are corrects")
				.timeStamp(LocalDateTime.now())
				.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
	}
	
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ErrorResponse> inputValidationException(ConstraintViolationException exception) {
		Map<String , String> errorMessage = new HashMap<>();
		exception.getConstraintViolations()
		.forEach(error -> errorMessage.put(String.valueOf(error.getPropertyPath()), error.getMessageTemplate()));
		ErrorResponse errorResponse = ErrorResponse.builder()
				.statusCode(400)
				.details(errorMessage)
				.errorType(ErrorType.INPUT_MISMATCH)
				.suggestion(exception.getMessage())
				.timeStamp(LocalDateTime.now())
				.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
	}
	
	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUserNotFound(UsernameNotFoundException exception) {
		Map<String , String> errorMessage = new HashMap<>();
		errorMessage.put("error", exception.getMessage());
		ErrorResponse errorResponse = ErrorResponse.builder()
				.statusCode(404)
				.errorType(ErrorType.RESOURCE_NOT_FOUND)
				.details(errorMessage)
				.suggestion("Make sure that your identifier and passord are correct")
				.timeStamp(LocalDateTime.now())
				.build();		
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
	}
	
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ErrorResponse> illegalArgumentException(IllegalArgumentException exception){
		Map<String , String> errorMessage = new HashMap<>();
		errorMessage.put("error", exception.getMessage());
		
		ErrorResponse errorResponse = ErrorResponse.builder()
				.statusCode(400)
				.errorType(ErrorType.INPUT_MISMATCH)
				.details(errorMessage)
				.suggestion("Make sure that all informations that you have entered are corrects")
				.timeStamp(LocalDateTime.now())
				.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
		
	}
	
	@ExceptionHandler(IOException.class)
	public ResponseEntity<ErrorResponse> ioException(IOException exception) {
		Map<String, String> errorMessage = new HashMap<>();
		errorMessage.put("error", exception.getMessage());
		ErrorResponse errorResponse = ErrorResponse.builder()
				.statusCode(400)
				.errorType(ErrorType.FILE_UPLOAD_ERROR)
				.details(errorMessage)
				.suggestion("Please ensure that your file match with these requirements : " +
                        "its size must be smaller than or equal than 10MB;" +
                        " its extension must be one of these : pdf, jpg, jpeg, png, text, docs or xlsx")
                .timeStamp(LocalDateTime.now())
				.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
	}
	
	@ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> badCredentialsException() {
        Map<String, String> errorMessage = new HashMap<>();
        errorMessage.put("error", "Nom d'utilisateur ou mot de passe incorrect");
        ErrorResponse errorResponse = ErrorResponse.builder()
                .statusCode(401)
                .errorType(ErrorType.INPUT_MISMATCH)
                .details(errorMessage)
                .suggestion("Please ensure that the information you have entered are corrects")
                .timeStamp(LocalDateTime.now())
                .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorResponse);
    }
	
	@ExceptionHandler(JsonProcessingException.class)
	public ResponseEntity<ErrorResponse> jsonPressessing(JsonProcessingException exception) {
		Map<String, String> errorMessage = new HashMap<>();
		errorMessage.put("error", exception.getMessage());
		
		ErrorResponse errorResponse = ErrorResponse.builder()
				.statusCode(500)
				.errorType(ErrorType.INTERNAL_ERROR)
				.details(errorMessage)
				.suggestion("Internal error from the server")
				.timeStamp(LocalDateTime.now())
				.build();
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
	}
	
	@ExceptionHandler(JsonMappingException.class)
	public ResponseEntity<ErrorResponse> handleGeneric(JsonMappingException exception) {
		Map<String, String> errorMessage = new HashMap<>();
		errorMessage.put("error", exception.getMessage());
		
		ErrorResponse errorResponse = ErrorResponse.builder()
				.statusCode(500)
				.errorType(ErrorType.INTERNAL_ERROR)
				.details(errorMessage)
				.suggestion("Internal error from the server")
				.timeStamp(LocalDateTime.now())
				.build();
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
	}
	
	
	
	

}

