package org.cc.prodentalcareapi.security;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Service
public class PasswordService {

	private final PasswordEncoder encoder;

	public PasswordService(PasswordEncoder encoder) {
		this.encoder = encoder;
	}

	public String hashPassword(String plaintextPassword) throws NoSuchAlgorithmException, InvalidKeySpecException {
		return encoder.encode(plaintextPassword);
	}

	public boolean equals(String raw, String encoded) {
		return encoder.matches(raw, encoded);
	}

}
