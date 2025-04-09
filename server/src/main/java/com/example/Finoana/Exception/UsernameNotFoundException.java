package com.example.Finoana.Exception;

@SuppressWarnings("serial")
public class UsernameNotFoundException extends RuntimeException{
	
	public UsernameNotFoundException(String message) {
		super(message);
	}

}
