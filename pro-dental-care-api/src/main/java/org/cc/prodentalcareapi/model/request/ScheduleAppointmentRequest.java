package org.cc.prodentalcareapi.model.request;

import java.util.Date;

/**
 * Request model for scheduling an appointment.
 */
public class ScheduleAppointmentRequest {
    private String date; // Format: "yyyy-MM-dd"
    private String time; // Format: "HH:mm"
    private String staffMemberId;

    // Getters and Setters
    public Date getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStaffMemberId() {
        return staffMemberId;
    }

    public void setStaffMemberId(String staffMemberId) {
        this.staffMemberId = staffMemberId;
    }
}
