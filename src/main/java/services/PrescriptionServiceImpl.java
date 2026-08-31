package services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.PrescriptionDto;
import entities.Prescription;
import repository.IPrescriptionRepository;

@Service
public class PrescriptionServiceImpl implements IPrescriptionService {

    @Autowired
    private IPrescriptionRepository prescriptionRepository;

    @Override
    public List<PrescriptionDto> getPrescriptionsByPatientNationalId(String nationalId) {
        // MedicalRecord -> Patient -> NationalId ilişkisi üzerinden veritabanından reçeteler çekilir
    	List<Prescription> prescriptions = prescriptionRepository.findByPatientNationalId(nationalId);        
        List<PrescriptionDto> dtoList = new ArrayList<>();
        for (Prescription prescription : prescriptions) {
            PrescriptionDto dto = new PrescriptionDto();
            // id, medicineName, dosage, quantity alanlarını otomatik kopyalar
            BeanUtils.copyProperties(prescription, dto); 
            dtoList.add(dto);
        }
        
        return dtoList;
    }

}