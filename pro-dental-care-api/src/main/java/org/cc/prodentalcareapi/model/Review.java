package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "reviews")
public class review
{
    @Id
    @Column(name = "patient_id_fk", length = 9)
    private String patient_id_fk;

    @Column(name = "appt_id_fk")
    private int appt_id_fk;
    
    @Column(name = "contents", length = 200)
    private String contents;
    
    public void setPatientId(String id)
    {
        patient_id_fk = id;
    }

    public void setAppt_ID(int id)
    {
        appt_ID = id;
    }

    public void setContents(String contents)
    {
        this.contents = contents;
    }

    public String getPatientId()
    {
        return patient_id_fk;
    }

    public int getAppt_ID()
    {
        return appt_id_fk;
    }

    public String getContents()
    {
        return contents;
    }
}
