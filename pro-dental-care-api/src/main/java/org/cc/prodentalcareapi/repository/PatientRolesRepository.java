package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.PatientRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRolesRepository extends JpaRepository<PatientRoles, String> { }
