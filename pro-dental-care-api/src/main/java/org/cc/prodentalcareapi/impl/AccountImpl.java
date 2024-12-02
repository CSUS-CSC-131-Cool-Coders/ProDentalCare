package org.cc.prodentalcareapi.impl;

import com.google.gson.Gson;
import org.cc.prodentalcareapi.model.*;
import org.cc.prodentalcareapi.model.request.LoginRequestBody;
import org.cc.prodentalcareapi.model.request.SignupRequestBody;
import org.cc.prodentalcareapi.model.request.SimpleResponse;
import org.cc.prodentalcareapi.model.request.StaffSignupRequestBody;
import org.cc.prodentalcareapi.model.response.LoginResponse;
import org.cc.prodentalcareapi.model.response.RolesResponse;
import org.cc.prodentalcareapi.repository.AccountRepository;
import org.cc.prodentalcareapi.repository.PatientRepository;
import org.cc.prodentalcareapi.repository.RolesRepository;
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
	private final RolesRepository rolesRepository;

	@Autowired
	public AccountImpl(AccountRepository accountRepository,
					   PatientRepository patientRepository,
					   StaffMemberRepository staffMemberRepository,
					   PasswordService passwordService,
					   TokenService tokenService, RolesRepository rolesRepository) {
		this.accountRepository = accountRepository;
		this.patientRepository = patientRepository;
		this.staffMemberRepository = staffMemberRepository;
		this.passwordService = passwordService;
		this.tokenService = tokenService;
		this.rolesRepository = rolesRepository;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> processLoginRequest(@RequestBody LoginRequestBody body) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
		Optional<Account> accountOptional = accountRepository.findById(body.username);
		if (accountOptional.isEmpty()) {
			// Unauthorized when no account found so attacker can't tell if an account exists or not with an email
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		Account account = accountOptional.get();

		if (!account.isEnabled()) {
			return new ResponseEntity<>(HttpStatus.LOCKED);
		}

		if(!passwordService.equals(body.password, account.getPassHash())) {
			// Password doesn't match hashed password so bad login request
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		List<Roles> roles = rolesRepository.findByRoleIdEmail(account.getEmail());

		Token token = new Token(account.getEmail());

		for (Roles role : roles) {
			token.getRoles().add(role.getRoleId().getRole());
		}

		String encryptedToken = tokenService.encrypt((new Gson()).toJson(token));
		LoginResponse response = new LoginResponse(account.getEmail(), encryptedToken);

		return new ResponseEntity<>(response, HttpStatus.OK);
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

		Patient patient = new Patient(body.ssn,
				body.email,
				body.firstName,
				body.lastName,
				body.dob,
				body.phone,
				body.sex,
				body.race,
				body.maritalStatus,
				body.phoneType,
				body.city,
				body.country,
				body.state,
				body.addressOne,
				body.addressTwo,
				body.zipCode,
				body.lang,
				body.weight,
				body.height);

		LOG.info(String.format("Account created %s", account));
		LOG.info(String.format("Patient record created %s", patient));

		Roles roles = new Roles(new RoleId(account.getEmail(), "patient"));

		accountRepository.saveAndFlush(account);
		patientRepository.saveAndFlush(patient);
		rolesRepository.saveAndFlush(roles);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/staff/signup")
	public ResponseEntity<SimpleResponse> processStaffSignUpRequest(@RequestBody StaffSignupRequestBody body) throws NoSuchAlgorithmException, InvalidKeySpecException {
		Optional<Account> accountOptional = accountRepository.findById(body.email);
		if (accountOptional.isPresent()) {
			// Account already exists
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		// Exception added to method signature. This can probably throw a 500, though unlikely
		String encodedPassword = passwordService.hashPassword(body.password);
		Account account = new Account(body.email, encodedPassword, false);

		StaffMember staffMember = new StaffMember(body.ssn,
				body.email,
				body.firstName,
				body.lastName,
				body.dob,
				body.sex,
				body.bankRoutingNo,
				body.bankAccNo);

		LOG.info(String.format("Account created %s", account));
		LOG.info(String.format("Staff record created %s", staffMember));

		Roles roles = new Roles(new RoleId(account.getEmail(), "dentist"));


		accountRepository.saveAndFlush(account);
		staffMemberRepository.saveAndFlush(staffMember);
		rolesRepository.saveAndFlush(roles);

		return new ResponseEntity<>(new SimpleResponse("Account has been successfully created, but you will need to wait for an admin to activate your account."), HttpStatus.OK);
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
