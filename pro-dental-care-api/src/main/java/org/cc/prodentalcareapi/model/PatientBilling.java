package org.cc.prodentalcareapi.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;


@Entity
@Table(name = "bills")
public class PatientBilling{

    @Id
    @Column(name = "bill_id")
    private int billId;

    @Column(name = "patient_id_fk", length = 9, columnDefinition = "char(9)")
    private String patientId;

    @Column(name = "amount", precision = 10, scale = 0)
    private BigDecimal payAmount;

    @Temporal(TemporalType.DATE)
    @Column(name = "due_date")
    private Date dueDate;

    @Column(name = "status", length = 16)
    private String payStatus;

    @Temporal(TemporalType.DATE)
    @Column(name = "paid_date")
    private Date paidDate;

    public PatientBilling(String patientId, BigDecimal payAmount, Date dueDate, String payStatus, int billId, Date paidDate) {
        this.patientId = patientId;
        this.payAmount = payAmount;
        this.dueDate = dueDate;
        this.payStatus = payStatus;
        this.billId = billId;
        this.paidDate = paidDate;
    }
    public PatientBilling() {}

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public BigDecimal getPayAmount() {
        return payAmount;
    }

    public void setPayAmount(BigDecimal payAmount) {
        this.payAmount = payAmount;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getPayStatus() {
        return payStatus;
    }

    public void setPayStatus(String payStatus) {
        this.payStatus = payStatus;
    }

    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }

    public Date getPaidDate() { return paidDate; }

    public void setPaidDate(Date paidDate) { this.paidDate = paidDate; }
}
