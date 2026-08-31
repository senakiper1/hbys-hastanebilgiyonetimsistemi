package dto;
// entity nesnelerini dogrudan dıs dunyaya acmamak 
// hassas verileri gizlemek
// istemciden sadece gerekli alanlari almak icin 

public class PatientDto {
// istemciye dönen hasta verisi (icinde password yok)
    private String nationalId;   // T.C. Kimlik No
    private String firstName;
    private String lastName;
    private String phoneNumber;

    public PatientDto() {
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}