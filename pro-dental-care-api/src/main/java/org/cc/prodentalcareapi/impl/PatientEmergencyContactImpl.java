package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.Patient;
import org.cc.prodentalcareapi.model.PatientEmergencyContact;
import org.cc.prodentalcareapi.model.response.PatientEmergencyContactResponse;
import org.cc.prodentalcareapi.model.request.PatientEmergencyContactRequest;
import org.cc.prodentalcareapi.repository.PatientRepository;
import org.cc.prodentalcareapi.repository.PatientEmergencyContactRepository;
import org.cc.prodentalcareapi.security.RequireToken;
import org.cc.prodentalcareapi.security.Token;
import org.cc.prodentalcareapi.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient")
public class PatientEmergencyContactImpl {

    private final TokenService tokenService;
    private final PatientEmergencyContactRepository patientEmergencyContactRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public PatientEmergencyContactImpl(TokenService tokenService, PatientEmergencyContactRepository patientEmergencyContactRepository, PatientRepository patientRepository) {
        this.tokenService = tokenService;
        this.patientEmergencyContactRepository = patientEmergencyContactRepository;
        this.patientRepository = patientRepository;
    }

    @RequireToken
    @GetMapping("/emergency-contact")
    public ResponseEntity<PatientEmergencyContactResponse> getEmergencyContact(@RequestHeader(name = "Authorization") String token) {
        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

        if (t == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = t.getUsername();
        if (ObjectUtils.isEmpty(email)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Retrieve the patient record using email
        List<Patient> patients = patientRepository.findByEmail(email);
        if (patients.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Patient patient = patients.get(0);

        List<PatientEmergencyContact> emergencyContacts = patientEmergencyContactRepository.findByPatientId(patient.getPatientId());
        if (emergencyContacts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        PatientEmergencyContact emergencyContact = emergencyContacts.get(0);

        // Build and return the response
        PatientEmergencyContactResponse response = buildEmergencyContactResponse(emergencyContact);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequireToken
    @PutMapping("/emergency-contact")
    public ResponseEntity<PatientEmergencyContactResponse> updateEmergencyContact(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody PatientEmergencyContactRequest emergencyContactRequest) {

        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

        if (t == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = t.getUsername();
        if (ObjectUtils.isEmpty(email)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Retrieve the patient record using email
        List<Patient> patients = patientRepository.findByEmail(email);
        if (patients.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Patient patient = patients.get(0);

        // creating by patient ID
        List<PatientEmergencyContact> emergencyContacts = patientEmergencyContactRepository.findByPatientId(patient.getPatientId());
        PatientEmergencyContact emergencyContact = emergencyContacts.isEmpty() ? new PatientEmergencyContact() : emergencyContacts.get(0);

        // Update emergency contact details
        if (emergencyContactRequest.getEmergencyContactInfo() != null) {
            emergencyContact.setPatientId(patient.getPatientId());
            emergencyContact.setEmergencyPhoneType(emergencyContactRequest.getEmergencyContactInfo().getPhoneType());
            emergencyContact.setEmergencyPhoneNo(emergencyContactRequest.getEmergencyContactInfo().getPhoneNo());
            emergencyContact.setEmergencyEmail(emergencyContactRequest.getEmergencyContactInfo().getEmergencyContactEmail());
            emergencyContact.setEmergencyRelationship(emergencyContactRequest.getEmergencyContactInfo().getRelationship());
        }

        patientEmergencyContactRepository.save(emergencyContact);

        // Build and return the updated response
        PatientEmergencyContactResponse updatedResponse = buildEmergencyContactResponse(emergencyContact);
        return new ResponseEntity<>(updatedResponse, HttpStatus.OK);
    }

    private PatientEmergencyContactResponse buildEmergencyContactResponse(PatientEmergencyContact emergencyContact) {
        PatientEmergencyContactResponse response = new PatientEmergencyContactResponse();

        // Emergency contact info
        PatientEmergencyContactResponse.EmergencyContactInfo emergencyContactInfo = new PatientEmergencyContactResponse.EmergencyContactInfo();
        emergencyContactInfo.setRelationship(emergencyContact.getEmergencyRelationship());
        emergencyContactInfo.setPhoneType(emergencyContact.getEmergencyPhoneType());
        emergencyContactInfo.setPhoneNumber(emergencyContact.getEmergencyPhoneNo());
        emergencyContactInfo.setEmergencyContactEmail(emergencyContact.getEmergencyEmail());
        response.setEmergencyContactInfo(emergencyContactInfo);

        return response;
    }
}
