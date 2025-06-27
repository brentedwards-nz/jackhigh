"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconBrandGoogle,
  IconBrandFacebook,
  IconMail,
} from "@tabler/icons-react";

const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit called with email:", email);

    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/dashboard", // this is passed in the email magic link
      });
      if (result?.error) {
        setSuccess(false);
        setMessage("Error: " + result.error);
      } else {
        setSuccess(true);
        setMessage("Check your email for a sign-in link.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setSuccess(false);
      setMessage("An error occurred while trying to sign in.");
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br to-primary-100 flex items-center justify-center p-4 ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8  space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter">Welcome</h1>
            <p className="text-muted-foreground">
              Enter your email to access your profile
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@company.net"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Button type="submit" className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <IconMail />
                  )}
                  Login With Email
                </Button>
                {message && success && (
                  <p className="mt-2 text-green-500">{message}</p>
                )}
                {message && !success && (
                  <p className="mt-2 text-red-500">{message}</p>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <hr className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center uppercase">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </form>
            <div className="space-x-2 flex justify-center">
              <Button
                className="w-1/2"
                variant="outline"
                onClick={handleGoogleSignIn}
              >
                <IconBrandGoogle />
                Google
              </Button>
              <Button
                className="w-1/2"
                variant="outline"
                onClick={handleFacebookSignIn}
              >
                <IconBrandFacebook />
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInComponent;
