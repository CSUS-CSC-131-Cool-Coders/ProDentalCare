package org.cc.prodentalcareapi.model.response;

import java.util.Date;
import java.util.List;

public class StaffMemberDTO {
    private String staffId;
    private String email;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String sex;
    private String position;
    private String pay;
    private int yearsWorked;
    private String contactNumber;
    private List<String> qualifications;

    public StaffMemberDTO() {}

    // Parameterized Constructor
    public StaffMemberDTO(String staffId, String email, String firstName, String lastName,
                          Date dateOfBirth, String sex, String position, String pay,
                          int yearsWorked, String contactNumber, List<String> qualifications) {
        this.staffId = staffId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.sex = sex;
        this.position = position;
        this.pay = pay;
        this.yearsWorked = yearsWorked;
        this.contactNumber = contactNumber;
        this.qualifications = qualifications;
    }

    // Getters and Setters
    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPay() {
        return pay;
    }

    public void setPay(String pay) {
        this.pay = pay;
    }

    public int getYearsWorked() {
        return yearsWorked;
    }

    public void setYearsWorked(int yearsWorked) {
        this.yearsWorked = yearsWorked;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public List<String> getQualifications() {
        return qualifications;
    }

    public void setQualifications(List<String> qualifications) {
        this.qualifications = qualifications;
    }
}
