package services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.DashboardSummaryDto;
import repository.IAppointmentRepository;
import repository.IDoctorRepository;
import repository.IMedicalRecordRepository;
import repository.IPatientRepository;

@Service
public class AnalyticsServiceImpl implements IAnalyticsService {

    @Autowired
    private IAppointmentRepository appointmentRepository;

    @Autowired
    private IPatientRepository patientRepository;

    @Autowired
    private IDoctorRepository doctorRepository;

    @Autowired
    private IMedicalRecordRepository medicalRecordRepository;

    @Override
    public DashboardSummaryDto getSummary() {
        long totalPatients = patientRepository.count();
        long totalDoctors = doctorRepository.count();
        long totalAppointments = appointmentRepository.count();
        long totalMedicalRecords = medicalRecordRepository.count();

        return new DashboardSummaryDto(totalPatients, totalDoctors, totalAppointments, totalMedicalRecords);
    }
}
