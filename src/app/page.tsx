"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "./providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Page = () => {
  const { setUser, user } = useUser();
  const { push } = useRouter();
  const login = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "twy@gmail.com",
        password: "123",
      }),
    });
    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  useEffect(() => {
    if (user) {
      push("/");
    }
  }, [user]);
  return (
    <div>
      <Input placeholder="email" />
      <Input placeholder="password" />
      <Button onClick={login} variant={"secondary"}>
        Log in
      </Button>
    </div>
  );
};
export default Page;
