package org.cc.prodentalcareapi.security;

import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.KeySpec;
import java.util.Base64;

/**
 * The purpose of this class is to send tokens to be used on the client that aren't easily decryptable without knowing
 * the exact password. In the real world this password will be changed to and from, but it's basically ensuring that
 * we can encode roles into a token when they login that they keep in localstorage that they pass into the headers
 * of a request when they make any requests. This is a very simple and not secure implementation of this, but it will
 * achieve the desired effect for our simple application. @Service annotation makes it injectable via dependency
 * injection.
 * */
@Service
public class TokenService {

	private static final String KEY = "aOtlDWahq]^v.x}{";
	private static final String AES = "AES";

	private static final SecretKeySpec keySpec = new SecretKeySpec(KEY.getBytes(), AES);

	public TokenService() {}

	public String encrypt(String token) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		Cipher cipher = Cipher.getInstance(AES);
		cipher.init(Cipher.ENCRYPT_MODE, keySpec);
		byte[] encryptedToken = cipher.doFinal(token.getBytes());
		return Base64.getEncoder().encodeToString(encryptedToken);
	}

	public String decryptToken(String encryptedToken) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		Cipher cipher = Cipher.getInstance(AES);
		cipher.init(Cipher.DECRYPT_MODE, keySpec);
		byte[] token = Base64.getDecoder().decode(encryptedToken);
		return new String(cipher.doFinal(token));
	}

	public KeySpec getKeySpec() {
		return keySpec;
	}

	public boolean isValidToken(String encryptedToken) {
		try {
			decryptToken(encryptedToken);
		} catch (Exception e) {
			System.err.println(e.getMessage());
			return false;
		}
		return true;
	}

	public Token getToken(String encryptedToken) {
		String decryptedToken;
		try {
			decryptedToken = decryptToken(encryptedToken);
		} catch (Exception e) {
			System.err.printf("Error decrypting token to get role: %s\n", e.getMessage());
			throw new RuntimeException(e);
		}

		return (new Gson()).fromJson(decryptedToken, Token.class);
	}

	public boolean hasRole(String encryptedToken, String role) {
		Token token = getToken(encryptedToken);
		return hasRole(token, role);
	}

	public boolean hasRole(Token token, String role) {
		return token.getRoles().contains(role);
	}

	public String getTokenFromBearerToken(String bearerToken) {
		return bearerToken.substring("Bearer ".length());
	}
}
