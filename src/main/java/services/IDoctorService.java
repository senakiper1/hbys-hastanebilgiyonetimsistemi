package services;

import java.util.List;
import entities.Doctor;

public interface IDoctorService {
    Doctor saveDoctor(Doctor doctor);
    List<Doctor> getAllDoctors();
    Doctor getDoctorById(Long id);
    Doctor updateDoctor(Long id, Doctor doctor);
    void deleteDoctor(Long id);
    List<Doctor> saveAllDoctors(List<Doctor> doctors);
}