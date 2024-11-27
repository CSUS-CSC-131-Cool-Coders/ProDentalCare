package org.cc.prodentalcareapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class StaffAppointmentId implements Serializable {
    @Column(name = "staff_id_fk", length = 9, columnDefinition = "char(9)")
    private String staffId;

    @Column(name = "appt_id_fk")
    private int appointmentId;

    public StaffAppointmentId() {}

    public StaffAppointmentId(String staffId, int appointmentId) {
        this.staffId = staffId;
        this.appointmentId = appointmentId;
    }

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public int getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof StaffAppointmentId))
            return false;
        StaffAppointmentId that = (StaffAppointmentId) other;
        return appointmentId == that.appointmentId && Objects.equals(staffId, that.staffId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(staffId, appointmentId);
    }
}

