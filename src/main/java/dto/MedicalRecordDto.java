package dto;

import java.time.LocalDateTime;
import java.util.List;

public class MedicalRecordDto {
// tıbbı kayıt detayları frontende iletir
    private Long id;
    private String diagnosis;
    private String treatment;
    private String notes;
    private LocalDateTime recordDate;
    private AppointmentDto appointment;
    private List<PrescriptionDto> prescriptions;

    public MedicalRecordDto() {
    }

    public MedicalRecordDto(Long id, String diagnosis, String treatment, String notes, LocalDateTime recordDate,
            AppointmentDto appointment, List<PrescriptionDto> prescriptions) {
        this.id = id;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.notes = notes;
        this.recordDate = recordDate;
        this.appointment = appointment;
        this.prescriptions = prescriptions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(LocalDateTime recordDate) {
        this.recordDate = recordDate;
    }

    public AppointmentDto getAppointment() {
        return appointment;
    }

    public void setAppointment(AppointmentDto appointment) {
        this.appointment = appointment;
    }

    public List<PrescriptionDto> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<PrescriptionDto> prescriptions) {
        this.prescriptions = prescriptions;
    }

}