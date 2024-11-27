
package org.cc.prodentalcareapi.model;
import jakarta.persistence.*;

@Entity
@Table(name = "staff_appointments")

public class StaffAppointments {
	@EmbeddedId
	private StaffAppointmentId staffAppointmentId;

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public String getAppointmentId() {
		return appointmentId;
	}
	
	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}
}
