package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "allergy_records")
public class AllergyRecord {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "allergy_id")
    private int allergyId;

    @Column(name = "patient_id_fk", length = 9, columnDefinition = "char(9)")
    private String patientId;

    @Column(name = "allergy", length = 200)
    private String allergy;

    @Column(name = "comment", length = 200)
    private String comment;

    // Getters and setters
    public String getAllergy() {
        return allergy;
    }

    public void setAllergy(String allergy) {
        this.allergy = allergy;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public int getAllergyId() {
		return allergyId;
	}

	public void setAllergyId(int allergyId) {
		this.allergyId = allergyId;
	}
}
