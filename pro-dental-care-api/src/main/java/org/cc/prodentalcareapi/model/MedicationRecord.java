package org.cc.prodentalcareapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "medication_records")
public class MedicationRecord {

    @Id
    private String date;
    private String medication;
    private String directions;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String meds) {
        this.medication = medication;
    }

    public String getDirections() {
        return directions;
    }

    public void setNotes(String directions) {
        this.directions = directions;
    }
}
