package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.RoleId;
import org.cc.prodentalcareapi.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RolesRepository extends JpaRepository<Roles, RoleId> {

	List<Roles> findByRoleIdEmail(String email);

}
