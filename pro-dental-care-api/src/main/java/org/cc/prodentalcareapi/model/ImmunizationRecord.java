package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.TemporalType;

import java.util.Date;

@Entity
@Table(name = "immunization_records")
public class ImmunizationRecord {

    @Id
    @Column(name = "immun_id")
    private int immunID;

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
}
