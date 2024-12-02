package org.cc.prodentalcareapi.model.response;

import org.cc.prodentalcareapi.model.*;

import java.util.List;

public class PatientInformationStaffViewResponse {

	private Patient patient;

	private PatientTreatmentPlan patientTreatmentPlan;

	private List<AppointmentsWithStaffName> appointments;
	private List<AllergyRecord> allergies;
	private List<MedicationRecord> medications;
	private List<LabRecord> labs;
	private List<ImmunizationRecord> immunizations;

	public PatientInformationStaffViewResponse() {}

	public PatientInformationStaffViewResponse(Patient patient,
											   PatientTreatmentPlan patientTreatmentPlan,
											   List<AppointmentsWithStaffName> appointments,
											   List<AllergyRecord> allergies,
											   List<MedicationRecord> medications,
											   List<LabRecord> labs,
											   List<ImmunizationRecord> immunizations) {
		this.patient = patient;
		this.patientTreatmentPlan = patientTreatmentPlan;
		this.appointments = appointments;
		this.allergies = allergies;
		this.medications = medications;
		this.labs = labs;
		this.immunizations = immunizations;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public PatientTreatmentPlan getPatientTreatmentPlan() {
		return patientTreatmentPlan;
	}

	public void setPatientTreatmentPlan(PatientTreatmentPlan patientTreatmentPlan) {
		this.patientTreatmentPlan = patientTreatmentPlan;
	}

	public List<AppointmentsWithStaffName> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<AppointmentsWithStaffName> appointments) {
		this.appointments = appointments;
	}

	public List<AllergyRecord> getAllergies() {
		return allergies;
	}

	public void setAllergies(List<AllergyRecord> allergies) {
		this.allergies = allergies;
	}

	public List<MedicationRecord> getMedications() {
		return medications;
	}

	public void setMedications(List<MedicationRecord> medications) {
		this.medications = medications;
	}

	public List<LabRecord> getLabs() {
		return labs;
	}

	public void setLabs(List<LabRecord> labs) {
		this.labs = labs;
	}

	public List<ImmunizationRecord> getImmunizations() {
		return immunizations;
	}

	public void setImmunizations(List<ImmunizationRecord> immunizations) {
		this.immunizations = immunizations;
	}
}
