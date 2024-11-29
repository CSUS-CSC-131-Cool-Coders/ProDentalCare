package org.cc.prodentalcareapi.model.response;

import java.util.List;

public class AdminStaffInfoResponse {
    private List<StaffMemberDTO> staffMembers;

    public AdminStaffInfoResponse() {}

    public AdminStaffInfoResponse(List<StaffMemberDTO> staffMembers) {
        this.staffMembers = staffMembers;
    }

    public List<StaffMemberDTO> getStaffMembers() {
        return staffMembers;
    }

    public void setStaffMembers(List<StaffMemberDTO> staffMembers) {
        this.staffMembers = staffMembers;
    }
}
