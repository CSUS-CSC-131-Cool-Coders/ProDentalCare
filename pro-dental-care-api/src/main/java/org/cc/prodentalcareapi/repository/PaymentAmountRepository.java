package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.PatientBilling;
import org.cc.prodentalcareapi.model.response.PaymentAmount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentAmountRepository extends JpaRepository<PatientBilling, Long> {
    List<PaymentAmount> findAllByPatientIdOrderByDueDateAsc(String patientId);
    List<PaymentAmount> findAllByPatientIdOrderByPaidDateDesc(String patientId);
}

