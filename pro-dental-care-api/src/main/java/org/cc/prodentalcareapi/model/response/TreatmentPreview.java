package org.cc.prodentalcareapi.model.response;

public class TreatmentPreview {
    public String treatment;
    public String start_time;
    public String end_time;
    public String provider;

    public TreatmentPreview(String treatment, String start_time, String end_time, String provider) {
        this.treatment = treatment;
        this.start_time = start_time;
        this.end_time = end_time;
        this.provider = provider;
    }
}
