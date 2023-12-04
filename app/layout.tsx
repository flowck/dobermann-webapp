import "@@/common/styles/globals.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "remixicon/fonts/remixicon.css";

export const metadata: Metadata = {
  title: "Dobermann",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}