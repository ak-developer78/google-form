
export interface FormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  role: string;
  location: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  cv: File | null;
}

export enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUBMITTED = 'SUBMITTED',
}
