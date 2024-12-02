package org.cc.prodentalcareapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.TemporalType;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "allergy_records")
public class VisitRecordEntity {

    @Id
    @Column(name = "allergy_id")
    private int allergyId;

    @Column(name = "allergy", length = 200)
    private String allergy;

    @Column(name = "comment", length = 200)
    private String comment;

    // Getters and setters
    public String getAllergy() {
        return allergy;
    }

    public void setAllergy(string allergy) {
        this.allergy = allergy;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
