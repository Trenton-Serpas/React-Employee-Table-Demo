package com.mongodb.codingchallengeserver.repository;

import com.mongodb.codingchallengeserver.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Long> {

}
