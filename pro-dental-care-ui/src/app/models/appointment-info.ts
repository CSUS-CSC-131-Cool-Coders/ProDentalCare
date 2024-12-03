export interface AppointmentInfo {
  appointmentId: number;
  date: string; // ISO date string
  status: string;
  dentistNotes: string;
  patientId: string;
  staffMembers: StaffInfo[];
}

export interface StaffInfo {
  staffId: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date string
  name?: string; // Optional: Combine first and last name for frontend use
}
