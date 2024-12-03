package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.*;
import org.cc.prodentalcareapi.model.request.ScheduleAppointmentRequest;
import org.cc.prodentalcareapi.model.response.*;
import org.cc.prodentalcareapi.repository.*;
import org.cc.prodentalcareapi.security.RequireToken;
import org.cc.prodentalcareapi.security.Token;
import org.cc.prodentalcareapi.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/patient")
public class PatientImpl {

	private final TokenService tokenService;
	private final AppointmentsRepository appointmentsRepository;
	private final PatientBillingRepository patientBillingRepository;
	private final PatientTreatmentPlanRepository patientTreatmentPlanRepository;
	private final PatientRepository patientRepository;
	private final StaffMemberRepository staffMemberRepository;
	private final StaffAppointmentsRepository staffAppointmentsRepository;
	private final AccountRepository accountRepository;
	private final AllergyRecordRepository allergyRecordRepository;
	private final LabRecordRepository labRecordRepository;
	private final ImmunizationRecordRepository immunizationRecordRepository;
	private final MedicationRecordRepository medicationRecordRepository;


	@Autowired
	public PatientImpl(
			TokenService tokenService,
			AppointmentsRepository appointmentsRepository,
			PatientBillingRepository patientBillingRepository,
			PatientTreatmentPlanRepository patientTreatmentPlanRepository,
			PatientRepository patientRepository,
			StaffAppointmentsRepository staffAppointmentsRepository,
			StaffMemberRepository staffMemberRepository,
			AccountRepository accountRepository, AllergyRecordRepository allergyRecordRepository, LabRecordRepository labRecordRepository, ImmunizationRecordRepository immunizationRecordRepository, MedicationRecordRepository medicationRecordRepository) {
		this.tokenService = tokenService;
		this.appointmentsRepository = appointmentsRepository;
		this.patientBillingRepository = patientBillingRepository;
		this.patientTreatmentPlanRepository = patientTreatmentPlanRepository;
		this.patientRepository = patientRepository;
		this.staffMemberRepository = staffMemberRepository;
		this.staffAppointmentsRepository = staffAppointmentsRepository;
		this.accountRepository = accountRepository;
		this.allergyRecordRepository = allergyRecordRepository;
		this.labRecordRepository = labRecordRepository;
		this.immunizationRecordRepository = immunizationRecordRepository;
		this.medicationRecordRepository = medicationRecordRepository;
	}

	// getAppointments(token) - for the requesting user
	// getAppointmentsForUser(token (staff token), patientId) - on behalf of a
	// patient from a staff member / admin

	@RequireToken
	@GetMapping("/dashboard")
	public ResponseEntity<PatientDashboardResponse> getPatientDashboard(
			@RequestHeader(name = "Authorization") String token) {
		String tokenValue = tokenService.getTokenFromBearerToken(token);
		Token t = tokenService.getToken(tokenValue);

		if (t == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		String email = t.getUsername();

		if (ObjectUtils.isEmpty(email)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		PatientDashboardResponse response = new PatientDashboardResponse();

		/*
		 * 1. Get the associated patient for an email
		 * 2. Use that patient's id to search for appointments
		 * 3. Get the soonest appointment
		 */

		List<Patient> patientList = patientRepository.findByEmail(email);
		if (patientList.size() != 1) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Patient patient = patientList.get(0);

		response.firstName = patient.getFirstName();
		response.lastName = patient.getLastName();

		List<Appointments> appointmentList = appointmentsRepository
				.findAllAppointmentsByPatientIdOrderByDateAsc(patient.getPatientId());
		if (!appointmentList.isEmpty()) {
			Date date = appointmentList.get(0).getDate();
			response.nextAppointmentDate = date.toString();
		}

		// Get treatment plan
		Optional<PatientTreatmentPlan> treatmentPlanOptional = patientTreatmentPlanRepository
				.findById(patient.getPatientId());

		if (treatmentPlanOptional.isPresent()) {
			PatientTreatmentPlan treatmentPlan = treatmentPlanOptional.get();
			response.treatmentPlan = treatmentPlan.getPlanName();
		}

		// Get next bill

		List<PatientBilling> bills = patientBillingRepository
				.findAllByPatientIdOrderByDueDateAsc(patient.getPatientId());
		PatientBilling candidate = null;
		for (PatientBilling bill : bills) {
			if (!bill.getPayStatus().equals("paid")) {
				candidate = bill;
				break;
			}
		}
		if (candidate != null) {
			response.nextPayment = new PaymentPreview(candidate.getPayAmount().doubleValue(),
					candidate.getDueDate().toString());
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@RequireToken
	@GetMapping("/appointments")
	public ResponseEntity<PatientAppointmentsResponse> getCalendarAppointments(@RequestHeader(name = "Authorization") String token) {
		// Extract token from Bearer token
		String tokenValue = tokenService.getTokenFromBearerToken(token);
		Token t = tokenService.getToken(tokenValue);

		// Validate token
		if (t == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		String email = t.getUsername();

		if (ObjectUtils.isEmpty(email)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		List<Patient> patientList = patientRepository.findByEmail(email);
		if (patientList.size() != 1) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Patient patient = patientList.get(0);


		// Retrieve all appointments for patient
		List<Appointments> appointments = appointmentsRepository.findAllAppointmentsByPatientIdOrderByDateAsc(patient.getPatientId());

		// Map Appointments to AppointmentInfo with assigned staff
		List<PatientAppointmentsResponse.AppointmentInfo> appointmentInfos = new ArrayList<>();
		for (Appointments appt : appointments) {
			PatientAppointmentsResponse.AppointmentInfo info = new PatientAppointmentsResponse.AppointmentInfo();
			info.setAppointmentId(appt.getAppointmentId());
			info.setDate(appt.getDate());
			info.setStatus(appt.getStatus());
			info.setDentistNotes(appt.getDentistNotes());
			info.setPatientId(appt.getPatientId());

			// Fetch assigned staff members
			List<StaffAppointments> staffAppts = staffAppointmentsRepository.findByStaffAppointmentIdAppointmentId(appt.getAppointmentId());
			List<PatientStaffInfoResponse.StaffInfo> staffInfos = new ArrayList<>();
			for (StaffAppointments staffAppt : staffAppts) {
				StaffMember staff = staffMemberRepository.findById(staffAppt.getStaffAppointmentId().getStaffId()).orElse(null);
				if (staff != null) {
					PatientStaffInfoResponse.StaffInfo staffInfo = new PatientStaffInfoResponse.StaffInfo();
					staffInfo.setStaffId(staff.getStaffId());
					staffInfo.setFirstName(staff.getFirstName());
					staffInfo.setLastName(staff.getLastName());
					staffInfo.setPosition(staff.getPosition());
					staffInfos.add(staffInfo);
				}
			}
			info.setStaffMembers(staffInfos);
			appointmentInfos.add(info);
		}

		PatientAppointmentsResponse response = new PatientAppointmentsResponse();
		response.setAppointments(appointmentInfos);

		return new ResponseEntity<>(response, HttpStatus.OK);

	}

	@RequireToken
	@GetMapping("/information")
	public ResponseEntity<PatientInformationStaffViewResponse> getPatientInformation(@RequestHeader(name = "Authorization") String token) {
		String tokenValue = tokenService.getTokenFromBearerToken(token);
		Token t = tokenService.getToken(tokenValue);
		if (!t.getRoles().contains("patient")) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		List<Patient> patientList = patientRepository.findByEmail(t.getUsername());

		if (patientList.size() != 1) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}


		Patient patient = patientList.get(0);
		String patientId = patient.getPatientId();

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
	@DeleteMapping("/appointments/{appointmentId}")
	public ResponseEntity<Void> cancelAppointment(
			@RequestHeader(name = "Authorization") String token,
			@PathVariable int appointmentId) {

		// Extract token from Bearer token
		String tokenValue = tokenService.getTokenFromBearerToken(token);
		Token t = tokenService.getToken(tokenValue);

		// Validate token
		if (t == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		String email = t.getUsername();

		if (ObjectUtils.isEmpty(email)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		// Retrieve patient
		List<Patient> patientList = patientRepository.findByEmail(email);
		if (patientList.size() != 1) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Patient patient = patientList.get(0);

		// Retrieve the appointment
		Optional<Appointments> appointmentOpt = appointmentsRepository.findById(appointmentId);
		if (!appointmentOpt.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		Appointments appointment = appointmentOpt.get();

		// Ensure the appointment belongs to the patient
		if (!appointment.getPatientId().equals(patient.getPatientId())) {
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}

		// Delete staff appointments associated with the appointment
		staffAppointmentsRepository.deleteByStaffAppointmentId(appointmentId);

		// Delete the appointment
		appointmentsRepository.delete(appointment);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@RequireToken
	@PostMapping("/appointments")
	public ResponseEntity<ScheduleAppointmentResponse> scheduleAppointment(
			@RequestHeader(name = "Authorization") String token,
			@RequestBody ScheduleAppointmentRequest request) {

		// Extract token from Bearer token
		String tokenValue = tokenService.getTokenFromBearerToken(token);
		Token t = tokenService.getToken(tokenValue);

		// Validate token
		if (t == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		String email = t.getUsername();

		if (ObjectUtils.isEmpty(email)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		// Retrieve patient
		List<Patient> patientList = patientRepository.findByEmail(email);
		if (patientList.size() != 1) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Patient patient = patientList.get(0);


		// Create new appointment
		Appointments newAppointment = new Appointments();
		newAppointment.setDate(request.getDate());
		newAppointment.setStatus("Scheduled");
		newAppointment.setDentistNotes("");
		newAppointment.setPatientId(patient.getPatientId());

		// Save the appointment to generate an ID
		appointmentsRepository.save(newAppointment);

		// Construct response
		ScheduleAppointmentResponse response = new ScheduleAppointmentResponse("Appointment scheduled successfully.", newAppointment.getAppointmentId());

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}


}
