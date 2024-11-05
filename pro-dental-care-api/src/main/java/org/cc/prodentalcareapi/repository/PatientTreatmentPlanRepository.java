package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.PatientTreatmentPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientTreatmentPlanRepository extends JpaRepository<PatientTreatmentPlan, String> { }
