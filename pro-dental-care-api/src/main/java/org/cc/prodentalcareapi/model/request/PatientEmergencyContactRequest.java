package org.cc.prodentalcareapi.model.request;

public class PatientEmergencyContactRequest {
    private PatientEmergencyContactRequest.EmergencyContactInfo emergencyContactInfo;

    public PatientEmergencyContactRequest.EmergencyContactInfo getEmergencyContactInfo() {
        return emergencyContactInfo;
    }

    public void setEmergencyContactInfo(PatientEmergencyContactRequest.EmergencyContactInfo emergencyContactInfo) {
        this.emergencyContactInfo = emergencyContactInfo;
    }

    public static class EmergencyContactInfo {
        private String relationship;
        private String phoneType;
        private String phoneNumber;
        private String emergencyContactEmail;

        // Getters and Setters
        public String getRelationship() {
            return relationship;
        }

        public void setRelationship(String relationship) {
            this.relationship = relationship;
        }

        public String getPhoneType() {
            return phoneType;
        }

        public void setPhoneType(String phoneType) {
            this.phoneType = phoneType;
        }

        public String getPhoneNo() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public String getEmergencyContactEmail() {
            return emergencyContactEmail;
        }

        public void setEmergencyContactEmail(String emergencyContactEmail) {
            this.emergencyContactEmail = emergencyContactEmail;
        }
    }
}
