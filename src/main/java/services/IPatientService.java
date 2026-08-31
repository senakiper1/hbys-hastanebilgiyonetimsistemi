package services;

import java.util.List;
import dto.CreatePatientDto;
import dto.LoginRequestDto;
import dto.PatientDto;

public interface IPatientService {
    List<PatientDto> getAllPatients();
    PatientDto getPatientByNationalId(String nationalId);
    PatientDto savePatient(CreatePatientDto createPatientDto);
    void deletePatient(String nationalId);
    List<PatientDto> saveAllPatients(List<CreatePatientDto> createPatientDtos);
    PatientDto login(LoginRequestDto loginRequestDto);
}