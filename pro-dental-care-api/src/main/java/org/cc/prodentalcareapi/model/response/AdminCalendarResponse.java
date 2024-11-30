package org.cc.prodentalcareapi.model.response;

import java.util.List;

public class AdminCalendarResponse {

    private List<EventInfo> events;

    // Getter and Setter
    public List<EventInfo> getEvents() {
        return events;
    }

    public void setEvents(List<EventInfo> events) {
        this.events = events;
    }

    public static class EventInfo {
        private Long eventId;
        private String title;
        private String startTime; // Use String for date-time format
        private String endTime;
        private String eventType;
        private String staffMemberName; // Combine first and last name
        private String notes;

        // Getters and Setters

        public Long getEventId() {
            return eventId;
        }

        public void setEventId(Long eventId) {
            this.eventId = eventId;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getStartTime() {
            return startTime;
        }

        public void setStartTime(String startTime) {
            this.startTime = startTime;
        }

        public String getEndTime() {
            return endTime;
        }

        public void setEndTime(String endTime) {
            this.endTime = endTime;
        }

        public String getEventType() {
            return eventType;
        }

        public void setEventType(String eventType) {
            this.eventType = eventType;
        }

        public String getStaffMemberName() {
            return staffMemberName;
        }

        public void setStaffMemberName(String staffMemberName) {
            this.staffMemberName = staffMemberName;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }
    }
}
