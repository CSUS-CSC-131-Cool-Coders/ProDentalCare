package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.LabRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabRecordRepository extends JpaRepository<LabRecord, Integer> {
	List<LabRecord> findAllByPatientId(String patientId);
	// Custom query methods can be added here if needed
}
