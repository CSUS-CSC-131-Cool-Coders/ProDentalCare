package org.cc.prodentalcareapi.model.response;

public class PaymentPreview {
	public double amount;
	public String date;
	public PaymentPreview(double amount, String date) {
		this.amount = amount;
		this.date = date;
	}
}
