import { createHash, timingSafeEqual } from "node:crypto";

export interface AccessEnvironment {
  NODE_ENV?: string;
  COMMAND_CENTER_AUTH_DISABLED?: string;
  COMMAND_CENTER_USERNAME?: string;
  COMMAND_CENTER_PASSWORD?: string;
}

export type AccessDecision =
  | { allowed: true; mode: "basic" | "development-bypass"; username: string }
  | { allowed: false; reason: "missing-configuration" | "invalid-credentials" };

function digest(value: string) {
  return createHash("sha256").update(value, "utf8").digest();
}

function secureEqual(left: string, right: string) {
  return timingSafeEqual(digest(left), digest(right));
}

export function parseBasicAuthorization(header: string | null) {
  const match = header?.trim().match(/^Basic[\t ]+([A-Za-z0-9+/]+={0,2})$/i);
  if (!match) return null;

  try {
    const token = match[1];
    const bytes = Buffer.from(token, "base64");
    const canonicalToken = bytes.toString("base64").replace(/=+$/, "");
    if (canonicalToken !== token.replace(/=+$/, "")) return null;

    const decoded = bytes.toString("utf8");
    const separator = decoded.indexOf(":");
    if (separator < 1) return null;
    return { username: decoded.slice(0, separator), password: decoded.slice(separator + 1) };
  } catch {
    return null;
  }
}

export function decideAccess(
  authorization: string | null,
  environment: AccessEnvironment = process.env,
): AccessDecision {
  const developmentBypass =
    environment.NODE_ENV !== "production" &&
    environment.COMMAND_CENTER_AUTH_DISABLED === "true";

  if (developmentBypass) {
    return { allowed: true, mode: "development-bypass", username: "local-developer" };
  }

  const expectedUsername = environment.COMMAND_CENTER_USERNAME?.trim();
  const expectedPassword = environment.COMMAND_CENTER_PASSWORD;
  if (!expectedUsername || !expectedPassword || expectedPassword.length < 16) {
    return { allowed: false, reason: "missing-configuration" };
  }

  const supplied = parseBasicAuthorization(authorization);
  if (
    !supplied ||
    !secureEqual(supplied.username, expectedUsername) ||
    !secureEqual(supplied.password, expectedPassword)
  ) {
    return { allowed: false, reason: "invalid-credentials" };
  }

  return { allowed: true, mode: "basic", username: supplied.username };
}

export function enforceApiAccess(
  request: Request,
  environment: AccessEnvironment = process.env,
) {
  const decision = decideAccess(request.headers.get("authorization"), environment);
  if (decision.allowed) return null;

  const missingConfiguration = decision.reason === "missing-configuration";
  return Response.json(
    {
      error: missingConfiguration
        ? "Command Center access is not configured"
        : "Authentication required",
    },
    {
      status: missingConfiguration ? 503 : 401,
      headers: {
        "Cache-Control": "no-store",
        ...(missingConfiguration
          ? {}
          : { "WWW-Authenticate": 'Basic realm="PA Command Center", charset="UTF-8"' }),
      },
    },
  );
}

export function enforceSameOrigin(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const suppliedOrigin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (
    (suppliedOrigin && suppliedOrigin !== requestOrigin) ||
    fetchSite === "cross-site"
  ) {
    return Response.json(
      { error: "Cross-origin request rejected" },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  return null;
}
