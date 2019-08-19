package com.example.mongodb.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.mongodb.server.document.Login;

public interface LoginRepository extends MongoRepository<Login, Integer>{

}
