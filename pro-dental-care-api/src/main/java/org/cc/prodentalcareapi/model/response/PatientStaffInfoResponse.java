package org.cc.prodentalcareapi.model.response;

import java.util.Date;
import java.util.List;

public class PatientStaffInfoResponse {

    private List<StaffInfo> staffMembers;

    // Default Constructor
    public PatientStaffInfoResponse() {}

    // Parameterized Constructor
    public PatientStaffInfoResponse(List<StaffInfo> staffMembers) {
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
        private String firstName;
        private String lastName;
        private String position;


        // Default Constructor
        public StaffInfo() {}

        // Parameterized Constructor
        public StaffInfo(String staffId, String firstName, String lastName, String position) {
            this.staffId = staffId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.position = position;
        }

        // Getters and Setters
        public String getStaffId() {
            return staffId;
        }

        public void setStaffId(String staffId) {
            this.staffId = staffId;
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

        public String getPosition() {
            return position;
        }

        public void setPosition(String position) {
            this.position = position;
        }
    }
}
