package org.cc.prodentalcareapi.model.response;

import java.util.Date;
import java.util.List;

public class AdminStaffInfoResponse {

    private List<StaffInfo> staffMembers;

    // Default Constructor
    public AdminStaffInfoResponse() {}

    // Parameterized Constructor
    public AdminStaffInfoResponse(List<StaffInfo> staffMembers) {
        this.staffMembers = staffMembers;
    }

    // Getter and Setter
    public List<StaffInfo> getStaffMembers() {
        return staffMembers;
    }

    public void setStaffMembers(List<StaffInfo> staffMembers) {
        this.staffMembers = staffMembers;
    }

    // Inner Class to Represent Individual Staff Info
    public static class StaffInfo {
        private String staffId;
        private String email;
        private String firstName;
        private String lastName;
        private Date dateOfBirth;

        // Default Constructor
        public StaffInfo() {}

        // Parameterized Constructor
        public StaffInfo(String staffId, String email, String firstName, String lastName, Date dateOfBirth) {
            this.staffId = staffId;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.dateOfBirth = dateOfBirth;
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

        public Date getDateOfBirth() {
            return dateOfBirth;
        }

        public void setDateOfBirth(Date dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
        }
    }
}
