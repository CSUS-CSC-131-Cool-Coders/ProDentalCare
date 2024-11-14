package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.StaffRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRolesRepository extends JpaRepository<StaffRoles, StaffRoleId> { }
