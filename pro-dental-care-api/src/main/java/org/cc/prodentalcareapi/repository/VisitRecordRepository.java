package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.VisitRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitRecord extends JpaRepository<VisitRecordEntity, Long> {

}
