export interface Staff {
  id: number;
  name: string;
  position: string;
  pay: string;
  yearsWorked: number;
  email: string;
  contactNumber: string;
  qualifications: string[];
  profilePic?: string;
  availability?: string[];
}
