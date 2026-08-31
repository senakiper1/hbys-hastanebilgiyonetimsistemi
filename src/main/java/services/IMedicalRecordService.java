package services;

import java.util.List;

import dto.MedicalRecordDto;

public interface IMedicalRecordService {
    MedicalRecordDto getMedicalRecordByAppointmentId(Long appointmentId);

	List<MedicalRecordDto> getRecordsByPatient(String nationalId);

	
}