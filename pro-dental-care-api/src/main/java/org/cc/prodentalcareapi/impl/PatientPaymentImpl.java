package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.Account;
import org.cc.prodentalcareapi.model.Patient;
import org.cc.prodentalcareapi.model.PatientBilling;
import org.cc.prodentalcareapi.model.PatientPaymentOption;
import org.cc.prodentalcareapi.model.request.paymentProcessBody;
import org.cc.prodentalcareapi.model.response.PatientPaymentResponse;
import org.cc.prodentalcareapi.model.response.PaymentAmount;
import org.cc.prodentalcareapi.model.response.PaymentPreview;
import org.cc.prodentalcareapi.repository.PatientBillingRepository;
import org.cc.prodentalcareapi.repository.PatientRepository;
import org.cc.prodentalcareapi.repository.PaymentAmountRepository;
import org.cc.prodentalcareapi.repository.PaymentOptionRepository;
import org.cc.prodentalcareapi.security.RequireToken;
import org.cc.prodentalcareapi.security.Token;
import org.cc.prodentalcareapi.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController()
@RequestMapping("/patient/payments")
public class PatientPaymentImpl {

    private final TokenService tokenService;
    private final PatientBillingRepository patientBillingRepository;
    private final PatientRepository patientRepository;
    private final PaymentAmountRepository paymentAmountRepository;
    private final PaymentOptionRepository paymentOptionRepository;

    @Autowired
    public PatientPaymentImpl(
            TokenService tokenService,
            PatientBillingRepository patientBillingRepository,
            PatientRepository patientRepository,
            PaymentAmountRepository paymentAmountRepository,
            PaymentOptionRepository paymentOptionRepository) {
        this.tokenService = tokenService;
        this.patientBillingRepository = patientBillingRepository;
        this.patientRepository = patientRepository;
        this.paymentAmountRepository = paymentAmountRepository;
        this.paymentOptionRepository = paymentOptionRepository;
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

        //Get next bill
        List<PatientBilling> bills = patientBillingRepository.findAllByPatientIdOrderByDueDateAsc(patient.getPatientId());
        List<PaymentAmount> totalBills = paymentAmountRepository.findAllByPatientIdOrderByPaidDateDesc(patient.getPatientId());

        PatientBilling candidate = null;

        for (PatientBilling bill : bills) {
            if (!bill.getPayStatus().equals("paid")) {
                candidate = bill;
                break;
            }
        }
        if (candidate != null) {
            response.currentPayment = new PaymentPreview(candidate.getPayAmount().doubleValue(), candidate.getDueDate().toString());
        }

        //Get all bills, due dates, payment status, and paid dates
        response.totalPayment = totalBills;

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequireToken
    @GetMapping("/payment-processing")
    public ResponseEntity<PatientPaymentResponse> getProcessPayment(@RequestHeader(name = "Authorization") String token) {
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

        //Get next bill
        List<PatientBilling> bills = patientBillingRepository.findAllByPatientIdOrderByDueDateAsc(patient.getPatientId());
        List<PaymentAmount> totalBills = paymentAmountRepository.findAllByPatientIdOrderByPaidDateDesc(patient.getPatientId());

        PatientBilling candidate = null;
        for (PatientBilling bill : bills) {
            if (!bill.getPayStatus().equals("paid")) {
                candidate = bill;
                break;
            }
        }
        if (candidate != null) {
            response.currentPayment = new PaymentPreview(candidate.getPayAmount().doubleValue(), candidate.getDueDate().toString());
        }

        response.totalPayment = totalBills;

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/payment-processing")
    public ResponseEntity<PatientPaymentResponse> setProcessPayment(@RequestHeader(name = "Authorization") String token, @RequestBody paymentProcessBody body) {
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

        List<PatientBilling> bills = patientBillingRepository.findAllByPatientIdOrderByDueDateAsc(patient.getPatientId());

        PatientPaymentOption option = new PatientPaymentOption(patient.getPatientId(), body.cardHolder, body.cardNumber, body.expDate, body.cvc, body.address, body.address2, body.city, body.state, body.zip);

        paymentOptionRepository.save(option); //Save new payment info linked to patientID

        //Update PatientBilling Table with paidDate column and payStatus
        PatientBilling latestBill = null;
        Date date = new Date(); //Set current day as the due date
        BigDecimal totalPaid = new BigDecimal(0);
        if (body.paymentOption.equals("accountBalance")) {
            for (PatientBilling bill : bills) {

                if (!bill.getPayStatus().equals("paid")) {
                    latestBill = bill;
                    totalPaid = totalPaid.add(latestBill.getPayAmount());
                    latestBill.setPayStatus("paid");
                }
            }

            PatientBilling newBill = new PatientBilling();
            newBill.setPatientId(patient.getPatientId());
            newBill.setPayAmount(totalPaid); //Set account balance as payAmount
            newBill.setPayStatus("paid");
            newBill.setDueDate(date);
            newBill.setPaidDate(date);

            patientBillingRepository.saveAndFlush(newBill);
        } else if (body.paymentOption.equals("amountDue")) {

            //Find the latest unpaid bill
            for (PatientBilling bill : bills) {
                if (!bill.getPayStatus().equals("paid")) {  //Get next bill that is not paid
                    latestBill = bill;
                    break;
                }
            }

            if (latestBill != null) {
                latestBill.setPayStatus("paid");
                latestBill.setPaidDate(date);
                patientBillingRepository.saveAndFlush(latestBill);  //Update latest bill to paid
            }
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
