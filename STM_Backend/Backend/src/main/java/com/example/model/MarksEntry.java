package com.example.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="marks")
public class MarksEntry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int sno;
	private String rollnumber;
	private String test;
	private int telugu;
	private int hindi;
	private int english;
	private int maths;
	private int science;
	private int social;
	private int total;
	private int percentage;
	private int standard;
	private String grade;
}
