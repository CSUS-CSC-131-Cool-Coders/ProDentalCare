// StaffRoleId.java
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class StaffRoleId implements Serializable {
    @Column(name = "staff_id_fk")
    private String staffId;

    @Column(name = "role")
    private String role;

    public StaffRoleId() {}

    public StaffRoleId(String staffId, String role) {
        this.staffId = staffId;
        this.role = role;
    }

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

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        staffRoleId that = (staffRoleId) other;
        return Objects.equals(staffId, that.staffId) && Objects.equals(role, that.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(staffId, role);
    }
}
