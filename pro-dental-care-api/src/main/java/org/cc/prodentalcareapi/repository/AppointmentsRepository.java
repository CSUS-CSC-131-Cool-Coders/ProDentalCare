package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppointmentsRepository extends JpaRepository<Appointments, Integer> {

	List<Appointments> findAllAppointmentsByPatientIdOrderByDateAsc(String patientId);

	// Optional: Fetch appointments with staff members eagerly
	@Query("SELECT a FROM Appointments a JOIN FETCH a.staffMembers WHERE a.patientId = :patientId ORDER BY a.date ASC")
	List<Appointments> findAllAppointmentsWithStaffByPatientIdOrderByDateAsc(String patientId);
}
