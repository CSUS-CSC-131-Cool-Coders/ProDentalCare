
package org.cc.prodentalcareapi.model;
import jakarta.persistence.*;

@Entity
@Table(name = "staff_appointments")

public class StaffAppointments {
	@EmbeddedId
	private StaffAppointmentId staffAppointmentId;

	public StaffAppointmentId getStaffAppointmentId() {
		return staffAppointmentId;
	}

	public void setStaffAppointmentId(StaffAppointmentId staffId) {
		this.staffAppointmentId = staffId;
	}

}
