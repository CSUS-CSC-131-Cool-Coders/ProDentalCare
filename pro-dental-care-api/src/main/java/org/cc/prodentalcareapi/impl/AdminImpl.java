package org.cc.prodentalcareapi.impl;

import org.cc.prodentalcareapi.model.StaffMember;
import org.cc.prodentalcareapi.model.response.AdminStaffInfoResponse;
import org.cc.prodentalcareapi.model.response.StaffMemberDTO;
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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/admin")
public class AdminImpl {

    private final TokenService tokenService;
    private final StaffMemberRepository staffMemberRepository;

    @Autowired
    public AdminImpl(TokenService tokenService, StaffMemberRepository staffMemberRepository) {
        this.tokenService = tokenService;
        this.staffMemberRepository = staffMemberRepository;
    }

    @RequireToken
    @GetMapping("/staff-information")
    public ResponseEntity<AdminStaffInfoResponse> getStaffInfo(@RequestHeader(name = "Authorization") String token) {
        String tokenValue = tokenService.getTokenFromBearerToken(token);
        Token t = tokenService.getToken(tokenValue);

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

        // Map StaffMember entities to StaffMemberDTOs
        List<StaffMemberDTO> staffDTOs = new ArrayList<>();
        for (StaffMember staff : staffMembers) {
            StaffMemberDTO dto = new StaffMemberDTO();
            dto.setStaffId(staff.getStaffId());
            dto.setEmail(staff.getEmail());
            dto.setFirstName(staff.getFirstName());
            dto.setLastName(staff.getLastName());
            dto.setDateOfBirth(staff.getDateOfBirth());
            dto.setSex(staff.getSex());
            // Assuming StaffMember.java has these fields; otherwise, adjust accordingly
            // dto.setPosition(staff.getPosition());
            // dto.setPay(staff.getPay());
            // dto.setYearsWorked(staff.getYearsWorked());
            // dto.setContactNumber(staff.getContactNumber());
            // dto.setQualifications(staff.getQualifications());

            // Add additional mappings as necessary

            staffDTOs.add(dto);
        }

        // Construct the response
        AdminStaffInfoResponse response = new AdminStaffInfoResponse();
        response.setStaffMembers(staffDTOs);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
