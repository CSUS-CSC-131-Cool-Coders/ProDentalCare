
package org.cc.prodentalcareapi.model;
import jakarta.persistence.*;

@Entity
@Table(name = "staff_appointments")
@IdClass(StaffAppointmentId.class)
public class StaffAppointments {

	@Id
	@Column(name = "staff_id_fk", length = 9, columnDefinition = "char(9)")
	private String staffId;

	@Id
	@Column(name = "appt_id")
	private int appointmentId;

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
