package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import entities.Doctor;
import services.IDoctorService;

@RestController
@RequestMapping("/rest/api/doctor")
public class DoctorControllerImpl implements IDoctorController {

    @Autowired
    private IDoctorService doctorService;

    @PostMapping("/save")
    @Override
    public Doctor saveDoctor(@RequestBody Doctor doctor) {
        return doctorService.saveDoctor(doctor);
    }

    @GetMapping("/list")
    @Override
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/list/{id}")
    @Override
    public Doctor getDoctorById(@PathVariable(name = "id") Long id) {
        return doctorService.getDoctorById(id);
    }

    @PutMapping("/update/{id}")
    @Override
    public Doctor updateDoctor(@PathVariable(name = "id") Long id, @RequestBody Doctor doctor) {
        return doctorService.updateDoctor(id, doctor);
    }

    @DeleteMapping("/delete/{id}")
    @Override
    public void deleteDoctor(@PathVariable(name = "id") Long id) {
        doctorService.deleteDoctor(id);
    }
    @PostMapping("/save-all")
    @Override
    public List<Doctor> saveAllDoctors(@RequestBody List<Doctor> doctors) {
        return doctorService.saveAllDoctors(doctors);
    }
}