package com.mongodb.codingchallengeserver.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mongodb.codingchallengeserver.model.Employee;
import com.mongodb.codingchallengeserver.repository.EmployeeRepository;

@Service
public class EmployeeDAO {

	@Autowired
	EmployeeRepository employeeRepository;
	
	/* Create */
	public Employee save(Employee emp) {
		return employeeRepository.save(emp);
	}
	
	/* Read */
	public Employee findOne(Long empid) {
		return employeeRepository.findById(empid).get();
	}
	
	/* Read All */
	public List<Employee> findAll() {
		return employeeRepository.findAll();
	}
	
	/* Delete */
	public void delete(Employee emp) {
		employeeRepository.delete(emp);
	}
}
