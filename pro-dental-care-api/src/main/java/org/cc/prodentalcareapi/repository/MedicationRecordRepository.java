package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.MedicationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicationRecordRepository extends JpaRepository<MedicationRecord, String> {
    // Custom query methods can be added here if needed
}
