package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.AllergyRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AllergyRecordRepository extends JpaRepository<AllergyRecord, Integer> {
    // Custom query methods can be added here if needed
	List<AllergyRecord> findAllByPatientId(String patientId);
}
