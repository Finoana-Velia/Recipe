package com.example.Finoana.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.Finoana.Entity.Chef;

public interface ChefRepository extends JpaRepository<Chef, Long>{
	
	@Query("select c from Chef c where c.name like :name")
	public Page<Chef> searchChefByName(@Param("name")String name, Pageable pageable);

}
