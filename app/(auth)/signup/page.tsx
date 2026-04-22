"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
  const params = useSearchParams();
  const role = params.get("role") || "WORKER";
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", role });
  const [message, setMessage] = useState("OTP UI placeholder: currently password based login.");

  const submit = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMessage(data.success ? "Signup successful. Please login." : data.message);
    if (data.success) router.push("/login");
  };

  return (
    <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Sign up</h2>
      <input className="w-full rounded border p-2" placeholder="Full name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="w-full rounded border p-2" placeholder="Mobile number" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input className="w-full rounded border p-2" placeholder="Email (optional)" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full rounded border p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit} className="w-full rounded bg-brand-500 p-2 text-white">Create account</button>
      <p className="text-xs text-slate-600">{message}</p>
    </div>
  );
}
