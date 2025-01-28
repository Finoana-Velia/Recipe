package com.example.Finoana.Controller;

import java.io.File;
import java.io.FileInputStream;

import org.apache.commons.io.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Finoana.Dto.ChefRequestDto;
import com.example.Finoana.Dto.ChefResponseDto;
import com.example.Finoana.Service.ChefService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static com.example.Finoana.Core.FileManagement.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/chefs")
public class ChefController {
	
	private ChefService chefService;
	
	@GetMapping
	public ResponseEntity<Page<ChefResponseDto>> searchChefByName(
			@RequestParam(defaultValue="")String name,
			@RequestParam(defaultValue="0")int page,
			@RequestParam(defaultValue="10")int size
			){
		PageRequest request = PageRequest.of(page,size != 0 ? size : Integer.MAX_VALUE);
		Page<ChefResponseDto> response = this.chefService.searchChefByName("%"+name+"%", request);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ChefResponseDto> findById(@PathVariable Long id){
		ChefResponseDto chef = this.chefService.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(chef);
	}
	
	@GetMapping("/profile")
	@ResponseBody
	public byte[] getImage(Long id) throws Exception {
		File file = getFile(id,"chefs");
		return IOUtils.toByteArray(new FileInputStream(file));
	}
	
	@PostMapping
	public ResponseEntity<ChefResponseDto> createChef(
			ChefRequestDto chef,
			@RequestParam MultipartFile file) throws Exception{
		ChefResponseDto chefResponse;
		if(!file.isEmpty()) {
			chef.setProfile(file.getOriginalFilename());
			chefResponse = this.chefService.createChef(chef);
			registerFile(file,"chefs",chefResponse.getId());
		}else {
			chefResponse = this.chefService.createChef(chef);
		}
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(chefResponse);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ChefResponseDto> updateChef(
			@PathVariable Long id,
			ChefRequestDto chef,
			@RequestParam(required = false) MultipartFile file
			) throws Exception{
		chef.setId(id);
		ChefResponseDto chefResponse;
		if(!file.isEmpty()) {
			chef.setProfile(file.getOriginalFilename());
			chefResponse = this.chefService.updateChef(id, chef);
			updateFile(file,"chefs",id);
		}else {
			chefResponse = this.chefService.updateChef(id, chef);
		}
		return ResponseEntity.status(HttpStatus.OK).body(chefResponse);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(Long id){
		this.chefService.deleteById(id);
		log.warn("Chef with id " + id + " has been deleted");
		deleteFile(id,"chefs");
		return null;
	}

}
