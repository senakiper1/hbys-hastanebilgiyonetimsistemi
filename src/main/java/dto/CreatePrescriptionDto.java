package dto;

public class CreatePrescriptionDto {

	private String medicineName;
	private String dosage;
	private Integer quantity;
	private Long medicalRecordId;
	
	public CreatePrescriptionDto() {
		
	}
	
	public String getMedicineName() {
		return medicineName;
	}
	
	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}
	
	public String getDosage() {
		return dosage;
	}
	
	public void setDosage(String dosage) {
		this.dosage = dosage;
	}
	
	public Integer getQuantity() {
		return quantity;
	}
	
	public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getMedicalRecordId() {
        return medicalRecordId;
    }

    public void setMedicalRecordId(Long medicalRecordId) {
        this.medicalRecordId = medicalRecordId;
    }
	
}
