package org.cc.prodentalcareapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "immunization_records")
public class ImmunizationRecord {

    @Id
    private String date;
    private String immunization;

    // Getters and setters
    public String getDate() {
        return date;
    }

    public void setDate(string date) {
        this.date = date;
    }

    public String getImmunization() {
        return immunization;
    }

    public void setComment(String immunization) {
        this.immunization = immunization;
    }
}
