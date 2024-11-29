package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.response.PatientInfoResponse;
import org.cc.prodentalcareapi.model.request.PatientInfoRequest;
import org.cc.prodentalcareapi.model.Patient;
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

    @Autowired
    public PatientInfoImpl(TokenService tokenService, PatientRepository patientRepository) {
        this.tokenService = tokenService;
        this.patientRepository = patientRepository;
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

        // Build PatientInfoResponse
        PatientInfoResponse response = buildPatientInfoResponse(patient);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private PatientInfoResponse buildPatientInfoResponse(Patient patient) {
        PatientInfoResponse response = new PatientInfoResponse();

        // Populate basic info
        PatientInfoResponse.BasicInfo basicInfo = new PatientInfoResponse.BasicInfo();
        basicInfo.setPatientName(patient.getFirstName() + " " + patient.getLastName());
        basicInfo.setPatientDOB(patient.getDateOfBirth());
        basicInfo.setPatientSex(patient.getSex());
        basicInfo.setPatientNumber(patient.getPatientId().toString());
        basicInfo.setPatientWeight(patient.getWeight());
        basicInfo.setPatientHeight(patient.getHeight());
        response.setBasicInfo(basicInfo);

        // Populate contact info
        PatientInfoResponse.ContactInfo contactInfo = new PatientInfoResponse.ContactInfo();
        contactInfo.setPhoneNumber(patient.getPhoneNumber());
        contactInfo.setContactEmail(patient.getEmail());
        response.setContactInfo(contactInfo);

        // Populate emergency contact info
        PatientInfoResponse.EmergencyContactInfo emergencyContactInfo = new PatientInfoResponse.EmergencyContactInfo();
        response.setEmergencyContactInfo(emergencyContactInfo);

        // Populate address info
        PatientInfoResponse.AddressInfo addressInfo = new PatientInfoResponse.AddressInfo();
        response.setAddressInfo(addressInfo);

        return response;
    }

    @PutMapping("/info")
    public ResponseEntity<?> updatePatientInfo(@RequestBody PatientInfoRequest patientInfo) {
        // Validate input
        if (patientInfo == null) {
            return new ResponseEntity<>("Invalid request body", HttpStatus.BAD_REQUEST);
        }

        // Retrieve the patient record by ID or unique identifier (email or other unique property)
        Patient patient = (Patient) patientRepository.findByEmail(patientInfo.getContactInfo().getContactEmail());
        if (patient == null) {
            return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
        }

        // Update patient details
        if (patientInfo.getBasicInfo() != null) {
            patient.setFirstName(extractFirstName(patientInfo.getBasicInfo().getPatientName()));
            patient.setLastName(extractLastName(patientInfo.getBasicInfo().getPatientName()));
            patient.setDateOfBirth(patientInfo.getBasicInfo().getPatientDOB());
            patient.setWeight(patientInfo.getBasicInfo().getPatientWeight());
            patient.setHeight(patientInfo.getBasicInfo().getPatientHeight());
            patient.setSex(patientInfo.getBasicInfo().getPatientSex());
        }

        if (patientInfo.getContactInfo() != null) {
            patient.setPhoneNumber(patientInfo.getContactInfo().getPhoneNumber());
            patient.setEmail(patientInfo.getContactInfo().getContactEmail());
        }

        if (patientInfo.getEmergencyContactInfo() != null) {
//            patient.setEmergencyPhoneNumber(patientInfo.getEmergencyContactInfo().getPhoneNumber());
//            patient.setEmergencyContactEmail(patientInfo.getEmergencyContactInfo().getEmergencyContactEmail());
//            patient.setEmergencyContactRelationship(patientInfo.getEmergencyContactInfo().getRelationship());
        }

        if (patientInfo.getAddressInfo() != null) {
//            patient.setAddressLineOne(patientInfo.getAddressInfo().getAddressLineOne());
//            patient.setAddressLineTwo(patientInfo.getAddressInfo().getAddressLineTwo());
//            patient.setCity(patientInfo.getAddressInfo().getCity());
//            patient.setState(patientInfo.getAddressInfo().getState());
//            patient.setPostalCode(patientInfo.getAddressInfo().getPostalCode());
//            patient.setCountry(patientInfo.getAddressInfo().getCountry());
        }

        // Save updated patient details to the database
        patientRepository.save(patient);

        return ResponseEntity.ok("Patient info updated successfully");
    }

    // Utility methods to handle name parsing
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
