package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "medication_records")
public class MedicationRecord {

    @Id
    @Column(name = "med_id")
    private int medicationId;

    @Column(name = "patient_id_fk", length = 9, columnDefinition = "char(9)")
    private String patientId;

    @Temporal(TemporalType.DATE)
    @Column(name = "med_date")
    private Date date;

    @Column(name = "medication", length = 200)
    private String medication;

    @Column(name = "directions", length = 200)
    private String directions;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public String getDirections() {
        return directions;
    }

    public void setDirections(String directions) {
        this.directions = directions;
    }

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
}
