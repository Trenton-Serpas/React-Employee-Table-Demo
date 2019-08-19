package com.example.mongodb.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.mongodb.server.document.Employee;

public interface EmployeeRepository extends MongoRepository<Employee, String>{

}
