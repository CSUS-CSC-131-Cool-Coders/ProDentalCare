package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.*;
import org.cc.prodentalcareapi.repository.*;
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
@RequestMapping("/patient/records")
public class PatientRecordsImpl {

    private final TokenService tokenService;
    private final VisitRecordRepository visitRecordRepository;
    private final AllergyRecordRepository allergyRecordRepository;
    private final MedicationRecordRepository medicationRecordRepository;
    private final LabRecordRepository labRecordRepository;
    private final ImmunizationRecordRepository immunizationRecordRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public PatientRecordsImpl(
            TokenService tokenService,
            VisitRecordRepository visitRecordRepository,
            AllergyRecordRepository allergyRecordRepository,
            MedicationRecordRepository medicationRecordRepository,
            LabRecordRepository labRecordRepository,
            ImmunizationRecordRepository immunizationRecordRepository,
            PatientRepository patientRepository) {
        this.tokenService = tokenService;
        this.visitRecordRepository = visitRecordRepository;
        this.allergyRecordRepository = allergyRecordRepository;
        this.medicationRecordRepository = medicationRecordRepository;
        this.labRecordRepository = labRecordRepository;
        this.immunizationRecordRepository = immunizationRecordRepository;
        this.patientRepository = patientRepository;
    }

//    @RequireToken
//    @GetMapping("/visit")
//    public ResponseEntity<List<VisitRecordEntity>> getVisitRecords(@RequestHeader(name = "Authorization") String token) {
//        String tokenValue = tokenService.getTokenFromBearerToken(token);
//        Token t = tokenService.getToken(tokenValue);
//
//        if (t == null) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        String email = t.getUsername();
//
//        if (ObjectUtils.isEmpty(email)) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        List<Patient> patientList = patientRepository.findByEmail(email);
//        if (patientList.size() != 1) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        Patient patient = patientList.get(0);
//        List<VisitRecordEntity> visitRecords = visitRecordRepository.findAllByPatientId(patient.getPatientId());
//
//        return new ResponseEntity<>(visitRecords, HttpStatus.OK);
//    }
//
//    @RequireToken
//    @GetMapping("/allergy")
//    public ResponseEntity<List<AllergyRecord>> getAllergyRecords(@RequestHeader(name = "Authorization") String token) {
//        String tokenValue = tokenService.getTokenFromBearerToken(token);
//        Token t = tokenService.getToken(tokenValue);
//
//        if (t == null) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        String email = t.getUsername();
//
//        if (ObjectUtils.isEmpty(email)) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        List<Patient> patientList = patientRepository.findByEmail(email);
//        if (patientList.size() != 1) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        Patient patient = patientList.get(0);
//        List<AllergyRecord> allergyRecords = allergyRecordRepository.findAllByPatientId(patient.getPatientId());
//
//        return new ResponseEntity<>(allergyRecords, HttpStatus.OK);
//    }
//
//    @RequireToken
//    @GetMapping("/medication")
//    public ResponseEntity<List<MedicationRecord>> getMedicationRecords(@RequestHeader(name = "Authorization") String token) {
//        String tokenValue = tokenService.getTokenFromBearerToken(token);
//        Token t = tokenService.getToken(tokenValue);
//
//        if (t == null) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        String email = t.getUsername();
//
//        if (ObjectUtils.isEmpty(email)) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        List<Patient> patientList = patientRepository.findByEmail(email);
//        if (patientList.size() != 1) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        Patient patient = patientList.get(0);
//        List<MedicationRecord> medicationRecords = medicationRecordRepository.findAllByPatientId(patient.getPatientId());
//
//        return new ResponseEntity<>(medicationRecords, HttpStatus.OK);
//    }
//
//    @RequireToken
//    @GetMapping("/lab")
//    public ResponseEntity<List<LabRecord>> getLabRecords(@RequestHeader(name = "Authorization") String token) {
//        String tokenValue = tokenService.getTokenFromBearerToken(token);
//        Token t = tokenService.getToken(tokenValue);
//
//        if (t == null) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        String email = t.getUsername();
//
//        if (ObjectUtils.isEmpty(email)) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        List<Patient> patientList = patientRepository.findByEmail(email);
//        if (patientList.size() != 1) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        Patient patient = patientList.get(0);
//        List<LabRecord> labRecords = labRecordRepository.findAllByPatientId(patient.getPatientId());
//
//        return new ResponseEntity<>(labRecords, HttpStatus.OK);
//    }
//
//    @RequireToken
//    @GetMapping("/immunization")
//    public ResponseEntity<List<ImmunizationRecord>> getImmunizationRecords(@RequestHeader(name = "Authorization") String token) {
//        String tokenValue = tokenService.getTokenFromBearerToken(token);
//        Token t = tokenService.getToken(tokenValue);
//
//        if (t == null) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        String email = t.getUsername();
//
//        if (ObjectUtils.isEmpty(email)) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//
//        List<Patient> patientList = patientRepository.findByEmail(email);
//        if (patientList.size() != 1) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        Patient patient = patientList.get(0);
//        List<ImmunizationRecord> immunizationRecords = immunizationRecordRepository.findAllByPatientId(patient.getPatientId());
//
//        return new ResponseEntity<>(immunizationRecords, HttpStatus.OK);
//    }
}
