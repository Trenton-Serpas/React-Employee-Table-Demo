package com.mongodb.codingchallengeserver.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mongodb.codingchallengeserver.model.Login;
import com.mongodb.codingchallengeserver.repository.LoginRepository;

@Service
public class LoginDAO {

	@Autowired
	LoginRepository loginRepository;
	
	/* Create */
	public Login save(Login emp) {
		return loginRepository.save(emp);
	}
	
	/* Read */
	public Login findOne(Long empid) {
		return loginRepository.findById(empid).get();
	}
	
	/* Read All */
	public List<Login> findAll() {
		return loginRepository.findAll();
	}
	
	/* Update */
	
	/* Delete */
	public void delete(Login emp) {
		loginRepository.delete(emp);
	}
}
