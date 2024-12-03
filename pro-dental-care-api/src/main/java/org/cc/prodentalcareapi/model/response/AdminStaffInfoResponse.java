package org.cc.prodentalcareapi.model.response;

import org.cc.prodentalcareapi.model.StaffMember;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class AdminStaffInfoResponse {

    private List<StaffMember> staffMembers;

    public AdminStaffInfoResponse() {}

    public AdminStaffInfoResponse(List<StaffMember> staffMembers) {
        this.staffMembers = staffMembers;
    }

    public List<StaffMember> getStaffMembers() {
        return staffMembers;
    }

    public void setStaffMembers(List<StaffMember> staffMembers) {
        this.staffMembers = staffMembers;
    }
}
