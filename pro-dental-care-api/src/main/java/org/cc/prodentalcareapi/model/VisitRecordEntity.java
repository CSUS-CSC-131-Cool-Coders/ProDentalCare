package org.cc.prodentalcareapi.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import jakarta.persistence.Column;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "visit_records")
public class VisitRecordEntity {

    @Id
    @Column(name = "visit_id")
    private int visitId;

    @Temporal(TemporalType.DATE)
    @Column(name = "appt_date")
    private Date date;

    @Column(name = "provider", length = 20)
    private String provider;

    @Column(name = "notes", length = 200)
    private String notes;

    // Getters and setters
    public String getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
