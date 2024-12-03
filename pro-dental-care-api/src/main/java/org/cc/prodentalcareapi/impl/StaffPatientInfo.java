package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.*;
import org.cc.prodentalcareapi.model.request.*;
import org.cc.prodentalcareapi.model.response.AppointmentsWithStaffName;
import org.cc.prodentalcareapi.model.response.PatientInformationStaffViewResponse;
import org.cc.prodentalcareapi.model.response.PatientListResponse;
import org.cc.prodentalcareapi.repository.*;
import org.cc.prodentalcareapi.security.RequireToken;
import org.cc.prodentalcareapi.security.Token;
import org.cc.prodentalcareapi.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/staff")
public class StaffPatientInfo {

	private final TokenService tokenService;
	private final PatientRepository patientRepository;
	private final AppointmentsRepository appointmentsRepository;
	private final ImmunizationRecordRepository immunizationRecordRepository;
	private final VisitRecordRepository visitRecordRepository;
	private final PatientTreatmentPlanRepository patientTreatmentPlanRepository;
	private final MedicationRecordRepository medicationRecordRepository;
	private final AllergyRecordRepository allergyRecordRepository;
	private final LabRecordRepository labRecordRepository;
	private final StaffMemberRepository staffMemberRepository;
	private final StaffAppointmentsRepository staffAppointmentsRepository;

	@Autowired
	public StaffPatientInfo(TokenService tokenService,
							PatientRepository patientRepository,
							AppointmentsRepository appointmentsRepository,
							ImmunizationRecordRepository immunizationRecordRepository,
							VisitRecordRepository visitRecordRepository,
							PatientTreatmentPlanRepository patientTreatmentPlanRepository,
							MedicationRecordRepository medicationRecordRepository,
							AllergyRecordRepository allergyRecordRepository, LabRecordRepository labRecordRepository, StaffMemberRepository staffMemberRepository, StaffAppointmentsRepository staffAppointmentsRepository) {
		this.tokenService = tokenService;
		this.patientRepository = patientRepository;
		this.appointmentsRepository = appointmentsRepository;
		this.immunizationRecordRepository = immunizationRecordRepository;
		this.visitRecordRepository = visitRecordRepository;
		this.patientTreatmentPlanRepository = patientTreatmentPlanRepository;
		this.medicationRecordRepository = medicationRecordRepository;
		this.allergyRecordRepository = allergyRecordRepository;
		this.labRecordRepository = labRecordRepository;
		this.staffMemberRepository = staffMemberRepository;
		this.staffAppointmentsRepository = staffAppointmentsRepository;
	}

	@RequireToken
	@GetMapping("/patient-list")
	public ResponseEntity<PatientListResponse> getPatientList(@RequestHeader(name = "Authorization") String token) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		List<Patient> patientList = patientRepository.findAll();

		PatientListResponse response = new PatientListResponse(patientList);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@RequireToken
	@GetMapping("/patient-information/{patientId}")
	public ResponseEntity<PatientInformationStaffViewResponse> getPatientInformation(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		Patient patient = patientRepository.findById(patientId).orElse(null);

		if (patient == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		List<Appointments> appointments = appointmentsRepository.findAllAppointmentsByPatientIdOrderByDateAsc(patientId);

		List<AppointmentsWithStaffName> appointmentsWithStaffNames = new ArrayList<>();

		appointments.stream().forEach(appointment -> {
			AppointmentsWithStaffName appointmentWithStaffName = new AppointmentsWithStaffName(appointment);
			List<StaffAppointments> sas = staffAppointmentsRepository.findByStaffAppointmentIdAppointmentId(appointmentWithStaffName.getAppointment().getAppointmentId());

			List<String> staffNames = new ArrayList<>();
			sas.stream().forEach(staffAppointment -> {
				StaffMember staff = staffMemberRepository.findById(staffAppointment.getStaffAppointmentId().getStaffId()).orElse(null);
				if (staff != null) {
					staffNames.add(staff.getFirstName() + " " + staff.getLastName());

				}
			});
			StringBuilder sb = new StringBuilder();
			for(String staff : staffNames) {
				sb.append(staff);
				sb.append(" ");
			}
			appointmentWithStaffName.setStaffName(sb.toString());

			appointmentsWithStaffNames.add(appointmentWithStaffName);
		});


		List<AllergyRecord> allergyRecords = allergyRecordRepository.findAllByPatientId(patientId);

		List<LabRecord> labRecords = labRecordRepository.findAllByPatientId(patientId);

		List<ImmunizationRecord> immunizationRecords = immunizationRecordRepository.findAllByPatientId(patientId);

		List<MedicationRecord> medicationRecords = medicationRecordRepository.findAllByPatientId(patientId);

		Optional<PatientTreatmentPlan> patientTreatmentPlan = patientTreatmentPlanRepository.findById(patientId);

		PatientInformationStaffViewResponse response = new PatientInformationStaffViewResponse(patient, patientTreatmentPlan.orElse(null), appointmentsWithStaffNames, allergyRecords, medicationRecords, labRecords, immunizationRecords);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@RequireToken
	@PostMapping("/patient-information/{patientId}/treatment-plan")
	public ResponseEntity<String> updatePatientTreatmentPlan(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId, @RequestBody PatientTreatmentPlanUpdateRequest request) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		try {
			Optional<PatientTreatmentPlan> planOptional = patientTreatmentPlanRepository.findById(patientId);
			PatientTreatmentPlan plan = planOptional.orElse(new PatientTreatmentPlan(patientId, request.planName, request.staffId));
			plan.setPlanName(request.planName);
			plan.setStaffId(request.staffId);
			plan.setStartDate(request.startDate);
			plan.setEndDate(request.endDate);
			patientTreatmentPlanRepository.saveAndFlush(plan);

			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequireToken
	@PostMapping("/patient-information/{patientId}/allergies")
	public ResponseEntity<String> updatePatientAllergies(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId, @RequestBody List<AllergyUpdateRequest> request) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		for (AllergyUpdateRequest allergy : request) {
			AllergyRecord record = new AllergyRecord();
			record.setPatientId(patientId);
			record.setAllergy(allergy.allergy);
			record.setComment(allergy.comment);
			try {
				allergyRecordRepository.saveAndFlush(record);
			} catch (Exception e) {
				// ignore
			}
		}

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequireToken
	@PostMapping("/patient-information/{patientId}/medications")
	public ResponseEntity<String> updatePatientMedications(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId, @RequestBody List<MedicationUpdateRequest> request) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		for (MedicationUpdateRequest medication : request) {
			MedicationRecord record = new MedicationRecord();
			record.setPatientId(patientId);
			record.setMedication(medication.medication);
			record.setDirections(medication.directions);
			record.setDate(medication.date);
			try {
				medicationRecordRepository.saveAndFlush(record);
			} catch (Exception e) {
				// ignore
			}
		}

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequireToken
	@PostMapping("/patient-information/{patientId}/immunizations")
	public ResponseEntity<String> updatePatientImmunizations(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId, @RequestBody List<ImmunizationUpdateRequest> request) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		for (ImmunizationUpdateRequest immunization : request) {
			ImmunizationRecord record = new ImmunizationRecord();
			record.setPatientId(patientId);
			record.setImmunization(immunization.immunization);
			record.setDate(immunization.date);
			try {
				immunizationRecordRepository.saveAndFlush(record);
			} catch (Exception e) {
				// ignore
			}
		}

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequireToken
	@PostMapping("/patient-information/{patientId}/labs")
	public ResponseEntity<String> updatePatientLabs(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId, @RequestBody List<LabUpdateRequest> request) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		for (LabUpdateRequest lab : request) {
			LabRecord record = new LabRecord();
			record.setPatientId(patientId);
			record.setLab(lab.lab);
			record.setComment(lab.comment);
			record.setDate(lab.date);
			try {
				labRecordRepository.saveAndFlush(record);
			} catch (Exception e) {
				// ignore
			}
		}

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequireToken
	@DeleteMapping("/patient-information/{patientId}/allergies/{allergyId}")
	public ResponseEntity<String> deletePatientAllergy(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId, @PathVariable("allergyId") int allergyId) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		try {

			allergyRecordRepository.deleteById(allergyId);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		allergyRecordRepository.flush();
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequireToken
	@DeleteMapping("/patient-information/{patientId}/medications/{medicationId}")
	public ResponseEntity<String> deletePatientMedication(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId, @PathVariable("medicationId") int medicationId) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		try {
			medicationRecordRepository.deleteById(medicationId);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		medicationRecordRepository.flush();
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequireToken
	@DeleteMapping("/patient-information/{patientId}/labs/{labId}")
	public ResponseEntity<String> deletePatientLab(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId, @PathVariable("labId") int labId) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		try {
			labRecordRepository.deleteById(labId);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		labRecordRepository.flush();
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequireToken
	@DeleteMapping("/patient-information/{patientId}/immunizations/{immunizationId}")
	public ResponseEntity<String> deletePatientImmunization(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId, @PathVariable("immunizationId") int immunizationId) {
		if (tokenService.isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		try {
			immunizationRecordRepository.deleteById(immunizationId);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		immunizationRecordRepository.flush();
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
