package org.cc.prodentalcareapi.model.response;

import java.util.Date;

public interface AppointmentSummary {
    String getDentistNotes(); //Get appointment dentist notes
    Date getDate(); //Get appointment date
}
