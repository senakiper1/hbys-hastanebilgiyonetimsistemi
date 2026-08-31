package dto;

public class CreatePatientDto {
// yeni hasta kaydolurken 
    private String nationalId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String password; 

    public CreatePatientDto() {
    }

    public CreatePatientDto(String nationalId, String firstName, String lastName, String phoneNumber, String password) {
        this.nationalId = nationalId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
