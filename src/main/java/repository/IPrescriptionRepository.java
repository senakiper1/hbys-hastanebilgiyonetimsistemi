package repository;

import entities.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPrescriptionRepository extends JpaRepository<Prescription, Long> {

    @Query("SELECT p FROM Prescription p WHERE p.medicalRecord.appointment.patient.nationalId = :nationalId")
    List<Prescription> findByPatientNationalId(@Param("nationalId") String nationalId);
}