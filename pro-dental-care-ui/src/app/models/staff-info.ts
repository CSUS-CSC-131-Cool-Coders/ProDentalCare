// src/app/models/staff-info.ts

export interface StaffInfo {
  staffId: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Alternatively, use Date
  position: string;
  hourlyRate: number;
}
