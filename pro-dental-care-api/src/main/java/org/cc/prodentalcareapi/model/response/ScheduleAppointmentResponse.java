package org.cc.prodentalcareapi.model.response;

/**
 * Response model for scheduling an appointment.
 */
public class ScheduleAppointmentResponse {
    private String message;
    private int appointmentId;

    // Constructors
    public ScheduleAppointmentResponse() {}

    public ScheduleAppointmentResponse(String message, int appointmentId) {
        this.message = message;
        this.appointmentId = appointmentId;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }
}
