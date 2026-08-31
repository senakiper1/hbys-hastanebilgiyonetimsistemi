package controller;

import dto.MedicalRecordDto;

public interface IMedicalRecordController {
    MedicalRecordDto getMedicalRecordByAppointmentId(Long appointmentId);
}