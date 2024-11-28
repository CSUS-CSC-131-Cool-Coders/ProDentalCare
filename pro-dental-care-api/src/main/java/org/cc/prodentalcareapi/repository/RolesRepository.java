package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends JpaRepository<Roles, String> { }
