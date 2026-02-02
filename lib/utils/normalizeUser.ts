import { AuthUser } from "@/lib/types/AuthUser";

type RawUser = {
  _id?: string;
  id?: string;
  fullName?: string;
  fullname?: string;
  email?: string;
  profilePicture?: string | null;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const normalizeUser = (raw: unknown): AuthUser => {
  const user = raw as RawUser;

  return {
    id: user._id ?? user.id ?? "",
    fullName: user.fullName ?? user.fullname ?? "",
    email: user.email ?? "",
    profilePicture: user.profilePicture ?? null,
    role: user.role ?? "user",
    createdAt: user.createdAt ?? new Date().toISOString(),
    updatedAt: user.updatedAt,
  };
};
