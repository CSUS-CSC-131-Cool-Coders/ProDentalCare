package org.cc.prodentalcareapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.cc.prodentalcareapi.model.StaffRoles;
import org.cc.prodentalcareapi.model.StaffRoleId;
import java.util.List;

@Repository
public interface StaffRolesRepository extends JpaRepository<StaffRoles, StaffRoleId> {
    List<StaffRoles> findByStaffRoleIdStaffId(String staffId);

    List<StaffRoles> findByStaffRoleIdRole(String role);
}
