package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "staff_member")
public class StaffMember {

	@Id
	@Column(name = "staff_id", length = 9, columnDefinition = "char(9)")
	private String staffId;

	@Column(name = "email_fk", length = 128)
	private String email;

	@Column(name="fname", length = 40)
	private String firstName;

	@Column(name="lname", length = 40)
	private String lastName;

	@Temporal(TemporalType.DATE)
	@Column(name="dob")
	private Date dateOfBirth;

	@Column(name = "sex", length = 40)
	private String sex;

	@Column(name = "bank_routing_no", length = 100)
	private String bankRoutingNumber;

	@Column(name = "bank_acc_no", length = 100)
	private String bankAccountNumber;

	public StaffMember(String staffId, String email, String firstName, String lastName, Date dateOfBirth, String sex) {
		setStaffId(staffId);
		setEmail(email);
		setFirstName(firstName);
		setLastName(lastName);
		setDateOfBirth(dateOfBirth);
		setSex(sex);
	}

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getBankRoutingNumber() {
		return bankRoutingNumber;
	}

	public void setBankRoutingNumber(String bankRoutingNumber) {
		this.bankRoutingNumber = bankRoutingNumber;
	}

	public String getBankAccountNumber() {
		return bankAccountNumber;
	}

	public void setBankAccountNumber(String bankAccountNumber) {
		this.bankAccountNumber = bankAccountNumber;
	}
}
