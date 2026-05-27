"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "dashboard_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getDashboardPassword(): string | undefined {
  return process.env.DASHBOARD_PASSWORD;
}

export async function login(formData: FormData) {
  const password = getDashboardPassword();
  if (!password) {
    return { error: "Server configuration error: DASHBOARD_PASSWORD is not set." };
  }

  const submitted = formData.get("password") as string;
  if (!submitted || submitted !== password) {
    return { error: "Incorrect password. Please try again." };
  }

  cookies().set(COOKIE_NAME, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
    path: "/dashboard",
    sameSite: "lax",
  });

  redirect("/dashboard");
}

export async function logout() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/dashboard",
    sameSite: "lax",
  });

  redirect("/dashboard/login");
}

export async function checkAuth(): Promise<boolean> {
  const password = getDashboardPassword();
  if (!password) return false;

  const authCookie = cookies().get(COOKIE_NAME);
  return authCookie?.value === password;
}
