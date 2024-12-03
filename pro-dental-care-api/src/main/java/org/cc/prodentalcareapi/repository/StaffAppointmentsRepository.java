package org.cc.prodentalcareapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.cc.prodentalcareapi.model.StaffAppointments;
import org.cc.prodentalcareapi.model.StaffAppointmentId;
import java.util.List;

@Repository
public interface StaffAppointmentsRepository extends JpaRepository<StaffAppointments, StaffAppointmentId> {

    List<StaffAppointments> findByStaffAppointmentIdStaffId(String staffId);

    List<StaffAppointments> findByStaffAppointmentIdAppointmentId(int appointmentId);

    void deleteByStaffAppointmentId(int appointmentId);
}
