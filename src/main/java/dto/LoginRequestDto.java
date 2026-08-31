package dto;

public class LoginRequestDto {

    private String nationalId;
    private String firstName;
    private String password;

    public LoginRequestDto() {
    }

    public LoginRequestDto(String nationalId, String firstName, String password) {
        this.nationalId = nationalId;
        this.firstName = firstName;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
