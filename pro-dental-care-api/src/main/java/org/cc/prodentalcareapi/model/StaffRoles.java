
package org.cc.prodentalcareapi.model;
import jakarta.persistence.*;

@Entity
@Table(name = "staff_roles")
@IdClass(StaffRoleId.class)
public class StaffRoles {

	@Id
	@Column(name = "staff_id_fk", nullable = false, length = 9, columnDefinition = "char(9)")
	private String staffId;

	@Id
	@Column(name = "role", nullable = false, length = 64)
	private String role;

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
		
