package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "appointments")
public class Appointments
{
    @Id
    @Column(name = "appt_id")
    private int appt_id;

    @Temporal(TemporalType.DATE)
    @Column(name = "appt_date")
    private Date appt_date;

    @Column(name = "status", length = 20)
    private String status;

    @Column(name = "dentist_notes", length = 200)
    private String notes;

    @Column(name = "patient_id_fk", length = 9)
    private String patient_id;

    public int getAppt_id() 
    {
        return appt_id;
    }

    public void setAppt_id(int appt_id) 
    {
        this.appt_id = appt_id;
    }

    // Getter and Setter for appt_date
    public Date getAppt_date() 
    {
        return appt_date;
    }

    public void setAppt_date(Date appt_date) 
    {
        this.appt_date = appt_date;
    }

    // Getter and Setter for status
    public String getStatus() 
    {
        return status;
    }

    public void setStatus(String status) 
    {
        this.status = status;
    }

    // Getter and Setter for notes
    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) 
    {
        this.notes = notes;
    }

    // Getter and Setter for patient_id
    public String getPatient_id() 
    {
        return patient_id;
    }

    public void setPatient_id(String patient_id) 
    {
        this.patient_id = patient_id;
    }


}