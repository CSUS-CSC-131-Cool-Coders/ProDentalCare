package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.MedicationRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicationRecordRepository extends JpaRepository<MedicationRecordEntity, Long> {
    // Add custom query methods if necessary
}
