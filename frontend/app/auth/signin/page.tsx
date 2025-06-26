"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
    console.log("Current page URL:", window.location.href);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/dashboard", // this is passed in the email magic link
    });

    if (result?.error) {
      setMessage("Error: " + result.error);
    } else {
      setMessage("Check your email for a sign-in link.");
    }
  };

  const handleGoogleSignIn = async () => {
    const isPreview =
      typeof window !== "undefined" &&
      window.location.hostname.endsWith(".vercel.app") &&
      !window.location.hostname.startsWith("jackhigh.vercel.app");

    const callbackUrl = "/dashboard"; // Always go to dashboard after login

    if (isPreview) {
      // Start sign-in without auto redirect
      const result = await signIn("google", {
        callbackUrl,
      });

      if (result?.url) {
        // Rewrite to production domain to ensure callback works
        const prodUrl = new URL(result.url);
        prodUrl.host = "jackhigh.vercel.app";
        window.location.href = prodUrl.toString();
      } else {
        console.error("Google sign-in failed:", result?.error);
      }
    } else {
      // Production or local: normal sign-in with callback
      await signIn("google", { callbackUrl });
    }
  };

  const handleFacebookSignIn = async () => {
    const isPreview =
      typeof window !== "undefined" &&
      window.location.hostname.endsWith(".vercel.app") &&
      !window.location.hostname.startsWith("jackhigh.vercel.app");

    const callbackUrl = "/dashboard"; // Always go to dashboard after login

    if (isPreview) {
      // Start sign-in without auto redirect
      const result = await signIn("facebook", {
        callbackUrl,
      });

      if (result?.url) {
        // Rewrite to production domain to ensure callback works
        const prodUrl = new URL(result.url);
        prodUrl.host = "jackhigh.vercel.app";
        window.location.href = prodUrl.toString();
      } else {
        console.error("Facebook sign-in failed:", result?.error);
      }
    } else {
      // Production or local: normal sign-in with callback
      await signIn("facebook", { callbackUrl });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Sign in with Email</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Sign in with Google
        </button>
        <button
          type="button"
          onClick={handleFacebookSignIn}
          className="px-4 py-2 bg-blue-600 text-white rounded"
          hidden
        >
          Sign in with Facebook
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}
