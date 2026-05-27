import { redirect } from "next/navigation";
import { checkAuth } from "../actions";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const password = process.env.DASHBOARD_PASSWORD;

  if (!password) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
        <div className="bg-white/5 border border-red-500/20 rounded-2xl p-8 w-full max-w-sm text-center">
          <h1 className="text-white text-xl font-semibold mb-3">
            Configuration Error
          </h1>
          <p className="text-red-300 text-sm">
            DASHBOARD_PASSWORD is not set. Please configure the environment variable to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (await checkAuth()) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
