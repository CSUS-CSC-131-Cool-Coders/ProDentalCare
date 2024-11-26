
package org.cc.prodentalcareapi.model;
import jakarta.persistence.*;

@Entity
@Table(name = "staff_roles")

public class StaffRoles {

	@EmbeddedId
	private StaffRoleId staffRoleId;

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
		
