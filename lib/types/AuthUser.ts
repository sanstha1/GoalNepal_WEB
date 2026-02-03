export interface AuthUser {
  _id: string;
  fullName: string; 
  email: string;
  profilePicture?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}
