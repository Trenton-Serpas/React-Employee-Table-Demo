package com.mongodb.codingchallengeserver.repository;

import com.mongodb.codingchallengeserver.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
