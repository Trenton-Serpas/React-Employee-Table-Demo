package com.mongodb.codingchallengeserver.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.codingchallengeserver.dao.EmployeeDAO;
import com.mongodb.codingchallengeserver.dao.LoginDAO;
import com.mongodb.codingchallengeserver.model.Employee;
import com.mongodb.codingchallengeserver.model.Login;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
	
	@Autowired
	EmployeeDAO employeeDAO;
	
	@Autowired
	LoginDAO loginDAO;
	
	/* get all logins */
	@GetMapping("/login")
	public List<Login> getAllLogins() {
		return loginDAO.findAll();
	}
	
	/* get all employees */
	@GetMapping("/list")
	public List<Employee> getAllEmployees() {
		return employeeDAO.findAll();
	}
	
	/* get employee by empid */
	@GetMapping("/byID/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable(value="id") Long empid) {
		
		Employee emp=employeeDAO.findOne(empid);
		
		if(emp==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(emp);
	}
	
	/* to save an employee */
	@PostMapping("/add")
	public Employee createEmployee(@Valid @RequestBody Employee emp) {
		return employeeDAO.save(emp);
	}
	
	/* update an employee by empid */
	@PutMapping("/edit")
	public ResponseEntity<Employee> updateEmployee(@Valid @RequestBody Employee empDetails) {
		
		Employee emp=employeeDAO.findOne(empDetails.getId());
		
		if(emp==null) {
			return ResponseEntity.notFound().build();
		}
		
		emp.setFirstName(empDetails.getFirstName());
		emp.setLastName(empDetails.getLastName());
		emp.setAddress(empDetails.getAddress());
		emp.setCity(empDetails.getCity());
		emp.setState(empDetails.getState());
		emp.setZip(empDetails.getZip());
		emp.setCellPhone(empDetails.getCellPhone());
		emp.setHomePhone(empDetails.getHomePhone());
		emp.setEmail(empDetails.getEmail());
		
		return ResponseEntity.ok().body(employeeDAO.save(emp));
	}
	
	/* Delete an employee 
	 * Should be unused */
	@DeleteMapping("/employees/delete/{id}")
	public ResponseEntity<Employee> deleteEmployee(@PathVariable(value="id") Long empid) {
		
		Employee emp=employeeDAO.findOne(empid);
		
		if(emp==null) {
			return ResponseEntity.notFound().build();
		}
		
		employeeDAO.delete(emp);
		
		return ResponseEntity.ok().build();
	}
}

