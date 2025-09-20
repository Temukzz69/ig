"use client";
import { useEffect } from "react";
import { useUser } from "../providers/AuthProvider";
import { useRouter } from "next/navigation";
export default function Home() {
  const { user } = useUser();
  const { push } = useRouter();
  useEffect(() => {
    if (!user) {
      push("/login");
    }
  }, [user]);
  return <div>{user?.username}</div>;
}
