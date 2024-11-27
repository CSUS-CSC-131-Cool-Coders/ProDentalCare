package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.LabRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabRecordRepository extends JpaRepository<LabRecord, Long> {
    // Add custom query methods if necessary
}
