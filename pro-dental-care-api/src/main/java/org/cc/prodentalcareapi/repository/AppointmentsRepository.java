package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentsRepository extends JpaRepository<Appointments, Integer> {

	List<Appointments> findAllAppointmentsByPatientIdOrderByDateAsc(String patientId);

}
