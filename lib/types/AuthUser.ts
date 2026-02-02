export interface AuthUser {
  id: string;
  fullName: string; 
  email: string;
  profilePicture?: string | null;
  role?: "user" | "admin" | string;
  createdAt: string;
  updatedAt?: string;
}
