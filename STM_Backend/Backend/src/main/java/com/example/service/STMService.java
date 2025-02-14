package com.example.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.model.Login;
import com.example.model.MarksEntry;
import com.example.repo.LoginRepo;
import com.example.repo.MarksEntryRepo;

@Service
public class STMService {
	
	@Autowired
	private LoginRepo loginRepo;
	
	@Autowired
	private  MarksEntryRepo marksEntryRepo;
	
	public Optional<Login> updateLogin(int id, Login updatedLogin) {
        Optional<Login> existingLogin = loginRepo.findById(id);

        if (existingLogin.isPresent()) {
            Login login = existingLogin.get();
            if (updatedLogin.getRollnumber() != null) {
                login.setRollnumber(updatedLogin.getRollnumber());
            }
            if (updatedLogin.getPassword() != null) {
                login.setPassword(updatedLogin.getPassword());
            }
            if (updatedLogin.getRole() != null) {
                login.setRole(updatedLogin.getRole());
            }
            
            loginRepo.save(login);
            return Optional.of(login);
        }
        return Optional.empty();
    }
	public MarksEntry saveMarksEntry(MarksEntry marksEntry) {
	    try {
	        return marksEntryRepo.save(marksEntry);
	    } catch (Exception e) {
	        throw new RuntimeException("Error saving Marks to database: " + e.getMessage());
	    }
	}
	
	public Login AddAccounts(Login login) {
		return loginRepo.save(login);
	}


	public List<String> getRollNumbersByStandard(int standard) {
        return loginRepo.findRollNumbersByStandard(standard);
    }
	
	public List<Login> getStudentsData(int standard){
		List<Login> details =  loginRepo.findByStandard(standard);
		return details;
	}

	public List<MarksEntry> getMarksByRollNumberAndTest(String rollNumber, String test) {
	    List<MarksEntry> marksEntries = marksEntryRepo.findAll(rollNumber, test);
	    if (marksEntries.isEmpty()) {
	        return null;
	    }
	    return marksEntries;
	}
	public List<Login> getStudentDetails(String rollnumber){
		List<Login> details =  loginRepo.findAll(rollnumber);
		return details;
	}
	
	public List<MarksEntry> getData(int standard,String test){
		List<MarksEntry> details = marksEntryRepo.findData(standard, test);
		return details;
	}
}
