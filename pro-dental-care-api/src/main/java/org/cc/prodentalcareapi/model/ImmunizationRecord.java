package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "immunization_records")
public class ImmunizationRecord {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "immun_id")
    private int immunizationId;

    @Column(name = "patient_id_fk", length = 9, columnDefinition = "char(9)")
    private String patientId;

    @Temporal(TemporalType.DATE)
    @Column(name = "immun_date")
    private Date date;

    @Column(name = "immun", length = 200)
    private String immunization;

    // Getters and setters
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getImmunization() {
        return immunization;
    }

    public void setImmunization(String immunization) {
        this.immunization = immunization;
    }

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public int getImmunizationId() {
		return immunizationId;
	}

	public void setImmunizationId(int immunizationId) {
		this.immunizationId = immunizationId;
	}
}
