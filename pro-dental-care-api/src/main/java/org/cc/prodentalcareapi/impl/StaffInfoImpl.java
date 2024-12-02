package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.*;
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

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/staff")
public class StaffInfoImpl {

	private final TokenService tokenService;
	private final PatientRepository patientRepository;
	private final AppointmentsRepository appointmentsRepository;
	private final ImmunizationRecordRepository immunizationRecordRepository;
	private final VisitRecordRepository visitRecordRepository;
	private final PatientTreatmentPlanRepository patientTreatmentPlanRepository;
	private final MedicationRecordRepository medicationRecordRepository;
	private final AllergyRecordRepository allergyRecordRepository;
	private final LabRecordRepository labRecordRepository;

	@Autowired
	public StaffInfoImpl(TokenService tokenService,
						 PatientRepository patientRepository,
						 AppointmentsRepository appointmentsRepository,
						 ImmunizationRecordRepository immunizationRecordRepository,
						 VisitRecordRepository visitRecordRepository,
						 PatientTreatmentPlanRepository patientTreatmentPlanRepository,
						 MedicationRecordRepository medicationRecordRepository,
						 AllergyRecordRepository allergyRecordRepository, LabRecordRepository labRecordRepository) {
		this.tokenService = tokenService;
		this.patientRepository = patientRepository;
		this.appointmentsRepository = appointmentsRepository;
		this.immunizationRecordRepository = immunizationRecordRepository;
		this.visitRecordRepository = visitRecordRepository;
		this.patientTreatmentPlanRepository = patientTreatmentPlanRepository;
		this.medicationRecordRepository = medicationRecordRepository;
		this.allergyRecordRepository = allergyRecordRepository;
		this.labRecordRepository = labRecordRepository;
	}

	/**
	 *
	* */
	private Optional<Token> isValidStaffToken(String token) {
		String tokenValue = tokenService.getTokenFromBearerToken(token);
		Token t = tokenService.getToken(tokenValue);

		if (t == null) {
			return Optional.empty();
		}

		if (!t.hasRole("admin") && !t.hasRole("dentist")) {
			return Optional.empty();
		}

		Optional<Token> tokenOpt = Optional.of(t);
		return tokenOpt;
	}

	@RequireToken
	@GetMapping("/staff/patient-list")
	public ResponseEntity<PatientListResponse> getPatientList(@RequestHeader(name = "Authorization") String token) {
		if (isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		List<Patient> patientList = patientRepository.findAll();

		PatientListResponse response = new PatientListResponse(patientList);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@RequireToken
	@GetMapping("/staff/patient-information/{patientId}")
	public ResponseEntity<PatientInformationStaffViewResponse> getPatientInformation(@RequestHeader(name = "Authorization") String token, @PathVariable("patientId") String patientId) {
		if (isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		Patient patient = patientRepository.findById(patientId).orElse(null);

		if (patient == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		List<Appointments> appointments = appointmentsRepository.findAllAppointmentsByPatientIdOrderByDateAsc(patientId);

		List<AllergyRecord> allergyRecords = allergyRecordRepository.findAllByPatientId(patientId);

		List<LabRecord> labRecords = labRecordRepository.findAllByPatientId(patientId);

		List<ImmunizationRecord> immunizationRecords = immunizationRecordRepository.findAllByPatientId(patientId);

		List<MedicationRecord> medicationRecords = medicationRecordRepository.findAllByPatientId(patientId);

		Optional<PatientTreatmentPlan> patientTreatmentPlan = patientTreatmentPlanRepository.findById(patientId);

		PatientInformationStaffViewResponse response = new PatientInformationStaffViewResponse(patient, patientTreatmentPlan.orElse(null), appointments, allergyRecords, medicationRecords, labRecords, immunizationRecords);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
