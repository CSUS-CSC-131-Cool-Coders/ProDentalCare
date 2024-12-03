package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.Account;
import org.cc.prodentalcareapi.model.Patient;
import org.cc.prodentalcareapi.model.StaffMember;
import org.cc.prodentalcareapi.model.response.PatientListResponse;
import org.cc.prodentalcareapi.repository.AccountRepository;
import org.cc.prodentalcareapi.repository.StaffMemberRepository;
import org.cc.prodentalcareapi.security.RequireToken;
import org.cc.prodentalcareapi.security.Token;
import org.cc.prodentalcareapi.security.TokenService;
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
public class StaffInfo {


	private final TokenService tokenService;
	private final StaffMemberRepository staffMemberRepository;
	private final AccountRepository accountRepository;

	public StaffInfo(TokenService tokenService, StaffMemberRepository staffMemberRepository, AccountRepository accountRepository) {
		this.tokenService = tokenService;
		this.staffMemberRepository = staffMemberRepository;
		this.accountRepository = accountRepository;
	}

	@RequireToken
	@GetMapping("/information")
	public ResponseEntity<StaffMember> getPatientList(@RequestHeader(name = "Authorization") String token) {
		Optional<Token> tokenOptional;
		if ((tokenOptional = tokenService.isValidStaffToken(token)).isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		Token t = tokenOptional.get();

		List<StaffMember> accountList = staffMemberRepository.findByEmail(t.getUsername());

		if (accountList.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(accountList.get(0), HttpStatus.OK);
	}

}
