"use client";
import { CommonProvider } from "@/components";

export default function UnaunthenticatedLayout({ children }) {
  return <CommonProvider>{children}</CommonProvider>;
}
