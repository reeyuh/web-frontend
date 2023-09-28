"use server";

import { cookies } from "next/headers";

export const setCookie = async (name, value) => {
  await cookies().set({
    name,
    value,
    httpOnly: true,
    path: "/",
  });
};
