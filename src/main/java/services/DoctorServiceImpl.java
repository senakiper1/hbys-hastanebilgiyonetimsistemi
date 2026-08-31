package services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import entities.Doctor;
import repository.IDoctorRepository;

	@Service
	public class DoctorServiceImpl implements IDoctorService {

	    @Autowired
	    private IDoctorRepository doctorRepository;

	    @Override
	    public Doctor saveDoctor(Doctor doctor) {
	        return doctorRepository.save(doctor);
	    }

	    @Override
	    public List<Doctor> getAllDoctors() {
	        return doctorRepository.findAll();
	    }

	    @Override
	    public Doctor getDoctorById(Long id) {
	        Optional<Doctor> optional = doctorRepository.findById(id);
	        return optional.orElse(null);
	    }

	    @Override
	    public Doctor updateDoctor(Long id, Doctor doctor) {
	        Doctor dbDoctor = getDoctorById(id);
	        if (dbDoctor != null) {
	            dbDoctor.setFirstName(doctor.getFirstName());
	            dbDoctor.setLastName(doctor.getLastName());
	            dbDoctor.setDepartment(doctor.getDepartment());
	            return doctorRepository.save(dbDoctor);
	        }
	        
	        return null;
	    }

	    @Override
	    public void deleteDoctor(Long id) {
	        Doctor dbDoctor = getDoctorById(id);
	        if (dbDoctor != null) {
	            doctorRepository.delete(dbDoctor);
	        }
	    }
	    
	    @Override
	    public List<Doctor> saveAllDoctors(List<Doctor> doctors) {
	        return doctorRepository.saveAll(doctors);
	    }
	    
	}

