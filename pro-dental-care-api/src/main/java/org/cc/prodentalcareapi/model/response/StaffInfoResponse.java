package org.cc.prodentalcareapi.model.response;

import org.cc.prodentalcareapi.model.StaffMember;

public class StaffInfoResponse {

    private String fullName;
    private StaffMember staffMember;
    public StaffInfoResponse(String fullName, StaffMember staffMember) {
        this.fullName = fullName;
        this.staffMember = staffMember;
    }

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public StaffMember getStaffMember() {
		return staffMember;
	}

	public void setStaffMember(StaffMember staffMember) {
		this.staffMember = staffMember;
	}

	// Getters and Setters
}
