package org.cc.prodentalcareapi.model.response;

import java.math.BigDecimal;
import java.util.Date;

public interface PaymentAmount {
    BigDecimal getPayAmount();
    Date getDueDate();
    String getPayStatus();
    Date getPaidDate();
}
