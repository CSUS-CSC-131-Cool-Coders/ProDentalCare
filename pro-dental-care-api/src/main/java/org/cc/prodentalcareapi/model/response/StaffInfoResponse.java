package org.cc.prodentalcareapi.model.response;

public class StaffInfoResponse {

    private StaffInfo staffInfo;

    public StaffInfoResponse() {
        this.staffInfo = new StaffInfo();
    }

    // Getters and Setters
    public StaffInfo getStaffInfo() {
        return staffInfo;
    }

    public void setStaffInfo(StaffInfo staffInfo) {
        this.staffInfo = staffInfo;
    }

    // Nested Class Representing Sections
    public static class StaffInfo {

        private String position;
        private String fullName;
        private String staffId;
        private String dateOfBirth;
        private String sex;
        private String payRate;

        // Getters and Setters
        public String getPosition() {
            return position;
        }

        public void setPosition(String position) {
            this.position = position;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getStaffId() {
            return staffId;
        }

        public void setStaffId(String staffId) {
            this.staffId = staffId;
        }

        public String getDateOfBirth() {
            return dateOfBirth;
        }

        public void setDateOfBirth(String dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
        }

        public String getSex() {
            return sex;
        }

        public void setSex(String sex) {
            this.sex = sex;
        }

        public String getPayRate() {
            return payRate;
        }

        public void setPayRate(String payRate) {
            this.payRate = payRate;
        }
    }
}
