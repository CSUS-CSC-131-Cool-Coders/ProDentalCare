package org.cc.prodentalcareapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "allergy_records")
public class VisitRecordEntity {

    @Id
    private String allergy;
    private String comment;

    // Getters and setters
    public String getAllergy() {
        return allergy;
    }

    public void setAllgy(string allergy) {
        this.allergy = allergy;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
