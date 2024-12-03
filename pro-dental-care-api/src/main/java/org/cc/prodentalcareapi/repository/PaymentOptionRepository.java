package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.PatientPaymentOption;
import org.cc.prodentalcareapi.model.response.PaymentAmount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentOptionRepository extends JpaRepository<PatientPaymentOption, Long> {
    List<PatientPaymentOption> findAllByPatientId(String patientId);
}
