"use client";
import { CommonProvider } from "@/components";

export default function MainLayout({ children }) {
  return <CommonProvider>{children}</CommonProvider>;
}
