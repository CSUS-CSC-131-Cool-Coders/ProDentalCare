package org.cc.prodentalcareapi.model.request;

public class SimpleResponse {
	private String message;

	public SimpleResponse(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
