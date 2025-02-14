package com.example.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Login;
import com.example.model.MarksEntry;
import com.example.repo.LoginRepo;
import com.example.service.STMService;
import com.example.util.JwtUtil;

@RestController
@CrossOrigin
public class STMController {

	@Autowired
	private LoginRepo loginRepo;
	
	@Autowired
	private STMService stmService;

	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData){
		String rollnumber = loginData.get("rollnumber");
		String password = loginData.get("password");
		
		Optional<Login> login = loginRepo.findByRollnumber(rollnumber);
		
		if (login.isPresent() && login.get().getPassword().equals(password)) {
			
			String token = jwtUtil.generateToken(rollnumber);
			
			Map<String, String> response = new HashMap<>(); 
			response.put("login", "success");
			response.put("token", token);
			response.put("role", login.get().getRole());
			response.put("rollnumber",login.get().getRollnumber());
			return ResponseEntity.ok(response);
		}
		
		Map<String, String> response = new HashMap<>();
		response.put("login", "fail");
		return ResponseEntity.status(401).body(response);
	}
	
	@PostMapping("/upload/marks")
	public ResponseEntity<?> uploadMarks(@RequestBody MarksEntry marksEntry) {
	    if (marksEntry.getRollnumber() == null || marksEntry.getRollnumber().isEmpty() ||
	        marksEntry.getTest() == null || marksEntry.getTest().isEmpty() ||
	        marksEntry.getGrade() == null || marksEntry.getGrade().isEmpty() ||
	        marksEntry.getTelugu() < 0 || marksEntry.getHindi() < 0 || marksEntry.getEnglish() < 0 ||
	        marksEntry.getMaths() < 0 || marksEntry.getScience() < 0 || marksEntry.getSocial() < 0 ||
	        marksEntry.getTotal() < 0 || marksEntry.getPercentage() < 0) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Input parameter");
	    }

	    try {
	        MarksEntry savedMarksEntry = stmService.saveMarksEntry(marksEntry);
	        return ResponseEntity.ok(savedMarksEntry);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving marks: " + e.getMessage());
	    }
	}
	
	@PostMapping("/addaccount")
	public Login AddAccount(@RequestBody Login login) {
		return stmService.AddAccounts(login);
	}
	

	@GetMapping("/admin/login/{standard}")
    public ResponseEntity<?> getRollNumbersByStandard(@PathVariable int standard) {
        List<String> rollNumbers = stmService.getRollNumbersByStandard(standard);

        if (rollNumbers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No roll numbers found for the given standard.");
        }

        return ResponseEntity.ok(rollNumbers);
    }
	@GetMapping("/{rollNumber}/{test}")
	public ResponseEntity<?> getMarksByRollNumberAndTest(
	        @PathVariable String rollNumber,
	        @PathVariable String test) {
	    List<MarksEntry> marks = stmService.getMarksByRollNumberAndTest(rollNumber, test);

	    if (marks != null && !marks.isEmpty()) {
	        return ResponseEntity.ok(marks);
	    } else {
	        return ResponseEntity.status(404).body("Marks not found for the given roll number and test.");
	    }
	}
	@GetMapping("/details/{rollnumber}")
		public List<Login> getStudentDetail(@PathVariable String rollnumber){
			return stmService.getStudentDetails(rollnumber);
		}
	@GetMapping("/admin/getdetails/{standard}")
	public List<Login> getStudentData(@PathVariable int standard) {
		return stmService.getStudentsData(standard);
	}
	
	
	@GetMapping("/admin/{standard}/{test}")
	public List<MarksEntry> getsData(@PathVariable int standard, @PathVariable String test){
		return stmService.getData(standard,test);
	}
	
	


}