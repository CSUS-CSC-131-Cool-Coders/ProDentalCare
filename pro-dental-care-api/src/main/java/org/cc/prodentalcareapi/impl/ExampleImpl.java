package org.cc.prodentalcareapi.impl;

import java.util.List;

import com.google.gson.Gson;
import org.cc.prodentalcareapi.security.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class ExampleImpl {
	private final TokenService tokenService;

	public ExampleImpl(TokenService tokenService) {
		this.tokenService = tokenService;
	}

	public class Token {
		public String username;
		public List<String> roles;
	}

	public static class LoginBody {
		public String username;
		public String password;
	}

	public static class LoginResponse {
		public String token;
		public int ttl;
	}

	@GetMapping("/example/login")
	public ResponseEntity<LoginResponse> exampleLogin(@RequestBody LoginBody loginDetail) {

		// check login
		if (!"admin".equalsIgnoreCase(loginDetail.password)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); //401
		}


		Token token = new Token();
		token.username = loginDetail.username;
		token.roles = loginDetail.username.equals("admin") ? List.of("admin", "dentist") : List.of("dentist");

		String tokenJsonUnencrypted = (new Gson()).toJson(token);
		String encryptedToken;

		try {
			encryptedToken = tokenService.encrypt(tokenJsonUnencrypted);
		} catch (Exception e) {
			System.err.print(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); //500
		}

		LoginResponse response = new LoginResponse();
		response.token = encryptedToken;
		response.ttl = 1800;

		return new ResponseEntity<>(response, HttpStatus.OK); //200
	}

	@GetMapping("/example/roles")
	public ResponseEntity<String> exampleAuthorizedRequest(@RequestHeader String token) {
		String decryptedToken;

		try {
			decryptedToken = tokenService.decryptToken(token);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); //500
		}

		Token tokenObj = (new Gson()).fromJson(decryptedToken, Token.class);

		StringBuilder sb = new StringBuilder();
		tokenObj.roles.forEach(s -> {
			sb.append(s);
			sb.append(",");
		});
		return new ResponseEntity<>(sb.toString(), HttpStatus.OK); //200
	}
}