package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.Patient;
import org.cc.prodentalcareapi.model.response.PatientInfoResponse;
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

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/patient-info-staff-view")
public class StaffPatientInfoImpl {

    private final TokenService tokenService;
    private final PatientRepository patientRepository;

    @Autowired
    public StaffPatientInfoImpl(
            TokenService tokenService,
            PatientRepository patientRepository) {
        this.tokenService = tokenService;
        this.patientRepository = patientRepository;
    }



    @RequireToken
    @GetMapping("/patient-info")
    public ResponseEntity<StaffPatientInfoResponse> getStaffPatientInfo(@RequestHeader(name = "Authorization") String token) {
        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

        if (t == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = t.getUsername();

        if (ObjectUtils.isEmpty(email)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        StaffPatientInfoResponse response = new StaffPatientInfoResponse();

        // Retrieve all patient record
        List<Patient> patientList = patientRepository.findAll();

        Patient patient = patientList.get(0);

        StaffPatientInfoResponse response = buildStaffPatientInfoResponse(patient);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private StaffPatientInfoResponse buildStaffPatientInfoResponse(Patient patient) {
        StaffPatientInfoResponse response = new StaffPatientInfoResponse();

        for (Patient patient : patientList) {
        // basic info
        StaffPatientInfoResponse.BasicInfo basicInfo = new StaffPatientInfoResponse.BasicInfo();
        basicInfo.setPatientName(patient.getFirstName() + " " + patient.getLastName());
        basicInfo.setPatientEmail(patient.getEmail());
        basicInfo.setPatientNumber(patient.getPatientId().toString());
        basicInfo.setPatientDOB(patient.getDateOfBirth());
        basicInfo.setPatientPhoneNumber(patient.getPhoneNumber());
        // basicInfo.setPatientSex(patient.getSex());
        // basicInfo.setPatientRace(patient.getRace());
        // basicInfo.setPatientMaritalStatus(patient.getMaritalStatus);
        // basicInfo.setPatientWeight(patient.getWeight());
        // basicInfo.setPatientHeight(patient.getHeight());
        // basicInfo.setPatientPrefLanguage(patient.getLangCode());

       }

        response.setBasicInfo(basicInfo);
       return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
