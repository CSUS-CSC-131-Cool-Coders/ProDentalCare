package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.Appointments;
import org.cc.prodentalcareapi.model.response.AppointmentSummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentSummaryRepository extends JpaRepository<Appointments, Integer> {
    List<AppointmentSummary> findAllAppointmentsByPatientIdOrderByDateAsc(String patientId);
}
