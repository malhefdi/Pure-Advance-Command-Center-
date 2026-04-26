export interface SessionUser {
  id: string;
  name: string;
  role: "ceo" | "operator" | "finance" | "admin";
}

export function getCurrentUser(): SessionUser {
  return { id: "user-sultan", name: "Sultan", role: "ceo" };
}

export function canAccessRestrictedFinance(user: SessionUser) {
  return user.role === "ceo" || user.role === "finance" || user.role === "admin";
}
