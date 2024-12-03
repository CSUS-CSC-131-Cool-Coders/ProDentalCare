package org.cc.prodentalcareapi.model.request;

import java.math.BigDecimal;
import java.util.Date;

public class paymentProcessBody {
    public String patientId;
    public String cardHolder;
    public String cardNumber;
    public Date expDate;
    public String cvc;
    public String address;
    public String address2;
    public String city;
    public String state;
    public String zip;

    public String paymentOption;


}
