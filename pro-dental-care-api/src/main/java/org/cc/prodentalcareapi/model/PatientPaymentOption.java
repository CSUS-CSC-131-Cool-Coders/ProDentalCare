package org.cc.prodentalcareapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;


@Entity
@Table(name = "payment_option")
public class PatientPaymentOption {

    @Id
    @Column(name = "patient_id_fk", length = 9, columnDefinition = "char(9)")
    private String patientId;

    @Column(name = "card_no", length = 16)
    private String cardNumber;

    @Temporal(TemporalType.DATE)
    @Column(name = "exp_date")
    private Date expDate;

    @Column(name = "cvc", length = 3, columnDefinition = "char(3)")
    private String cvc;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "address2", length = 100)
    private String address2;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "state", length = 100)
    private String state;

    @Column(name = "zip", length = 5, columnDefinition = "char(5)")
    private String zipCode;

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getCardNo() {
        return cardNumber;
    }

    public void setCardNo(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Date getExpDate() {
        return expDate;
    }

    public void setExpDate(Date expDate) {
        this.expDate = expDate;
    }

    public String getCVC() {
        return cvc;
    }

    public void setCVC(String cvc) {
        this.cvc = cvc;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zipCode;
    }

    public void setZip(String zipCode) {
        this.zipCode = zipCode;
    }
}