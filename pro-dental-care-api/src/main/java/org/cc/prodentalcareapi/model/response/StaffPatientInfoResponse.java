package org.cc.prodentalcareapi.model.response;

import java.util.List;

public class StaffPatientInfoResponse {
    private BasicInfo basicInfo;

    public StaffPatientInfoResponse() {
        this.basicInfo = new BasicInfo;
    }

    // Getters and Setters
    public BasicInfo getBasicInfo() {
        return basicInfo;
    }

    public void setBasicInfo(BasicInfo basicInfo) {
        this.basicInfo = basicInfo;
    }

    // Nested Class Representing Sections
    public static class BasicInfo {
        private String name;
        private String email;
        private String patientId;
        private Date dateOfBirth;
        private String phoneNumber;

        // Getters and Setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPatientId() {
            return patientId;
        }

        public void setPatientId(String patientId) {
            this.patientId = patientId;
        }

        public Date getDateOfBirth() {
            return dateOfBirth;
        }

        public void setDateOfBirth(Date dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

    }
}