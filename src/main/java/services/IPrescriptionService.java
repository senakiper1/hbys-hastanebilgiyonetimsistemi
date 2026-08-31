package services;

import java.util.List;

import dto.PrescriptionDto;

public interface IPrescriptionService {
    
       List<PrescriptionDto> getPrescriptionsByPatientNationalId(String nationalId);
    
}
