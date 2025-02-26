package com.example.Finoana.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OperationType {
	CREATE("New"),
	UPDATE("has changed"),
	DELETE("anymore");
	
	private final String value;
}
