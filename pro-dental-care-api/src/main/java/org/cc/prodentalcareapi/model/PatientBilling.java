package org.cc.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "payment_option")
public class PatientPaymentOption {
     @Id
    @Column(name = "patient_id_fk", length = 9, columnDefinition = "char(9)")
    private String patientId;

    @Column(name = "amount")
    private numeric payAmount;

    @Temporal(TemporalType.DATE)
    @Column(name = "due_date")
    private Date dueDate;

    @Column(name = "status", length = 16)
    private String payStatus;

    @Column(name = "bill_id")
    private int billId;

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public numeric getPaymentAmount() {
        return payAmount;
    }

    public void setPaymentAmount(numeric payAmount) {
        this.payAmount = payAmount;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return payStatus;
    }

    public void setStatus(String payStatus) {
        this.payStatus = payStatus;
    }

    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }
}
