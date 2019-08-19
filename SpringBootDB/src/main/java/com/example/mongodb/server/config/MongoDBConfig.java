package com.example.mongodb.server.config;

import org.bson.types.ObjectId;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.mongodb.server.document.Employee;
import com.example.mongodb.server.document.Login;
import com.example.mongodb.server.repository.EmployeeRepository;
import com.example.mongodb.server.repository.LoginRepository;

@EnableMongoRepositories(basePackageClasses = EmployeeRepository.class)
@Configuration
public class MongoDBConfig {

	@Bean
    CommandLineRunner commandLineRunner(EmployeeRepository employeeRepository, LoginRepository loginRepository) {
        return strings -> {
            //employeeRepository.save(new Employee(ObjectId.get().toString(), "Peter", "Simmons", "100 north st", "Baton Rouge", "LA", "70774", "0000000000", "0000000000", "email@email.com"));
            //employeeRepository.save(new Employee(ObjectId.get().toString(), "Sam", "Simmons", "100 north st", "Baton Rouge", "LA", "70774", "0000000000", "0000000000", "email2@email.com"));
            loginRepository.save(new Login("jsmith@mail.com", "password"));
        };
    }
	
	@Configuration
	@EnableWebMvc
	public class WebConfig implements WebMvcConfigurer {
	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	        .allowedOrigins("http://localhost:3000")
	        .allowedMethods("PUT", "DELETE","GET", "POST");
	    }
	}
}
