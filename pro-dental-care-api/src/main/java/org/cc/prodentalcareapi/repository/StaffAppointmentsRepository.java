package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.StaffAppointments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffAppointmentRepository extends JpaRepository<StaffAppointments, StaffAppointmentId> { }
