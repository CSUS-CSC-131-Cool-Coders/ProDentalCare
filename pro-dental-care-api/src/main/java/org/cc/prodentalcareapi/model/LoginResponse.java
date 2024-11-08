package org.cc.prodentalcareapi.model;

public class LoginResponse {

	public String username;
	public String token;

	public LoginResponse() {}

	public LoginResponse(String username, String token) {
		this.username = username;
		this.token = token;
	}

}
