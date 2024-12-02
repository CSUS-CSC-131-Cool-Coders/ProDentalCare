package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.StaffMember;
import org.cc.prodentalcareapi.model.response.StaffInfoResponse;
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

import java.util.List;

@RestController
@RequestMapping("/staff")
public class StaffInfoImpl {

    private final TokenService tokenService;
    private final StaffMemberRepository staffMemberRepository;

    @Autowired
    public StaffInfoImpl(TokenService tokenService, StaffMemberRepository staffMemberRepository) {
        this.tokenService = tokenService;
        this.staffMemberRepository = staffMemberRepository;
    }

    @RequireToken
    @GetMapping("/staff-information")
    public ResponseEntity<StaffInfoResponse> getStaffInfo(@RequestHeader(name = "Authorization") String token) {
        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

        if (t == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = t.getUsername();
        if (ObjectUtils.isEmpty(email)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Retrieve staff record by email
        List<StaffMember> staffList = staffMemberRepository.findByEmail(email);
        if (staffList.size() != 1) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        StaffMember staff = staffList.get(0);

        // Build and return the response
        StaffInfoResponse response = buildStaffInfoResponse(staff);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private StaffInfoResponse buildStaffInfoResponse(StaffMember staff) {
        StaffInfoResponse response = new StaffInfoResponse();

        StaffInfoResponse.StaffInfo staffInfo = new StaffInfoResponse.StaffInfo();
        staffInfo.setFullName(staff.getFirstName() + " " + staff.getLastName());
        staffInfo.setPosition(staff.getPosition());
        staffInfo.setStaffId(staff.getStaffId());
        staffInfo.setDateOfBirth(staff.getDateOfBirth().toString());
        staffInfo.setSex(staff.getSex());
        staffInfo.setPayRate(staff.getHourlyRate().toString());
        // Set other fields as needed

        response.setStaffInfo(staffInfo);

        return response;
    }
}
