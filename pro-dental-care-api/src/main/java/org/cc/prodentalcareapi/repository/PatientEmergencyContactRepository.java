package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.PatientEmergencyContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientEmergencyContactRepository extends JpaRepository<PatientEmergencyContact, String> {
    List<PatientEmergencyContact> findByPatientId (String patientId);
}
