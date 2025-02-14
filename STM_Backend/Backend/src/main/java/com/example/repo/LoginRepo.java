package com.example.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.model.Login;
@Repository
public interface LoginRepo extends JpaRepository<Login, Integer> {
    Optional<Login> findByRollnumber(String rollnumber);
    
    
    @Query("SELECT m FROM Login m WHERE m.rollnumber = :rollnumber")
    List<Login> findAll(@Param("rollnumber")String rollnumber);

    @Query("SELECT l.rollnumber FROM Login l WHERE l.standard = :standard")
    List<String> findRollNumbersByStandard(@Param("standard") int standard);


    @Query("SELECT s FROM Login s WHERE s.standard = :standard")
    List<Login> findByStandard(@Param("standard") int standard);
}

