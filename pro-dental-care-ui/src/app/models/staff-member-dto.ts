export interface StaffMemberDTO {
  staffId: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Use string for dates; alternatively, use Date
  sex: string;
  // Add additional non-sensitive fields as necessary
  // Example:
  position?: string;
  pay?: string;
  yearsWorked?: number;
  contactNumber?: string;
  qualifications?: string[];
}
