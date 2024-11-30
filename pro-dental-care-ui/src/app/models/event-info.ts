export interface EventInfo {
  eventId: number;
  title: string;
  startTime: string; // Consider using Date if preferred
  endTime: string;
  eventType: string;
  staffMemberName: string;
  notes: string;
}
