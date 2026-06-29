"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginSchema } from "../../validation/authSchema";
import { userSignin } from "../../redux-toolkit/slice/authSlice";



export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      console.log("Login Data:", data);

      // Example API Call
      // const response = await axios.post("/api/admin/login", data);

      dispatch(userSignin(data));

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-cream lg:grid lg:grid-cols-[1.1fr_1fr]">
      {/* Left Panel */}
      <section className="relative hidden overflow-hidden bg-charcoal text-cream lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff8f0 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange font-display text-lg font-extrabold text-charcoal">
              S
            </span>

            <span className="font-display text-xl font-bold tracking-tight">
              swiggy <span className="font-medium text-orange">admin</span>
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-3xl font-bold">
            Every order, partner and outlet — tracked from one console.
          </h2>

          <p className="mt-4 text-sm text-cream/70">
            Sign in with your admin credentials to manage live orders,
            restaurant onboarding, delivery partners and payouts.
          </p>
        </div>
      </section>

      {/* Right Panel */}
      <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange font-display text-lg font-extrabold text-charcoal">
              S
            </span>

            <span className="font-display text-xl font-bold tracking-tight text-ink">
              swiggy <span className="font-medium text-orange">admin</span>
            </span>
          </div>

          <h1 className="font-display text-[28px] font-bold tracking-tight text-ink">
            Sign in to Admin
          </h1>

          <p className="mt-2 text-sm text-muted">
            Use the email and password issued by your operations lead.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Work Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@swiggy.in"
                {...register("email")}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${errors.email
                  ? "border-red-500"
                  : "border-line focus:border-orange focus:ring-2 focus:ring-orange/20"
                  }`}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-ink"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-orange"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none transition ${errors.password
                    ? "border-red-500"
                    : "border-line focus:border-orange focus:ring-2 focus:ring-orange/20"
                    }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-xs font-medium text-muted"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-line"
              />
              Keep me signed in on this device
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-orange py-3 text-sm font-semibold text-charcoal transition hover:bg-orange/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 rounded-xl border border-line bg-white px-4 py-3 text-xs text-muted">
            All sign-ins are logged for security and compliance.
          </div>

          <p className="mt-8 text-center text-xs text-muted">
            Need access? Ask your account owner to invite you from{" "}
            <span className="font-medium text-ink">Team Settings</span>.
          </p>
        </div>
      </section>
    </main>
  );
}