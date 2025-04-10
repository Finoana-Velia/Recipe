package com.example.Finoana.Configuration;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.Finoana.Exception.CustomAccessDeniedHandler;
import com.example.Finoana.Exception.CustomAuthenticationEntryPoint;
import com.example.Finoana.Util.JwtAuthFilter;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {
	
	private JwtAuthFilter authFilter;
	private final CustomAccessDeniedHandler accessDeniedHandler;
	private final CustomAuthenticationEntryPoint authEntryPoint;

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(auth -> {
					auth.requestMatchers("/auth/login","/api/v1/accounts/save").permitAll();
//					auth.requestMatchers("/api/v1/products","/api/v1/products/image").hasRole("USER");
//					auth.requestMatchers("/api/v1/chefs","/api/v1/chefs/profile").hasRole("ADMIN");
					auth.requestMatchers("/api/v1/products", "/api/v1/products/image").permitAll();
					auth.requestMatchers("/api/v1/chefs","/api/v1/chefs/profile").permitAll();
					auth.anyRequest().authenticated();
				})
				.exceptionHandling(ex -> ex
		                .authenticationEntryPoint(this.authEntryPoint)
		                .accessDeniedHandler(this.accessDeniedHandler)
		        )
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(this.authFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
	
	@Bean
	AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}
