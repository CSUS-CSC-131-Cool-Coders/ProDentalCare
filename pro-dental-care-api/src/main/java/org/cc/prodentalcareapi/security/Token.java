package org.cc.prodentalcareapi.security;

import java.util.HashSet;
import java.util.Set;

public class Token {

	private String username;
	private final Set<String> roles;

	public Token(String username) {
		this.username = username;
		this.roles = new HashSet<>();
	}

	public Token(String username, Set<String> roles) {
		this.username = username;
		this.roles = roles;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public final Set<String> getRoles() {
		return roles;
	}
}
