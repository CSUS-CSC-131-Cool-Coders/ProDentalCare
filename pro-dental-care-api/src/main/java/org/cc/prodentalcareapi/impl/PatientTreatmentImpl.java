package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.Appointments;
import org.cc.prodentalcareapi.model.Patient;
import org.cc.prodentalcareapi.model.PatientTreatmentPlan;
import org.cc.prodentalcareapi.model.StaffMember;
import org.cc.prodentalcareapi.model.response.AppointmentSummary;
import org.cc.prodentalcareapi.model.response.PatientTreatmentResponse;
import org.cc.prodentalcareapi.model.response.TreatmentPreview;
import org.cc.prodentalcareapi.repository.AppointmentSummaryRepository;
import org.cc.prodentalcareapi.repository.PatientRepository;
import org.cc.prodentalcareapi.repository.PatientTreatmentRepository;
import org.cc.prodentalcareapi.repository.StaffMemberRepository;
import org.cc.prodentalcareapi.security.RequireToken;
import org.cc.prodentalcareapi.security.Token;
import org.cc.prodentalcareapi.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/patient/records")
public class PatientTreatmentImpl {

    private final TokenService tokenService;
    private final PatientRepository patientRepository;
    private final PatientTreatmentRepository patientTreatmentRepository;
    private final AppointmentSummaryRepository appointmentSummaryRepository;
    private final StaffMemberRepository staffMemberRepository;

    @Autowired
    public PatientTreatmentImpl(
            TokenService tokenService,
            PatientTreatmentRepository patientTreatmentRepository,
            PatientRepository patientRepository,
            AppointmentSummaryRepository appointmentSummaryRepository,
            StaffMemberRepository staffMemberRepository, StaffMemberRepository staffMemberRepository1) {
        this.tokenService = tokenService;
        this.patientTreatmentRepository = patientTreatmentRepository;
        this.patientRepository = patientRepository;
        this.appointmentSummaryRepository = appointmentSummaryRepository;
        this.staffMemberRepository = staffMemberRepository1;
    }

    // getAppointments(token) - for the requesting user
    // getAppointmentsForUser(token (staff token), patientId) - on behalf of a patient from a staff member / admin

    @RequireToken
    @GetMapping("/treatmentPlan")
    public ResponseEntity<PatientTreatmentResponse> getPatientTreatment(@RequestHeader(name = "Authorization") String token) {
        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

        if (t == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = t.getUsername();

        if (ObjectUtils.isEmpty(email)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        PatientTreatmentResponse response = new PatientTreatmentResponse();

        List<Patient> patientList = patientRepository.findByEmail(email);
        if (patientList.size() != 1) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Patient patient = patientList.get(0);

        //Get next treatment plan and appointment
        Optional<PatientTreatmentPlan> treatmentOptional = patientTreatmentRepository.findById(patient.getPatientId());
        List<AppointmentSummary> appointments = appointmentSummaryRepository.findAllAppointmentsByPatientIdOrderByDateAsc(patient.getPatientId());


        PatientTreatmentPlan treatment = null;
        Appointments appointment = null;

        if (treatmentOptional.isPresent()) {
            treatment = treatmentOptional.get();
        }

        if (treatment != null) {
            String staffName = "";
            List<StaffMember> staffList = staffMemberRepository.findByStaffId(treatment.getStaffId()); //Get staff name associated with patient
            if (!staffList.isEmpty()) {
                StaffMember staffMember = staffList.get(0);
                staffName = staffMember.getFirstName() + " " + staffMember.getLastName();
            } else {
                staffName = "N/A";
            }

            response.treatmentPlan = new TreatmentPreview(treatment.getPlanName(), treatment.getStartDate().toString(), treatment.getEndDate().toString(), staffName);
        }
        else{
            response.treatmentPlan = new TreatmentPreview("No Treatment Plan", null, null, null);
        }

        response.treatmentAppointment = appointments;


        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}