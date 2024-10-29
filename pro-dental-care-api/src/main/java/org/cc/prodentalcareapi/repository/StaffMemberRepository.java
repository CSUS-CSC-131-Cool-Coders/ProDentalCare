package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.StaffMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffMemberRepository extends JpaRepository<StaffMember, String> { }
