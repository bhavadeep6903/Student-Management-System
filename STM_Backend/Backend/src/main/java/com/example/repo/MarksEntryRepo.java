package com.example.repo;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.example.model.MarksEntry;
@Repository
public interface MarksEntryRepo extends JpaRepository<MarksEntry, Integer> {
	@Query("SELECT m FROM MarksEntry m WHERE m.rollnumber = :rollnumber AND m.test = :test")
	List<MarksEntry> findAll(@Param("rollnumber") String rollnumber, @Param("test") String test);
	
	@Query("SELECT m FROM MarksEntry m WHERE m.standard = :standard AND m.test = :test")
	List<MarksEntry> findData(@Param("standard") int standard, @Param("test") String test);
}
