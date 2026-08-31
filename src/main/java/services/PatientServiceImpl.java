package services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.CreatePatientDto;
import dto.LoginRequestDto;
import dto.PatientDto;
import entities.Patient;
import repository.IPatientRepository;

@Service
public class PatientServiceImpl implements IPatientService {

    @Autowired
    private IPatientRepository patientRepository;

    @Override
    public List<PatientDto> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientDto> dtoList = new ArrayList<>();

        for (Patient patient : patients) {
            PatientDto dto = new PatientDto();
            dto.setNationalId(patient.getNationalId());
            dto.setFirstName(patient.getFirstName());
            dto.setLastName(patient.getLastName());
            dto.setPhoneNumber(patient.getPhoneNumber());
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public PatientDto getPatientByNationalId(String nationalId) {
        Patient patient = patientRepository.findById(nationalId)
                .orElseThrow(() -> new RuntimeException("Hasta bulunamadı T.C.: " + nationalId));

        PatientDto dto = new PatientDto();
        dto.setNationalId(patient.getNationalId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setPhoneNumber(patient.getPhoneNumber());
        return dto;
    }

    @Override
    public PatientDto savePatient(CreatePatientDto createPatientDto) {
        if (patientRepository.existsById(createPatientDto.getNationalId())) {
            throw new RuntimeException("Bu T.C. Kimlik Numarası ile zaten bir hasta kayıtlı!");
        }

        Patient patient = new Patient();
        patient.setNationalId(createPatientDto.getNationalId());
        patient.setFirstName(createPatientDto.getFirstName());
        patient.setLastName(createPatientDto.getLastName());
        patient.setPhoneNumber(createPatientDto.getPhoneNumber());
        patient.setPassword(createPatientDto.getPassword());

        Patient savedPatient = patientRepository.save(patient);

        PatientDto responseDto = new PatientDto();
        responseDto.setNationalId(savedPatient.getNationalId());
        responseDto.setFirstName(savedPatient.getFirstName());
        responseDto.setLastName(savedPatient.getLastName());
        responseDto.setPhoneNumber(savedPatient.getPhoneNumber());

        return responseDto;
    }

    @Override
    public void deletePatient(String nationalId) {
        patientRepository.deleteById(nationalId);
    }

    @Override
    public List<PatientDto> saveAllPatients(List<CreatePatientDto> createPatientDtos) {
        List<Patient> patientsToSave = new ArrayList<>();

        for (CreatePatientDto dto : createPatientDtos) {
            Patient patient = new Patient();
            patient.setNationalId(dto.getNationalId());
            patient.setFirstName(dto.getFirstName());
            patient.setLastName(dto.getLastName());
            patient.setPhoneNumber(dto.getPhoneNumber());
            patient.setPassword(dto.getPassword());
            patientsToSave.add(patient);
        }

        List<Patient> savedPatients = patientRepository.saveAll(patientsToSave);

        List<PatientDto> responseDtos = new ArrayList<>();
        for (Patient patient : savedPatients) {
            PatientDto dto = new PatientDto();
            dto.setNationalId(patient.getNationalId());
            dto.setFirstName(patient.getFirstName());
            dto.setLastName(patient.getLastName());
            dto.setPhoneNumber(patient.getPhoneNumber());
            responseDtos.add(dto);
        }

        return responseDtos;
    }

    // burasina tekrar bak 
    @Override
    public PatientDto login(LoginRequestDto loginRequestDto) {
        Patient patient = patientRepository.findById(loginRequestDto.getNationalId())
                .orElseThrow(() -> new RuntimeException("T.C. Kimlik Numarası hatalı veya kayıtlı değil!"));

        if (!patient.getFirstName().equalsIgnoreCase(loginRequestDto.getFirstName())) {
            throw new RuntimeException("Girdiğiniz ad kayıtlar ile uyuşmuyor!");
        }

        if (!patient.getPassword().equals(loginRequestDto.getPassword())) {
            throw new RuntimeException("Şifreniz hatalı!");
        }

        PatientDto dto = new PatientDto();
        dto.setNationalId(patient.getNationalId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setPhoneNumber(patient.getPhoneNumber());
        return dto;
    }
}