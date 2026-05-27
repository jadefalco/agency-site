"use client";

import { useState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError("");
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
    setPending(false);
  }

  return (
    <form
      action={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-sm"
    >
      <h1 className="text-white text-xl font-semibold mb-6 text-center">
        Dispatcher Dashboard
      </h1>

      <label className="block text-white/60 text-sm mb-2">
        Password
      </label>
      <input
        type="password"
        name="password"
        required
        autoFocus
        disabled={pending}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/30 transition-colors mb-4 disabled:opacity-50"
        placeholder="Enter password"
      />

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full px-6 py-3 rounded-full bg-brand-teal text-white font-semibold text-sm transition-all hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
