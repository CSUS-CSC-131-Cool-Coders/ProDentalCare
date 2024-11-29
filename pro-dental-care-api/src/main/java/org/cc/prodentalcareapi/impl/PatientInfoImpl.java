package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.response.PatientInfoResponse;
import org.cc.prodentalcareapi.model.Patient;
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
        //basicInfo.setPatientRace(patient.getRace());
        basicInfo.setPatientSex(patient.getSex());
        //basicInfo.setPatientMaritalStatus(patient.getMaritalStatus());
        //basicInfo.setPatientPrefLanguage(patient.getPreferredLanguage());
        basicInfo.setPatientNumber(patient.getPatientId().toString());
        basicInfo.setPatientWeight(patient.getWeight());
        basicInfo.setPatientHeight(patient.getHeight());
        response.setBasicInfo(basicInfo);

        // Populate contact info
        PatientInfoResponse.ContactInfo contactInfo = new PatientInfoResponse.ContactInfo();
        //contactInfo.setPhoneType(patient.getPhoneType());
        contactInfo.setPhoneNumber(patient.getPhoneNumber());
        contactInfo.setContactEmail(patient.getEmail());
        response.setContactInfo(contactInfo);

        // Populate emergency contact info
        PatientInfoResponse.EmergencyContactInfo emergencyContactInfo = new PatientInfoResponse.EmergencyContactInfo();
//        emergencyContactInfo.setRelationship(patient.getEmergencyContactRelationship());
//        emergencyContactInfo.setPhoneType(patient.getEmergencyPhoneType());
//        emergencyContactInfo.setPhoneNumber(patient.getEmergencyPhoneNumber());
//        emergencyContactInfo.setEmergencyContactEmail(patient.getEmergencyContactEmail());
        response.setEmergencyContactInfo(emergencyContactInfo);

        // Populate address info
        PatientInfoResponse.AddressInfo addressInfo = new PatientInfoResponse.AddressInfo();
//        addressInfo.setCountry(patient.getCountry());
//        addressInfo.setState(patient.getState());
//        addressInfo.setPostalCode(patient.getPostalCode());
//        addressInfo.setCity(patient.getCity());
//        addressInfo.setAddressLineOne(patient.getAddressLineOne());
//        addressInfo.setAddressLineTwo(patient.getAddressLineTwo());
        response.setAddressInfo(addressInfo);

        return response;
    }
}
