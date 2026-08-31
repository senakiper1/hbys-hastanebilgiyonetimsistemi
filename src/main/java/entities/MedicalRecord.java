package entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String diagnosis;
    private String treatment;
    private String notes;
    private LocalDateTime recordDate;

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;
    // muayene kaydı dogrudan 1 randevuya baglıdır

    @OneToMany(mappedBy = "medicalRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Prescription> prescriptions = new ArrayList<>();
    // 1 muayene kaydına birden fazla receteli ilac yazılabilir
    
    public MedicalRecord() {
    }

    public MedicalRecord(Long id, String diagnosis, String treatment, String notes, LocalDateTime recordDate,
            Appointment appointment) {
        this.id = id;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.notes = notes;
        this.recordDate = recordDate;
        this.appointment = appointment;
    }


    /**
     * Reçete ekleme yardımcısı:
     * Listeye reçete eklerken, eklenen Reçetenin de medicalRecord alanını bu nesneye bağlar.
     */
    public void addPrescription(Prescription prescription) {
        if (prescription != null) {
            prescriptions.add(prescription);
            prescription.setMedicalRecord(this);
        }
    }

    /**
     * Reçete çıkarma yardımcısı:
     * Listeden reçete çıkarırken, çıkarılan Reçetenin medicalRecord bağını koparır.
     * orphanRemoval = true olduğu için bu reçete DB'den de silinir.
     */
    public void removePrescription(Prescription prescription) {
        if (prescription != null) {
            prescriptions.remove(prescription);
            prescription.setMedicalRecord(null);
        }
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

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public List<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }
}