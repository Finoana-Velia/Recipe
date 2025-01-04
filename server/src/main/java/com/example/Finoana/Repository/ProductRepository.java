package com.example.Finoana.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Finoana.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

	Page<Product> findProductByName(String name,Pageable pageable);
}
