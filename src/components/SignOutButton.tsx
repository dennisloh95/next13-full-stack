"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "@/ui/Button";
import { toast } from "./ui/Toast";

interface signOutButtonProps {}

const SignOutButton = (props: signOutButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUserOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      toast({
        title: "Error Signing out",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signUserOut} isLoading={isLoading}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
