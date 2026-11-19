import type { Metadata } from "next";
import "./globals.css";
import "./onlines.css";

export const metadata: Metadata = {
  title: "Navin D — Creative AI Animator & Graphic Designer",
  description:
    "I create engaging visuals through design, animation and AI — from graphic and interface design to motion graphics and AI-powered visual creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="home">{children}</body>
    </html>
  );
}
