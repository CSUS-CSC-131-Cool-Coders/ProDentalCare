package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.VisitRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitRecordRepository extends JpaRepository<VisitRecordEntity, String> {
    // Custom query methods can be added here if needed
}
