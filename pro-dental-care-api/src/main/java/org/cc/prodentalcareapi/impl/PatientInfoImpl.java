package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.PatientEmergencyContact;
import org.cc.prodentalcareapi.model.response.PatientEmergencyContactResponse;
import org.cc.prodentalcareapi.model.response.PatientInfoResponse;
import org.cc.prodentalcareapi.model.request.PatientInfoRequest;
import org.cc.prodentalcareapi.model.request.PatientEmergencyContactRequest;
import org.cc.prodentalcareapi.model.Patient;
import org.cc.prodentalcareapi.repository.PatientEmergencyContactRepository;
import org.cc.prodentalcareapi.repository.PatientRepository;
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
public class PatientInfoImpl {

    private final TokenService tokenService;
    private final PatientRepository patientRepository;
    private final PatientEmergencyContactRepository patientEmergencyContactRepository;

    @Autowired
    public PatientInfoImpl(TokenService tokenService, PatientRepository patientRepository, PatientEmergencyContactRepository patientEmergencyContactRepository) {
        this.tokenService = tokenService;
        this.patientRepository = patientRepository;
        this.patientEmergencyContactRepository = patientEmergencyContactRepository;
    }

    @RequireToken
    @GetMapping("/info")
    public ResponseEntity<PatientInfoResponse> getPatientInfo(@RequestHeader(name = "Authorization") String token) {
        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

        if (t == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = t.getUsername();
        if (ObjectUtils.isEmpty(email)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Retrieve patient record by email
        List<Patient> patientList = patientRepository.findByEmail(email);
        if (patientList.size() != 1) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Patient patient = patientList.get(0);

        // Build and return the response
        PatientInfoResponse response = buildPatientInfoResponse(patient);
        return new ResponseEntity<>(response, HttpStatus.OK);
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

        // Retrieve patient record by email
        List<Patient> patientList = patientRepository.findByEmail(email);
        if (patientList.size() != 1) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Patient patient = patientList.get(0);

        // Retrieve emergency contact by patientId
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
    @PutMapping("/info")
    public ResponseEntity<PatientInfoResponse> updatePatientInfo(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody PatientInfoRequest patientInfo,
            @RequestBody PatientEmergencyContactRequest patientEmergencyContact) {

        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

        if (t == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = t.getUsername();
        if (ObjectUtils.isEmpty(email)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Retrieve the patient record by email
        List<Patient> patientList = patientRepository.findByEmail(email);
        if (patientList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Patient patient = patientList.get(0);

        // Retrieve or create the PatientEmergencyContact record by patientId
        List<PatientEmergencyContact> emergencyContacts = patientEmergencyContactRepository.findByPatientId(patient.getPatientId());
        PatientEmergencyContact emergencyContact = new PatientEmergencyContact();
        for (PatientEmergencyContact contact : emergencyContacts) {
            emergencyContact = contact;
            break;
        }

        // Update patient details
        if (patientInfo.getBasicInfo() != null) {
            patient.setFirstName(extractFirstName(patientInfo.getBasicInfo().getPatientName()));
            patient.setLastName(extractLastName(patientInfo.getBasicInfo().getPatientName()));
            patient.setDateOfBirth(patientInfo.getBasicInfo().getPatientDOB());
            patient.setRace(patientInfo.getBasicInfo().getPatientRace());
            patient.setMaritalStatus(patientInfo.getBasicInfo().getPatientMaritalStatus());
            patient.setWeight(patientInfo.getBasicInfo().getPatientWeight());
            patient.setHeight(patientInfo.getBasicInfo().getPatientHeight());
            patient.setSex(patientInfo.getBasicInfo().getPatientSex());
        }

        if (patientInfo.getContactInfo() != null) {
            patient.setPhoneType(patientInfo.getContactInfo().getPhoneType());
            patient.setPhoneNumber(patientInfo.getContactInfo().getPhoneNumber());
            patient.setEmail(patientInfo.getContactInfo().getContactEmail());
        }

        if (patientInfo.getAddressInfo() != null) {
            patient.setAddressOne(patientInfo.getAddressInfo().getAddressLineOne());
            patient.setAddressTwo(patientInfo.getAddressInfo().getAddressLineTwo());
            patient.setState(patientInfo.getAddressInfo().getState());
            patient.setZipCode(patientInfo.getAddressInfo().getPostalCode());
            patient.setCountry(patientInfo.getAddressInfo().getCountry());
        }

        // Update emergency contact details
        if (patientEmergencyContact.getEmergencyContactInfo() != null) {
            emergencyContact.setPatientId(patient.getPatientId());
            emergencyContact.setEmergencyPhoneType(patientEmergencyContact.getEmergencyContactInfo().getPhoneType());
            emergencyContact.setEmergencyPhoneNo(patientEmergencyContact.getEmergencyContactInfo().getPhoneNo());
            emergencyContact.setEmergencyEmail(patientEmergencyContact.getEmergencyContactInfo().getEmergencyContactEmail());
            emergencyContact.setEmergencyRelationship(patientEmergencyContact.getEmergencyContactInfo().getRelationship());
        }

        patientRepository.save(patient);
        patientEmergencyContactRepository.save(emergencyContact);

        // Build and return the updated response
        PatientInfoResponse updatedResponse = buildPatientInfoResponse(patient);
        return new ResponseEntity<>(updatedResponse, HttpStatus.OK);
    }

    private PatientInfoResponse buildPatientInfoResponse(Patient patient) {
        PatientInfoResponse response = new PatientInfoResponse();

        // Basic info
        PatientInfoResponse.BasicInfo basicInfo = new PatientInfoResponse.BasicInfo();
        basicInfo.setPatientName(patient.getFirstName() + " " + patient.getLastName());
        basicInfo.setPatientDOB(patient.getDateOfBirth());
        basicInfo.setPatientSex(patient.getSex());
        basicInfo.setPatientRace(patient.getRace());
        basicInfo.setPatientMaritalStatus(patient.getMaritalStatus());
        basicInfo.setPatientNumber(patient.getPatientId().toString());
        basicInfo.setPatientWeight(patient.getWeight());
        basicInfo.setPatientHeight(patient.getHeight());
        basicInfo.setPatientPrefLanguage(patient.getLangCode());
        response.setBasicInfo(basicInfo);

        // Contact info
        PatientInfoResponse.ContactInfo contactInfo = new PatientInfoResponse.ContactInfo();
        contactInfo.setPhoneType(patient.getPhoneType());
        contactInfo.setPhoneNumber(patient.getPhoneNumber());
        contactInfo.setContactEmail(patient.getEmail());
        response.setContactInfo(contactInfo);

        // Address info
        PatientInfoResponse.AddressInfo addressInfo = new PatientInfoResponse.AddressInfo();
        addressInfo.setAddressLineOne(patient.getAddressOne());
        addressInfo.setAddressLineTwo(patient.getAddressTwo());
        addressInfo.setState(patient.getState());
        addressInfo.setPostalCode(patient.getZipCode());
        addressInfo.setCountry(patient.getCountry());
        response.setAddressInfo(addressInfo);

        return response;
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

    private String extractFirstName(String fullName) {
        if (fullName == null || fullName.isEmpty()) return null;
        return fullName.split(" ")[0];
    }

    private String extractLastName(String fullName) {
        if (fullName == null || fullName.isEmpty()) return null;
        String[] parts = fullName.split(" ");
        return parts.length > 1 ? parts[1] : "";
    }
}
