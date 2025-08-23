
export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface UserState {
  user: User | null; 
  addUser: (user: User) => void; 
  removeUser: () => void; 
}


interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  createdBy: string; // Employer userId
}

interface Applicant {
  _id: string;
  name: string;
  email: string;
}

interface Application {
  _id: string;
  jobId: Job;
  userId: Applicant;
  coverLetter?: string;
  resume?: string;
  status: "applied" | "shortlisted" | "rejected";
}

interface ApplicationDetailProps {
  application: Application;
  currentUserId: string; // you’ll pass in the logged-in user._id
  onUpdateStatus?: (status: "shortlisted" | "rejected") => void;
}