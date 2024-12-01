package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.PatientTreatmentPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientTreatmentRepository extends JpaRepository<PatientTreatmentPlan, String> {

    List<PatientTreatmentPlan> findAllByPatientIdOrderByPatientId(String patientId);
}
