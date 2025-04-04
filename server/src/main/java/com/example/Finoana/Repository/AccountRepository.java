package com.example.Finoana.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Finoana.Entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long>{
	
	@Query("select a from Account a where a.username=:identifier or a.contact.email=:identifier")
	Optional<Account> findByUsernameOrEmail(String identifier);

}
