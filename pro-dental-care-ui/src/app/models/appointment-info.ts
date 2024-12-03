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
  firstName: string;
  lastName: string;
  position: string;
  name?: string;
}
