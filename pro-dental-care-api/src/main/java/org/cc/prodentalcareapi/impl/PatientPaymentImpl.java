package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.Patient;
import org.cc.prodentalcareapi.model.PatientBilling;
import org.cc.prodentalcareapi.model.response.PatientPaymentResponse;
import org.cc.prodentalcareapi.model.response.PaymentPreview;
import org.cc.prodentalcareapi.repository.PatientBillingRepository;
import org.cc.prodentalcareapi.repository.PatientRepository;
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

@RestController()
@RequestMapping("/patient/payments")
public class PatientPaymentImpl {

    private final TokenService tokenService;
    //private final PatientPaymentRepository patientPaymentRepository;
    private final PatientBillingRepository patientBillingRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public PatientPaymentImpl(
            TokenService tokenService,
            //PatientPaymentRepository patientPaymentRepository,
            PatientBillingRepository patientBillingRepository,
            PatientRepository patientRepository) {
        this.tokenService = tokenService;
        //this.patientPaymentRepository = patientPaymentRepository;
        this.patientBillingRepository = patientBillingRepository;
        this.patientRepository = patientRepository;
    }

    // getAppointments(token) - for the requesting user
    // getAppointmentsForUser(token (staff token), patientId) - on behalf of a patient from a staff member / admin

    @RequireToken
    @GetMapping("/payment")
    public ResponseEntity<PatientPaymentResponse> getPatientPayment(@RequestHeader(name = "Authorization") String token) {
        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

        if (t == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = t.getUsername();

        if (ObjectUtils.isEmpty(email)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        PatientPaymentResponse response = new PatientPaymentResponse();

        List<Patient> patientList = patientRepository.findByEmail(email);
        if (patientList.size() != 1) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Patient patient = patientList.get(0);

        // Get next bill
        List<PatientBilling> bills = patientBillingRepository.findAllByPatientIdOrderByDueDateAsc(patient.getPatientId());
        PatientBilling candidate = null;
        for (PatientBilling bill : bills) {
            if (!bill.getStatus().equals("paid")) {
                candidate = bill;
                break;
            }
        }
        if (candidate != null) {
            response.currentPayment = new PaymentPreview(candidate.getPaymentAmount().doubleValue(), candidate.getDueDate().toString());
        }


        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
