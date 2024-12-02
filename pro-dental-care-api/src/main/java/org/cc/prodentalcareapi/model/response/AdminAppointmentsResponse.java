package org.cc.prodentalcareapi.model.response;

import java.util.Date;
import java.util.List;

public class AdminAppointmentsResponse {

    private List<AppointmentInfo> appointments;

    // Getter and Setter
    public List<AppointmentInfo> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<AppointmentInfo> appointments) {
        this.appointments = appointments;
    }

    public static class AppointmentInfo {
        private int appointmentId;
        private Date date;
        private String status;
        private String dentistNotes;
        private String patientId;
        private List<AdminStaffInfoResponse.StaffInfo> staffMembers;

        // Getters and Setters

        public int getAppointmentId() {
            return appointmentId;
        }

        public void setAppointmentId(int appointmentId) {
            this.appointmentId = appointmentId;
        }

        public Date getDate() {
            return date;
        }

        public void setDate(Date date) {
            this.date = date;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getDentistNotes() {
            return dentistNotes;
        }

        public void setDentistNotes(String dentistNotes) {
            this.dentistNotes = dentistNotes;
        }

        public String getPatientId() {
            return patientId;
        }

        public void setPatientId(String patientId) {
            this.patientId = patientId;
        }

        public List<AdminStaffInfoResponse.StaffInfo> getStaffMembers() {
            return staffMembers;
        }

        public void setStaffMembers(List<AdminStaffInfoResponse.StaffInfo> staffMembers) {
            this.staffMembers = staffMembers;
        }
    }
}
