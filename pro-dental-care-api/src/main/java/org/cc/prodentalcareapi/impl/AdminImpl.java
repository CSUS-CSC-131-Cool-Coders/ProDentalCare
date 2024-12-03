package org.cc.prodentalcareapi.impl;


import org.cc.prodentalcareapi.model.Appointments;
import org.cc.prodentalcareapi.model.StaffMember;
import org.cc.prodentalcareapi.model.StaffAppointments;
import org.cc.prodentalcareapi.model.response.AdminAppointmentsResponse;
import org.cc.prodentalcareapi.model.response.AdminAppointmentsResponse.AppointmentInfo;
import org.cc.prodentalcareapi.model.response.AdminStaffInfoResponse;
import org.cc.prodentalcareapi.repository.AppointmentsRepository;
import org.cc.prodentalcareapi.repository.StaffAppointmentsRepository;
import org.cc.prodentalcareapi.repository.StaffMemberRepository;
import org.cc.prodentalcareapi.security.RequireToken;
import org.cc.prodentalcareapi.security.Token;
import org.cc.prodentalcareapi.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminImpl {

    private final TokenService tokenService;
    private final StaffMemberRepository staffMemberRepository;
    private final AppointmentsRepository appointmentsRepository;
    private final StaffAppointmentsRepository staffAppointmentsRepository;

    @Autowired
    public AdminImpl(TokenService tokenService,
                     StaffMemberRepository staffMemberRepository,
                     AppointmentsRepository appointmentsRepository,
                     StaffAppointmentsRepository staffAppointmentsRepository) {
        this.tokenService = tokenService;
        this.staffMemberRepository = staffMemberRepository;
        this.appointmentsRepository = appointmentsRepository;
        this.staffAppointmentsRepository = staffAppointmentsRepository;
    }

    @RequireToken
    @GetMapping("/staff-information")
    public ResponseEntity<AdminStaffInfoResponse> getStaffInfo(@RequestHeader(name = "Authorization") String token) {
        // Extract token from Bearer token
        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

        // Validate token
        if (t == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = t.getUsername();

        if (ObjectUtils.isEmpty(email)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // (Optional) Verify if the user has admin privileges
        // This depends on your token and role management implementation
        // Example:
        // if (!t.getRoles().contains("ADMIN")) {
        //     return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        // }

        // Retrieve all staff members
        List<StaffMember> staffMembers = staffMemberRepository.findAll();


        // Construct the response
        AdminStaffInfoResponse response = new AdminStaffInfoResponse();
        response.setStaffMembers(staffMembers);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequireToken
    @GetMapping("/calendar")
    public ResponseEntity<AdminAppointmentsResponse> getCalendarAppointments(@RequestHeader(name = "Authorization") String token) {
        // Extract token from Bearer token
        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

        // Validate token
        if (t == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = t.getUsername();

        if (ObjectUtils.isEmpty(email)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


        // Retrieve all appointments
        List<Appointments> appointments = appointmentsRepository.findAll();

        // Map Appointments to AppointmentInfo with assigned staff
        List<AppointmentInfo> appointmentInfos = new ArrayList<>();
        for (Appointments appt : appointments) {
            AppointmentInfo info = new AppointmentInfo();
            info.setAppointmentId(appt.getAppointmentId());
            info.setDate(appt.getDate());
            info.setStatus(appt.getStatus());
            info.setDentistNotes(appt.getDentistNotes());
            info.setPatientId(appt.getPatientId());

            // Fetch assigned staff members
            List<StaffAppointments> staffAppts = staffAppointmentsRepository.findByStaffAppointmentIdAppointmentId(appt.getAppointmentId());
            List<StaffMember> staffMembers = new ArrayList<>();
            for (StaffAppointments staffAppt : staffAppts) {
                StaffMember staff = staffMemberRepository.findById(staffAppt.getStaffAppointmentId().getStaffId()).orElse(null);
                if (staff != null) {
                    staffMembers.add(staff);
                }
            }
            info.setStaffMembers(staffMembers);
            appointmentInfos.add(info);
        }

        // Construct response
        AdminAppointmentsResponse response = new AdminAppointmentsResponse();
        response.setAppointments(appointmentInfos);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Helper method to parse date strings if needed.
     * (Implement as required based on your date format)
     */
    private Date parseDate(String dateStr) throws ParseException {
        // Example: "2023-10-01T14:30:00"
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        return formatter.parse(dateStr);
    }


}
