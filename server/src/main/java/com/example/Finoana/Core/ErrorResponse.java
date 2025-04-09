package com.example.Finoana.Core;

import java.time.LocalDateTime;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Builder;

@Builder
public record ErrorResponse(
		int statusCode,
		ErrorType errorType,
		Map<String, String> details,
		String suggestion,
		LocalDateTime timeStamp
		) {
	
	public String toString() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return "{\n" +
					"\"statusCode\" : " + statusCode + ",\n" +
					"\"errorType\" : \"" + errorType + "\",\n" +
					"\"details\" : " + mapper.writeValueAsString(details) + ",\n" +
					"\"suggestion\" : \"" + suggestion + "\",\n" +
					"\"timeStamp\" : " + timeStamp + ",\n"
					+ "}";
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "{\n" +
		"\"statusCode\" : " + 500 + ",\n" +
		"\"errorType\" : \"" + ErrorType.INTERNAL_ERROR + "\",\n" +
		"\"details\" : \" Internal server error \",\n" +
		"\"timeStamp\" : " + timeStamp + ",\n"
		+ "}";
	}
}
