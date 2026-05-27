export type UserRole = "estudiante" | "instructor" | "admin";

export type UserPlan = "free" | "pro";

export type User = {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  plan: UserPlan;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};
