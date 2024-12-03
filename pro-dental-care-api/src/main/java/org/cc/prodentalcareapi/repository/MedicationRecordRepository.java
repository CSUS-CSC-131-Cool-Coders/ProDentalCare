package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.MedicationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicationRecordRepository extends JpaRepository<MedicationRecord, Integer> {
	List<MedicationRecord> findAllByPatientId(String patientId);
	// Custom query methods can be added here if needed
}
