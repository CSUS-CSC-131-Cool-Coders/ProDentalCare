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
    private final PatientRepository patientRepository;  // I think this implementation can be done w/ just updating all
                                                        // patient related stuff into the existing Patient model and
                                                        // Repository

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

        PatientInfoResponse response = buildPatientInfoResponse(patient);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private PatientInfoResponse buildPatientInfoResponse(Patient patient) {
        PatientInfoResponse response = new PatientInfoResponse();

        // basic info
        PatientInfoResponse.BasicInfo basicInfo = new PatientInfoResponse.BasicInfo();
        basicInfo.setPatientName(patient.getFirstName() + " " + patient.getLastName());
        basicInfo.setPatientDOB(patient.getDateOfBirth());
        basicInfo.setPatientSex(patient.getSex());
        // basicInfo.setPatientRace(patient.getRace());
        // basicInfo.setPatientMaritalStatus(patient.getMaritalStatus);
        basicInfo.setPatientNumber(patient.getPatientId().toString());
        basicInfo.setPatientWeight(patient.getWeight());
        basicInfo.setPatientHeight(patient.getHeight());
        basicInfo.setPatientPrefLanguage(patient.getLangCode());
        response.setBasicInfo(basicInfo);

        // contact info
        PatientInfoResponse.ContactInfo contactInfo = new PatientInfoResponse.ContactInfo();
        // contactInfo.setPhoneType(patient.getPhoneType);
        contactInfo.setPhoneNumber(patient.getPhoneNumber());
        contactInfo.setContactEmail(patient.getEmail());
        response.setContactInfo(contactInfo);

        // emergency contact info
        PatientInfoResponse.EmergencyContactInfo emergencyContactInfo = new PatientInfoResponse.EmergencyContactInfo();
//        emergencyContactInfo.setRelationship(patient.getEmergencyRelationship());
//        emergencyContactInfo.setPhoneNumber(patient.getEmergencyPhoneNumber());
//        emergencyContactInfo.setPhoneType(patient.getEmergencyPhoneType());
//        emergencyContactInfo.setEmergencyContactEmail(patient.getEmergencyContactEmail());
        response.setEmergencyContactInfo(emergencyContactInfo);

        // address info
        PatientInfoResponse.AddressInfo addressInfo = new PatientInfoResponse.AddressInfo();
//        addressInfo.setAddressLineOne(patient.getAddressLineOne());
//        addressInfo.setAddressLineTwo(patient.getAddressLineTwo());
//        addressInfo.setCity(patient.getCity());
//        addressInfo.setState(patient.getState());
//        addressInfo.setPostalCode(patient.getPostalCode());
//        addressInfo.setCountry(patient.getCountry());
        response.setAddressInfo(addressInfo);

        return response;
    }

    /*
    * Using PUT so that it will handle if something doesn't exist, IE for emergency contact info, it will create the
    * resource as it's not there
    *
    * */
    @RequireToken
    @PutMapping("/info")
    public ResponseEntity<PatientInfoResponse> updatePatientInfo(@RequestHeader(name = "Authorization") String token, @RequestBody PatientInfoRequest patientInfo) {
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
        List<Patient> patientList = patientRepository.findByEmail(patientInfo.getContactInfo().getContactEmail());
        if (patientList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Patient patient = patientList.get(0);

        // Update patient details
        if (patientInfo.getBasicInfo() != null) {
            patient.setFirstName(extractFirstName(patientInfo.getBasicInfo().getPatientName()));
            patient.setLastName(extractLastName(patientInfo.getBasicInfo().getPatientName()));
            patient.setDateOfBirth(patientInfo.getBasicInfo().getPatientDOB());
//            patient.setPatientRace(patientInfo.getBasicInfo().getPatientRace());
//            patient.setPatientMaritalStatus(patientInfo.getBasicInfo().getPatientMaritalStatus());
            patient.setWeight(patientInfo.getBasicInfo().getPatientWeight());
            patient.setHeight(patientInfo.getBasicInfo().getPatientHeight());
            patient.setSex(patientInfo.getBasicInfo().getPatientSex());
        }

        if (patientInfo.getContactInfo() != null) {
            //patient.setPhoneType(patientInfo.getContactInfo().getPhoneType());
            patient.setPhoneNumber(patientInfo.getContactInfo().getPhoneNumber());
            patient.setEmail(patientInfo.getContactInfo().getContactEmail());
        }

        if (patientInfo.getEmergencyContactInfo() != null) {
//            patient.setEmergencyPhoneType(patientInfo.getEmergencyContactInfo().getEmergencyPhoneType());
//            patient.setEmergencyPhoneNumber(patientInfo.getEmergencyContactInfo().getEmergencyPhoneNumber());
//            patient.setEmergencyContactEmail(patientInfo.getEmergencyContactInfo().getEmergencyContactEmail());
//            patient.setEmergencyContactRelationship(patientInfo.getEmergencyContactInfo().getEmergencyRelationship());
        }

        if (patientInfo.getAddressInfo() != null) {
//            patient.setAddressLineOne(patientInfo.getAddressInfo().getAddressLineOne());
//            patient.setAddressLineTwo(patientInfo.getAddressInfo().getAddressLineTwo());
//            patient.setCity(patientInfo.getAddressInfo().getCity());
//            patient.setState(patientInfo.getAddressInfo().getState());
//            patient.setPostalCode(patientInfo.getAddressInfo().getPostalCode());
//            patient.setCountry(patientInfo.getAddressInfo().getCountry());
        }

        patientRepository.save(patient);

        PatientInfoResponse updatedResponse = buildPatientInfoResponse(patient);
        return new ResponseEntity<>(updatedResponse, HttpStatus.OK);
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
