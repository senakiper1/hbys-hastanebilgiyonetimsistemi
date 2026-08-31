package services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.AppointmentDto;
import dto.CreateAppointmentDto;
import entities.Appointment;
import entities.Doctor;
import entities.Patient;
import jakarta.transaction.Transactional;
import repository.IAppointmentRepository;
import repository.IDoctorRepository;
import repository.IPatientRepository;

@Service
public class AppointmentServiceImpl implements IAppointmentService {

    @Autowired
    private IAppointmentRepository appointmentRepository;

    @Autowired
    private IPatientRepository patientRepository;

    @Autowired
    private IDoctorRepository doctorRepository;

    @Override
    @Transactional
    public void deleteAppointment(Long id) { 
        appointmentRepository.deleteById(id);
    }

    @Override
    public AppointmentDto createAppointment(CreateAppointmentDto dto) {
        Patient patient = patientRepository.findById(dto.getPatientNationalId())
                .orElseThrow(() -> new RuntimeException("Hasta bulunamadı!"));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doktor bulunamadı!"));

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setStatus("ACTIVE");

        Appointment saved = appointmentRepository.save(appointment);

        // Dönüş DTO'su oluşturma
        AppointmentDto responseDto = new AppointmentDto();
        responseDto.setId(saved.getId());
        responseDto.setAppointmentDate(saved.getAppointmentDate());
        responseDto.setStatus(saved.getStatus());
        responseDto.setPatientNationalId(patient.getNationalId());
        responseDto.setDoctorId(doctor.getId());
        
        // Doktorun ad-soyad ve bölümünü birleştirip DTO'ya set ediyoruz:
        responseDto.setDoctorName(doctor.getFirstName() + " " + doctor.getLastName());
        responseDto.setDepartment(doctor.getDepartment());

        return responseDto;
    }

    @Override
    public List<AppointmentDto> getAppointmentsByPatientNationalId(String nationalId) {
        return appointmentRepository.findByPatientNationalId(nationalId)
                .stream()
                .map(app -> {
                    AppointmentDto dto = new AppointmentDto();
                    dto.setId(app.getId());
                    dto.setAppointmentDate(app.getAppointmentDate());
                    dto.setStatus(app.getStatus());
                    
                    if (app.getPatient() != null) {
                        dto.setPatientNationalId(app.getPatient().getNationalId());
                    }
                    
                    if (app.getDoctor() != null) {
                        dto.setDoctorId(app.getDoctor().getId());
                        // Veritabanındaki ilişkili doktor nesnesinden ad-soyad ve bölüm bilgisini çekiyoruz:
                        dto.setDoctorName(app.getDoctor().getFirstName() + " " + app.getDoctor().getLastName());
                        dto.setDepartment(app.getDoctor().getDepartment());
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }
}