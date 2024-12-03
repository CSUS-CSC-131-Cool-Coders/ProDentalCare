package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "visit_records")
public class VisitRecordEntity {

    @Id
    @Column(name = "visit_id")
    private int visitId;

    @Column(name = "patient_id_fk", length = 9, columnDefinition = "char(9)")
    private String patientId;

    @Temporal(TemporalType.DATE)
    @Column(name = "appt_date")
    private Date date;

    @Column(name = "provider", length = 20)
    private String provider;

    @Column(name = "notes", length = 200)
    private String notes;

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
}
