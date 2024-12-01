package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Roles {

    @EmbeddedId
    private RoleId roleId;

	public RoleId getRoleId() {
		return roleId;
	}

	public void setRoleId(RoleId roleId) {
		this.roleId = roleId;
	}
}