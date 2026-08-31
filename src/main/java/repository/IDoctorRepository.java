package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import entities.Doctor;

@Repository
public interface IDoctorRepository extends JpaRepository<Doctor, Long> {
}
	
	
	
	
	
	
	
	
	

