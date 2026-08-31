package dto;

import java.util.List;

public class CreateMedicalRecordDto {

    private Long appointmentId;
    private String diagnosis;
    private String treatment;
    private String notes;
    private List<PrescriptionDto> prescriptions;

    public CreateMedicalRecordDto() {
    }

    public CreateMedicalRecordDto(Long appointmentId, String diagnosis, String treatment, String notes,
            List<PrescriptionDto> prescriptions) {
        this.appointmentId = appointmentId;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.notes = notes;
        this.prescriptions = prescriptions;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
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

    public List<PrescriptionDto> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<PrescriptionDto> prescriptions) {
        this.prescriptions = prescriptions;
    }
}