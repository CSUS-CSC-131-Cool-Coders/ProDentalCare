package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "appointments")
public class Appointments {

	@Id
	@Column(name = "appt_id")
	private int appointmentId;

	@Temporal(TemporalType.DATE)
	@Column(name = "appt_date")
	private Date date;

	@Column(name = "status", length = 20)
	private String status;

	@Column(name = "dentist_notes", length = 200)
	private String dentistNotes;

	@Column(name = "patient_id_fk", length = 9, columnDefinition = "char(9)")
	private String patientId;

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDentistNotes() {
		return dentistNotes;
	}

	public void setDentistNotes(String dentistNotes) {
		this.dentistNotes = dentistNotes;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
}
