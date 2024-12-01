package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.Patient;
import org.cc.prodentalcareapi.model.StaffMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffMemberRepository extends JpaRepository<StaffMember, String> {
	List<StaffMember> findByEmail(String email);

	List<StaffMember> findByStaffId(String staffId);
}
