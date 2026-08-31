package dto;

public class PrescriptionDto {
// e recete detaylarını frontende iletir
    private Long id;
    private String medicineName;
    private String dosage;
    private Integer quantity;

    public PrescriptionDto() {
    }

    public PrescriptionDto(Long id, String medicineName, String dosage, Integer quantity) {
        this.id = id;
        this.medicineName = medicineName;
        this.dosage = dosage;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}