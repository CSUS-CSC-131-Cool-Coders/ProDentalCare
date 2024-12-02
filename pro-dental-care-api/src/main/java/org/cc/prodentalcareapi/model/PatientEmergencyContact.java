package org.cc.prodentalcareapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "patient_emergency_contact")
public class PatientEmergencyContact {
    @Id
    @Column(name = "patient_id_fk", length = 9, columnDefinition = "char(9)")
    private String patientId;

    @Column(name = "emergency_email", length = 128)
    private String emergencyEmail;

    @Column(name = "relationship", length = 40)
    private String emergencyRelationship;

    @Column(name = "emergency_phone_type", length = 40)
    private String emergencyPhoneType;

    @Column(name = "emergency_phone_no", length = 11)
    private String emergencyPhoneNo;

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getEmergencyEmail() {
        return emergencyEmail;
    }

    public void setEmergencyEmail(String emergencyEmail) {
        this.emergencyEmail = emergencyEmail;
    }

    public String getEmergencyRelationship() {
        return emergencyRelationship;
    }

    public void setEmergencyRelationship(String emergencyRelationship) {
        this.emergencyRelationship = emergencyRelationship;
    }

    public String getEmergencyPhoneType() {
        return emergencyPhoneType;
    }

    public void setEmergencyPhoneType(String emergencyPhoneType) {
        this.emergencyPhoneType = emergencyPhoneType;
    }

    public String getEmergencyPhoneNo() {
        return emergencyPhoneNo;
    }

    public void setEmergencyPhoneNo(String emergencyPhoneNo) {
        this.emergencyPhoneNo = emergencyPhoneNo;
    }

}
