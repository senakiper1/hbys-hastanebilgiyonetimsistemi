package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.CreatePatientDto;
import dto.LoginRequestDto;
import dto.PatientDto;
import services.IPatientService;

// dıs dunyadan gelen http isteklerini karsılar ve service katmanına yonlendirir

@RestController
@RequestMapping("/rest/api/patient")
public class PatientControllerImpl {

    @Autowired
    private IPatientService patientService;

    @PostMapping("/login")
    public PatientDto login(@RequestBody LoginRequestDto loginRequestDto) {
        return patientService.login(loginRequestDto);
    }

    @PostMapping("/save")
    public PatientDto savePatient(@RequestBody CreatePatientDto createPatientDto) {
        return patientService.savePatient(createPatientDto);
    }

    @PostMapping("/save-all")
    public List<PatientDto> saveAllPatients(@RequestBody List<CreatePatientDto> createPatientDtos) {
        return patientService.saveAllPatients(createPatientDtos);
    }

    @GetMapping("/list")
    public List<PatientDto> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{nationalId}")
    public PatientDto getPatientByNationalId(@PathVariable String nationalId) {
        return patientService.getPatientByNationalId(nationalId);
    }

    @DeleteMapping("/delete/{nationalId}")
    public void deletePatient(@PathVariable String nationalId) {
        patientService.deletePatient(nationalId);
    }
}