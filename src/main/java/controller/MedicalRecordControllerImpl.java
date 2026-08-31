package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.MedicalRecordDto;
import services.IMedicalRecordService;

@RestController
@RequestMapping("/rest/api/medical-record")
public class MedicalRecordControllerImpl implements IMedicalRecordController {

    @Autowired
    private IMedicalRecordService medicalRecordService;

    @Override
    @GetMapping("/appointment/{appointmentId}")
    public MedicalRecordDto getMedicalRecordByAppointmentId(@PathVariable Long appointmentId) {
        return medicalRecordService.getMedicalRecordByAppointmentId(appointmentId);
    }
}