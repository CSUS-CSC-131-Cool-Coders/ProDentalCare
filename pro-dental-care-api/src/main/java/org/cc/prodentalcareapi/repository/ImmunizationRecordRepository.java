package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.ImmunizationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImmunizationRecordRepository extends JpaRepository<ImmunizationRecord, String> {
	List<ImmunizationRecord> findAllByPatientId(String patientId);
	// Custom query methods can be added here if needed
}
