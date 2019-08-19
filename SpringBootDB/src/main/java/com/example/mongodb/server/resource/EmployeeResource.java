package com.example.mongodb.server.resource;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mongodb.server.document.Employee;
import com.example.mongodb.server.document.Login;
import com.example.mongodb.server.repository.EmployeeRepository;
import com.example.mongodb.server.repository.LoginRepository;

@RestController
@RequestMapping("/employees")
public class EmployeeResource {
	
	private EmployeeRepository employeeRepository;
	private LoginRepository loginRepository;
	
	public EmployeeResource(EmployeeRepository employeeRepository, LoginRepository loginRepository) {
		this.employeeRepository = employeeRepository;
		this.loginRepository = loginRepository;
	}
	
	@GetMapping("/login")
	public List<Login> getAllLogins() {
		return loginRepository.findAll();
	}

	@GetMapping("/list")
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}
	
	@GetMapping("/byID/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable(value="id") String empid) {
		Optional<Employee> emp = employeeRepository.findById(empid);
	
		if(emp.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(emp.get());
	}
	
	@PostMapping("/add")
	public Employee createEmployee(@RequestBody Employee emp) {
		emp.setId(ObjectId.get().toString());
		return employeeRepository.save(emp);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<Employee> updateEmployee(@Valid @RequestBody Employee empDetails) {
		
		Employee emp=employeeRepository.findById(empDetails.getId().toString()).get();
		
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
		
		return ResponseEntity.ok().body(employeeRepository.save(emp));
	}
}
