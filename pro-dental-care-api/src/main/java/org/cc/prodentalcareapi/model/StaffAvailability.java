package org.cc.prodentalcareapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Timestamp;

@Entity
@Table(name = "staff_availability")
public class StaffAvailability {

	@Id
	@Column(name = "availability_id")
	private int availabilityId;

	@Column(name = "staff_id_fk", columnDefinition = "char(9)")
	private String staffId;

	@Column(name = "availability_start")
	private Timestamp availabilityStart;

	@Column(name = "availability_end")
	private Timestamp availabilityEnd;

	public StaffAvailability() {}

	public StaffAvailability(String staffId, Timestamp availabilityStart, Timestamp availabilityEnd) {
		this.staffId = staffId;
		this.availabilityStart = availabilityStart;
		this.availabilityEnd = availabilityEnd;
	}

}
