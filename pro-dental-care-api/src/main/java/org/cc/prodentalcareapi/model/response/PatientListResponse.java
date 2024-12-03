package org.cc.prodentalcareapi.model.response;

import org.cc.prodentalcareapi.model.Patient;

import java.util.List;

public class PatientListResponse {

	private List<Patient> patients;

	public PatientListResponse(List<Patient> patients) {
		this.patients = patients;
	}

	public List<Patient> getPatients() {
		return patients;
	}

	public void setPatients(List<Patient> patients) {
		this.patients = patients;
	}
}
