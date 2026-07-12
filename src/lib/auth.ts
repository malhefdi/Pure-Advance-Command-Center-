export interface SessionUser {
  id: string;
  name: string;
  role: "ceo" | "operator" | "finance" | "admin";
}

export function getCurrentUser(): SessionUser {
  const configuredRole = process.env.COMMAND_CENTER_ROLE;
  const role: SessionUser["role"] =
    configuredRole === "ceo" ||
    configuredRole === "operator" ||
    configuredRole === "finance" ||
    configuredRole === "admin"
      ? configuredRole
      : "operator";

  return {
    id: "configured-operator",
    name: process.env.COMMAND_CENTER_DISPLAY_NAME?.trim() || "Authorized operator",
    role,
  };
}

export function canAccessRestrictedFinance(user: SessionUser) {
  return user.role === "ceo" || user.role === "finance" || user.role === "admin";
}
