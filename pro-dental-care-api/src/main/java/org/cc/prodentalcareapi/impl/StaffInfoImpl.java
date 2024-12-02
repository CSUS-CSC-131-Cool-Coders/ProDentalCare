package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.Patient;
import org.cc.prodentalcareapi.model.response.PatientListResponse;
import org.cc.prodentalcareapi.repository.PatientRepository;
import org.cc.prodentalcareapi.security.RequireToken;
import org.cc.prodentalcareapi.security.Token;
import org.cc.prodentalcareapi.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/staff")
public class StaffInfoImpl {

	private TokenService tokenService;
	private PatientRepository patientRepository;

	@Autowired
	public StaffInfoImpl(TokenService tokenService, PatientRepository patientRepository) {
		this.tokenService = tokenService;
		this.patientRepository = patientRepository;
	}

	/**
	 *
	* */
	private Optional<Token> isValidStaffToken(String token) {
		String tokenValue = tokenService.getTokenFromBearerToken(token);
		Token t = tokenService.getToken(tokenValue);

		if (t == null) {
			return Optional.empty();
		}

		if (!t.hasRole("admin") && !t.hasRole("dentist")) {
			return Optional.empty();
		}

		Optional<Token> tokenOpt = Optional.of(t);
		return tokenOpt;
	}

	@RequireToken
	@GetMapping("/staff/patient-list")
	public ResponseEntity<PatientListResponse> getPatientList(@RequestHeader(name = "Authorization") String token) {
		if (isValidStaffToken(token).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		List<Patient> patientList = patientRepository.findAll();

		PatientListResponse response = new PatientListResponse(patientList);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@RequireToken
	@GetMapping
	public ResponseEntity<PatientInformationStaffViewResponse> getPatientInformation(@RequestHeader(name = "Authorization") String token) {
		if (isValidStaffToken(token).isEmpty()) {}
	}
}
