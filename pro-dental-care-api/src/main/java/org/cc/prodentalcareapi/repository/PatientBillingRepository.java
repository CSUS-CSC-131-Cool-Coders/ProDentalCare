package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.PatientBilling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientBillingRepository extends JpaRepository<PatientBilling, Long> {
	List<PatientBilling> findAllByPatientIdOrderByDueDateAsc(String patientId);
}
