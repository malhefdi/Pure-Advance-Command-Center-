import { describe, expect, it } from "vitest";
import { decideAccess, enforceApiAccess, enforceSameOrigin, parseBasicAuthorization } from "@/lib/access-control";

const credentials = (username: string, password: string) =>
  `Basic ${Buffer.from(`${username}:${password}`, "utf8").toString("base64")}`;

describe("access control", () => {
  it("fails closed when credentials are not configured", () => {
    expect(decideAccess(null, { NODE_ENV: "production" })).toEqual({
      allowed: false,
      reason: "missing-configuration",
    });
  });

  it("accepts exactly matching basic credentials", () => {
    expect(
      decideAccess(credentials("operator", "a-very-long-password"), {
        NODE_ENV: "production",
        COMMAND_CENTER_USERNAME: "operator",
        COMMAND_CENTER_PASSWORD: "a-very-long-password",
      }),
    ).toEqual({ allowed: true, mode: "basic", username: "operator" });
  });

  it("rejects malformed and mismatched credentials", () => {
    const environment = {
      NODE_ENV: "production",
      COMMAND_CENTER_USERNAME: "operator",
      COMMAND_CENTER_PASSWORD: "correct-password",
    };
    expect(decideAccess("Bearer token", environment).allowed).toBe(false);
    expect(decideAccess(credentials("operator", "wrong-password"), environment).allowed).toBe(false);
    expect(parseBasicAuthorization("Basic not-valid-base64")).toBeNull();
  });

  it("accepts the case-insensitive Basic scheme and rejects weak configuration", () => {
    const environment = {
      NODE_ENV: "production",
      COMMAND_CENTER_USERNAME: "operator",
      COMMAND_CENTER_PASSWORD: "a-very-long-password",
    };
    expect(decideAccess(credentials("operator", "a-very-long-password").replace("Basic", "basic"), environment).allowed).toBe(true);
    expect(decideAccess(credentials("operator", "short"), { ...environment, COMMAND_CENTER_PASSWORD: "short" })).toEqual({
      allowed: false,
      reason: "missing-configuration",
    });
  });

  it("permits only an explicit non-production bypass", () => {
    expect(
      decideAccess(null, {
        NODE_ENV: "development",
        COMMAND_CENTER_AUTH_DISABLED: "true",
      }),
    ).toEqual({
      allowed: true,
      mode: "development-bypass",
      username: "local-developer",
    });
    expect(
      decideAccess(null, {
        NODE_ENV: "production",
        COMMAND_CENTER_AUTH_DISABLED: "true",
      }).allowed,
    ).toBe(false);
  });

  it("returns fail-closed API responses and rejects cross-site writes", async () => {
    const unauthorized = enforceApiAccess(new Request("https://command.example/api/tasks"), {
      NODE_ENV: "production",
      COMMAND_CENTER_USERNAME: "operator",
      COMMAND_CENTER_PASSWORD: "a-very-long-password",
    });
    expect(unauthorized?.status).toBe(401);
    expect(unauthorized?.headers.get("www-authenticate")).toContain("Basic");

    const crossSite = enforceSameOrigin(new Request("https://command.example/api/tasks", {
      method: "POST",
      headers: { origin: "https://attacker.example", "sec-fetch-site": "cross-site" },
    }));
    expect(crossSite?.status).toBe(403);
    expect(await crossSite?.json()).toEqual({ error: "Cross-origin request rejected" });
  });
});
