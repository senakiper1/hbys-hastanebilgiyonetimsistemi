package services;

import java.util.List;

import dto.PrescriptionDto;

public interface IPrescriptionService {
    
   
    // Hastanın TC Kimlik No'suna göre reçetelerini getirmek için
    List<PrescriptionDto> getPrescriptionsByPatientNationalId(String nationalId);
    
}