package org.cc.prodentalcareapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "account")
public class Account {

	@Id
	@Column(name = "email", length = 128)
	private String email;

	@Column(name = "pass_hash", length = 128)
	private String passHash;

	@Column(name = "enabled")
	private boolean enabled;

	public Account(String email, String passHash, boolean enabled) {
		setEmail(email);
		setPassHash(passHash);
		setEnabled(enabled);
	}

	public Account(String email, String passHash) {
		setEmail(email);
		setPassHash(passHash);
		setEnabled(true);
	}

	public Account() {}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassHash() {
		return passHash;
	}

	public void setPassHash(String passHash) {
		this.passHash = passHash;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
}
