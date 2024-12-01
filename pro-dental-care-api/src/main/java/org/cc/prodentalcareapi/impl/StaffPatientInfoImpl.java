package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.Patient;
import org.cc.prodentalcareapi.model.response.StaffPatientInfoResponse;
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

import java.util.ArrayList;
import java.util.List;

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

		// Retrieve all patient record
		List<Patient> patientList = patientRepository.findAll();

		StaffPatientInfoResponse response = buildStaffPatientInfoResponse(patientList);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	private StaffPatientInfoResponse buildStaffPatientInfoResponse(List<Patient> patientList) {
		StaffPatientInfoResponse response = new StaffPatientInfoResponse();

		List<StaffPatientInfoResponse.BasicInfo> basicInfoList = new ArrayList<>();
		for (Patient patient : patientList) {
			// basic info
			StaffPatientInfoResponse.BasicInfo basicInfo = new StaffPatientInfoResponse.BasicInfo();
			basicInfo.setName(patient.getFirstName() + " " + patient.getLastName());
			basicInfo.setEmail(patient.getEmail());
			basicInfo.setPatientId(patient.getPatientId().toString());
			basicInfo.setDateOfBirth(patient.getDateOfBirth());
			basicInfo.setPhoneNumber(patient.getPhoneNumber());
			// basicInfo.setPatientSex(patient.getSex());
			// basicInfo.setPatientRace(patient.getRace());
			// basicInfo.setPatientMaritalStatus(patient.getMaritalStatus);
			// basicInfo.setPatientWeight(patient.getWeight());
			// basicInfo.setPatientHeight(patient.getHeight());
			// basicInfo.setPatientPrefLanguage(patient.getLangCode());
			basicInfoList.add(basicInfo);
		}

		response.getBasicInfo().addAll(basicInfoList);

		return response;
	}

}
