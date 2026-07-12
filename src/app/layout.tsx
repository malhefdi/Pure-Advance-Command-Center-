import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PA Command Center",
  description: "Executive operations dashboard for Pure Advance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
