package org.cc.prodentalcareapi.model.response;

import org.cc.prodentalcareapi.model.Appointments;

public class AppointmentsWithStaffName {

	private String staffName;
	private Appointments appointment;

	public AppointmentsWithStaffName(Appointments appointment) {
		this.appointment = appointment;
	}

	public AppointmentsWithStaffName() {}

	public String getStaffName() {
		return staffName;
	}

	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}

	public Appointments getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointments appointment) {
		this.appointment = appointment;
	}
}
