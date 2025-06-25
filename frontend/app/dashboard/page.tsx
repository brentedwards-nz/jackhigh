"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NextPage } from "next";

const Dashboard: NextPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/signin");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        // This will be a very brief flash before redirect
        return <div>Access Denied. Please sign in first.</div>;
    }

    return (
        <div>
            <h1>Welcome, {session.user?.firstName ?? session.user?.name ?? "User"}!</h1>
            <p>This is your dashboard.</p>
            <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="px-4 py-2 bg-gray-200 text-black rounded mt-4"
            >
                Sign Out
            </button>
        </div>
    );
};

export default Dashboard;