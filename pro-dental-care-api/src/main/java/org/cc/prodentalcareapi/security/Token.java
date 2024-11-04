package org.cc.prodentalcareapi.security;

import java.util.List;

public class Token {

	private String username;
	private final List<String> roles;

	public Token(String username, List<String> roles) {
		setUsername(username);
		this.roles = roles;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public final List<String> getRoles() {
		return roles;
	}
}
