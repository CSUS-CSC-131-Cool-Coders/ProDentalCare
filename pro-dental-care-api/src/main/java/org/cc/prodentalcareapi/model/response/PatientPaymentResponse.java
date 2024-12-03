package org.cc.prodentalcareapi.model.response;

import java.util.List;

public class PatientPaymentResponse {
    public PaymentPreview currentPayment;
    public List<PaymentAmount> totalPayment;
}
