package org.cc.prodentalcareapi.model.response;

public class PatientEmergencyContactResponse {

    private EmergencyContactInfo emergencyContactInfo;

    public PatientEmergencyContactResponse() {
        this.emergencyContactInfo = new EmergencyContactInfo();
    }

    public EmergencyContactInfo getEmergencyContactInfo() {
        return emergencyContactInfo;
    }

    public void setEmergencyContactInfo(EmergencyContactInfo emergencyContactInfo) {
        this.emergencyContactInfo = emergencyContactInfo;
    }

    public static class EmergencyContactInfo {
        private String relationship = "N/A";
        private String phoneType = "N/A";
        private String phoneNumber = "N/A";
        private String emergencyContactEmail = "N/A";

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

        public String getPhoneNumber() {
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
