package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import entities.Patient;

@Repository
public interface IPatientRepository extends JpaRepository<Patient, String> {
	
}
