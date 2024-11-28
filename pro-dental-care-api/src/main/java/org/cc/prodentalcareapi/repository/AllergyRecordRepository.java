package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.AllergyRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllergyRecordRepository extends JpaRepository<AllergyRecord, String> {
    // Custom query methods can be added here if needed
}
