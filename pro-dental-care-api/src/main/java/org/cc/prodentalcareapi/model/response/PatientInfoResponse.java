package org.cc.prodentalcareapi.model.response;

import java.util.Date;

public class PatientInfoResponse {

    // Contact Information
    private ContactInfo contactInfo;
    // Emergency Contact Information
    private EmergencyContactInfo emergencyContactInfo;
    // Basic Information
    private BasicInfo basicInfo;
    // Address Information
    private AddressInfo addressInfo;

    public PatientInfoResponse() {
        this.contactInfo = new ContactInfo();
        this.emergencyContactInfo = new EmergencyContactInfo();
        this.basicInfo = new BasicInfo();
        this.addressInfo = new AddressInfo();
    }

    // Getters and Setters
    public ContactInfo getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(ContactInfo contactInfo) {
        this.contactInfo = contactInfo;
    }

    public EmergencyContactInfo getEmergencyContactInfo() {
        return emergencyContactInfo;
    }

    public void setEmergencyContactInfo(EmergencyContactInfo emergencyContactInfo) {
        this.emergencyContactInfo = emergencyContactInfo;
    }

    public BasicInfo getBasicInfo() {
        return basicInfo;
    }

    public void setBasicInfo(BasicInfo basicInfo) {
        this.basicInfo = basicInfo;
    }

    public AddressInfo getAddressInfo() {
        return addressInfo;
    }

    public void setAddressInfo(AddressInfo addressInfo) {
        this.addressInfo = addressInfo;
    }

    // Nested Classes Representing Sections
    public static class ContactInfo {
        private String phoneType = "N/A";
        private String phoneNumber = "N/A";
        private String contactEmail = "N/A";

        // Getters and Setters
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

        public String getContactEmail() {
            return contactEmail;
        }

        public void setContactEmail(String contactEmail) {
            this.contactEmail = contactEmail;
        }
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

    public static class BasicInfo {
        private String patientName = "N/A";
        private Date patientDOB;
        private String patientRace = "N/A";
        private String patientSex = "N/A";
        private String patientMaritalStatus = "N/A";
        private String patientPrefLanguage = "N/A";
        private String patientNumber = "N/A";
        private int patientWeight;
        private int patientHeight;

        // Getters and Setters
        public String getPatientName() {
            return patientName;
        }

        public void setPatientName(String patientName) {
            this.patientName = patientName;
        }

        public Date getPatientDOB() {
            return patientDOB;
        }

        public void setPatientDOB(Date patientDOB) {
            this.patientDOB = patientDOB;
        }

        public String getPatientRace() {
            return patientRace;
        }

        public void setPatientRace(String patientRace) {
            this.patientRace = patientRace;
        }

        public String getPatientSex() {
            return patientSex;
        }

        public void setPatientSex(String patientSex) {
            this.patientSex = patientSex;
        }

        public String getPatientMaritalStatus() {
            return patientMaritalStatus;
        }

        public void setPatientMaritalStatus(String patientMaritalStatus) {
            this.patientMaritalStatus = patientMaritalStatus;
        }

        public String getPatientPrefLanguage() {
            return patientPrefLanguage;
        }

        public void setPatientPrefLanguage(String patientPrefLanguage) {
            this.patientPrefLanguage = patientPrefLanguage;
        }

        public String getPatientNumber() {
            return patientNumber;
        }

        public void setPatientNumber(String patientNumber) {
            this.patientNumber = patientNumber;
        }

        public int getPatientWeight() {
            return patientWeight;
        }

        public void setPatientWeight(int patientWeight) {
            this.patientWeight = patientWeight;
        }

        public int getPatientHeight() {
            return patientHeight;
        }

        public void setPatientHeight(int patientHeight) {
            this.patientHeight = patientHeight;
        }
    }

    public static class AddressInfo {
        private String country = "N/A";
        private String state = "N/A";
        private String postalCode = "N/A";
        private String city = "N/A";
        private String addressLineOne = "N/A";
        private String addressLineTwo = "N/A";

        // Getters and Setters
        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }

        public String getState() {
            return state;
        }

        public void setState(String state) {
            this.state = state;
        }

        public String getPostalCode() {
            return postalCode;
        }

        public void setPostalCode(String postalCode) {
            this.postalCode = postalCode;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getAddressLineOne() {
            return addressLineOne;
        }

        public void setAddressLineOne(String addressLineOne) {
            this.addressLineOne = addressLineOne;
        }

        public String getAddressLineTwo() {
            return addressLineTwo;
        }

        public void setAddressLineTwo(String addressLineTwo) {
            this.addressLineTwo = addressLineTwo;
        }
    }
}
