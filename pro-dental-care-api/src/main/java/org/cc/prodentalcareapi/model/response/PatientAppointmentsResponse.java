package org.cc.prodentalcareapi.model.response;

import org.cc.prodentalcareapi.model.Appointments;
import java.util.List;

public class PatientAppointmentsResponse {
    private List<Appointments> appointments;

    // Constructors
    public PatientAppointmentsResponse() {}

    public PatientAppointmentsResponse(List<Appointments> appointments) {
        this.appointments = appointments;
    }

    // Getters and Setters
    public List<Appointments> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointments> appointments) {
        this.appointments = appointments;
    }
}
