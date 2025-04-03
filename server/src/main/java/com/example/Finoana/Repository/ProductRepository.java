package com.example.Finoana.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.Finoana.Entity.Category;
import com.example.Finoana.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

	@Query("select p from Product p where p.name like :x")
	Page<Product> findProductByName(@Param("x")String name,Pageable pageable);
	
//	@Query("select p from Product p where p.category=:category and p.name=:name")
//	Page<Product> findProductByCategory(@Param("name")String name, @Param("category")Category category, Pageable pageable);
	
	@Query("select p from Product p where p.category=:category")
	List<Product> findProductByCategory(@Param("category")Category category);
}
