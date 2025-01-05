package com.example.Finoana.Exception;

@SuppressWarnings("serial")
public class DuplicateEntryException extends RuntimeException {

	public DuplicateEntryException(String message) {
		super(message);
	}
}
