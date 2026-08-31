package services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.MedicalRecordDto;
import repository.IMedicalRecordRepository;

@Service
public class MedicalRecordServiceImpl implements IMedicalRecordService {

    @Autowired
    private IMedicalRecordRepository medicalRecordRepository;
    
    @Override
    public List<MedicalRecordDto> getRecordsByPatient(String nationalId) {
        return medicalRecordRepository.findAll()
                .stream()
                .filter(record -> record.getAppointment() != null 
                        && record.getAppointment().getPatient() != null 
                        && nationalId.equals(record.getAppointment().getPatient().getNationalId()))
                .map(record -> {
                    MedicalRecordDto dto = new MedicalRecordDto();
                    dto.setId(record.getId());
                    dto.setDiagnosis(record.getDiagnosis());
                    dto.setTreatment(record.getTreatment());
                    dto.setRecordDate(record.getRecordDate());
                    return dto;
                })
                .collect(Collectors.toList());
    }
    
 
	@Override
	public MedicalRecordDto getMedicalRecordByAppointmentId(Long appointmentId) {
		// TODO Auto-generated method stub
		return null;
	}

	
}