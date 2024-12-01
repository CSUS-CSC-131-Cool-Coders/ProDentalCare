package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "patient")
public class Patient {

	@Id
	@Column(name = "patient_id", length = 9, columnDefinition = "char(9)")
	private String patientId;

	@Column(name = "email_fk", length = 128)
	private String email;

	@Column(name = "fname", length = 40)
	private String firstName;

	@Column(name = "lname", length = 40)
	private String lastName;

	@Temporal(TemporalType.DATE)
	@Column(name = "dob")
	private Date dateOfBirth;

	@Column(name = "phone_no", length = 11)
	private String phoneNumber;

	@Column(name = "race", length = 40)
	private String race;

	@Column(name = "marital_status", length = 40)
	private String maritalStatus;

	@Column(name = "phone_type", length = 40)
	private String phoneType;

	@Column(name = "country", length = 40)
	private String country;

	@Column(name = "state", length = 40)
	private String state;

	@Column(name = "city", length = 40)
	private String city;

	@Column(name = "address_one", length = 128)
	private String addressOne;

	@Column(name = "address_two", length = 128)
	private String addressTwo;

	@Column(name = "zip_code", length = 5)
	private String zipCode;

	@Column(name = "sex", length = 40)
	private String sex;

	@Column(name = "lang_code", length = 2, columnDefinition = "char(2)")
	private String langCode;

	@Column(name = "weight")
	private int weight;

	@Column(name = "height")
	private int height;

	public Patient(String patientId,
				   String email,
				   String firstName,
				   String lastName,
				   Date dob,
				   String phoneNumber,
				   String sex,
				   String race,
				   String maritalStatus,
				   String phoneType,
				   String city,
				   String country,
				   String state,
				   String addressOne,
				   String addressTwo,
				   String zipCode,
				   String langCode,
				   int weight,
				   int height) {
		setPatientId(patientId);
		setEmail(email);
		setFirstName(firstName);
		setLastName(lastName);
		setDateOfBirth(dob);
		setPhoneNumber(phoneNumber);
		setSex(sex);
		setRace(race);
		setMaritalStatus(maritalStatus);
		setPhoneType(phoneType);
		setCountry(country);
		setState(state);
		setAddressOne(addressOne);
		setAddressTwo(addressTwo);
		setZipCode(zipCode);
		setCity(city);
		setLangCode(langCode);
		setWeight(weight);
		setHeight(height);
	}

	public Patient() {}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
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

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getRace() {
		return race;
	}

	public void setRace(String race) {
		this.race = race;
	}

	public String getMaritalStatus() {
		return maritalStatus;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	public String getPhoneType() {
		return phoneType;
	}

	public void setPhoneType(String phoneType) {
		this.phoneType = phoneType;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getAddressOne() {
		return addressOne;
	}

	public void setAddressOne(String addressOne) {
		this.addressOne = addressOne;
	}

	public String getAddressTwo() {
		return addressTwo;
	}

	public void setAddressTwo(String addressTwo) {
		this.addressTwo = addressTwo;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getLangCode() {
		return langCode;
	}

	public void setLangCode(String langCode) {
		this.langCode = langCode;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}
}
