package entities;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "appointment_date")
    private LocalDateTime appointmentDate;

    private String status;

    @ManyToOne
    @JoinColumn(name = "patient_national_id", referencedColumnName = "national_id")
    private Patient patient;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    
    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
    private MedicalRecord medicalRecord;

    public Appointment() {
    }

    public Long getId() { 
        return id; 
    }
    
    public void setId(Long id) { 
        this.id = id; 
    }

    public LocalDateTime getAppointmentDate() { 
        return appointmentDate; 
    }
    
    public void setAppointmentDate(LocalDateTime appointmentDate) { 
        this.appointmentDate = appointmentDate; 
    }

    public String getStatus() { 
        return status; 
    }
    
    public void setStatus(String status) { 
        this.status = status; 
    }

    public Patient getPatient() { 
        return patient; 
    }
    
    public void setPatient(Patient patient) { 
        this.patient = patient; 
    }

    public Doctor getDoctor() { 
        return doctor; 
    }
    
    public void setDoctor(Doctor doctor) { 
        this.doctor = doctor; 
    }

    public MedicalRecord getMedicalRecord() { 
        return medicalRecord; 
    }

    public void setMedicalRecord(MedicalRecord medicalRecord) {
        if (medicalRecord == null) {
            if (this.medicalRecord != null) {
                this.medicalRecord.setAppointment(null);
            }
        } else {
            medicalRecord.setAppointment(this);
        }
        this.medicalRecord = medicalRecord;
    }
}
