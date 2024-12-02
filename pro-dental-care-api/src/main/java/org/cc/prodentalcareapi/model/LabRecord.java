package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "lab_records")
public class LabRecord {

	@Id
	@Column(name = "lab_id")
	private int laId;

	@Column(name = "patient_id_fk", length = 9, columnDefinition = "char(9)")
	private String patientId;

	@Temporal(TemporalType.DATE)
	@Column(name = "lab_date")
	private Date date;

	@Column(name = "lab", length = 200)
	private String lab;

	@Column(name = "comment", length = 200)
	private String comment;

	// Getters and setters
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getLab() {
		return lab;
	}

	public void setLab(String lab) {
		this.lab = lab;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
}
