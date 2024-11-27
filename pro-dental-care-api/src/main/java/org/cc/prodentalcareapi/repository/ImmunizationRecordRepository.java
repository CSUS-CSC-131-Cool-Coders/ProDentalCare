package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.ImmunizationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImmunizationRecordRepository extends JpaRepository<ImmunizationRecord, Long> {
    // Add custom query methods if necessary
}
