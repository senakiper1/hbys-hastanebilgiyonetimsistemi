package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import entities.Appointment;

@Repository
public interface IAppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientNationalId(String patientNationalId);
}