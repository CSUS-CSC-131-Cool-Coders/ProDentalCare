package org.cc.prodentalcareapi.impl;

import com.google.gson.Gson;
import org.cc.prodentalcareapi.model.*;
import org.cc.prodentalcareapi.model.request.LoginRequestBody;
import org.cc.prodentalcareapi.model.request.SignupRequestBody;
import org.cc.prodentalcareapi.model.response.LoginResponse;
import org.cc.prodentalcareapi.model.response.RolesResponse;
import org.cc.prodentalcareapi.repository.AccountRepository;
import org.cc.prodentalcareapi.repository.PatientRepository;
import org.cc.prodentalcareapi.repository.StaffMemberRepository;
import org.cc.prodentalcareapi.security.PasswordService;
import org.cc.prodentalcareapi.security.RequireToken;
import org.cc.prodentalcareapi.security.Token;
import org.cc.prodentalcareapi.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Optional;
import java.util.List;
import java.util.logging.Logger;

@RestController
public class AccountImpl {

	private final Logger LOG = Logger.getGlobal();

	private final AccountRepository accountRepository;
	private final PatientRepository patientRepository;
	private final StaffMemberRepository staffMemberRepository;
	private final PasswordService passwordService;
	private final TokenService tokenService;

	@Autowired
	public AccountImpl(AccountRepository accountRepository,
					   PatientRepository patientRepository,
					   StaffMemberRepository staffMemberRepository,
					   PasswordService passwordService,
					   TokenService tokenService) {
		this.accountRepository = accountRepository;
		this.patientRepository = patientRepository;
		this.staffMemberRepository = staffMemberRepository;
		this.passwordService = passwordService;
		this.tokenService = tokenService;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> processLoginRequest(@RequestBody LoginRequestBody body) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
		Optional<Account> accountOptional = accountRepository.findById(body.username);
		if (accountOptional.isEmpty()) {
			// Unauthorized when no account found so attacker can't tell if an account exists or not with an email
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		Account account = accountOptional.get();

		if(!passwordService.equals(body.password, account.getPassHash())) {
			// Password doesn't match hashed password so bad login request
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		List<StaffMember> staffMemberList = staffMemberRepository.findByEmail(account.getEmail());

		// todo: Populate roles not by deduction but from database!

		if (!staffMemberList.isEmpty()) {
			// Must be a staff member!

			Token token = new Token(account.getEmail(), List.of("dentist"));
			String encryptedToken = tokenService.encrypt((new Gson()).toJson(token));
			LoginResponse response = new LoginResponse(account.getEmail(), encryptedToken);

			return new ResponseEntity<>(response, HttpStatus.OK);
		}

		List<Patient> patientList = patientRepository.findByEmail(account.getEmail());


		if (!patientList.isEmpty()) {
			// Must be a patient!

			Token token = new Token(account.getEmail(), List.of("patient"));
			String encryptedToken = tokenService.encrypt((new Gson()).toJson(token));
			LoginResponse response = new LoginResponse(account.getEmail(), encryptedToken);

			return new ResponseEntity<>(response, HttpStatus.OK);
		}

		// We are SOL because we have an account without an associated patient or staff member object.
		// Status code 418 is hilarious. enSee: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418
		return new ResponseEntity<>(HttpStatus.valueOf(418));
	}

	@PostMapping("/signup")
	public ResponseEntity<String> processSignUpRequest(@RequestBody SignupRequestBody body) throws NoSuchAlgorithmException, InvalidKeySpecException {
		Optional<Account> accountOptional = accountRepository.findById(body.email);
		if (accountOptional.isPresent()) {
			// Account already exists
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		// Exception added to method signature. This can probably throw a 500, though unlikely
		String encodedPassword = passwordService.hashPassword(body.password);
		Account account = new Account(body.email, encodedPassword);


		Patient patient = new Patient(body.ssn, body.email, body.firstName, body.lastName, body.dob, body.phone, body.sex, body.lang, body.weight, body.height);

		LOG.info(String.format("Account created %s", account));
		LOG.info(String.format("Patient record created %s", patient));

		accountRepository.saveAndFlush(account);
		patientRepository.saveAndFlush(patient);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequireToken
	@GetMapping("/roles")
	public ResponseEntity<RolesResponse> getRoles(@RequestHeader("Authorization") String token) {
		String tokenValue = tokenService.getTokenFromBearerToken(token);
		Token t = tokenService.getToken(tokenValue);
		RolesResponse rolesResponse = new RolesResponse(t.getRoles());
		return new ResponseEntity<>(rolesResponse, HttpStatus.OK);
	}

}
