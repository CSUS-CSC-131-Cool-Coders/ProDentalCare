package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {

	List<Patient> findByEmail(String email);

}
