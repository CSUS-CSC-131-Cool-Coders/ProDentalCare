package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.StaffAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffAvailabilityRepository extends JpaRepository<StaffAvailability, Integer> {
	List<StaffAvailability> findByStaffId(String staffId);
}
