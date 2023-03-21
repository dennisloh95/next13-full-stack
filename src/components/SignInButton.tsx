"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "@/ui/Button";
import { toast } from "./ui/Toast";

interface SignInButtonProps {}

const SignInButton = (props: SignInButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      toast({
        title: "Error sign in",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signInWithGoogle} isLoading={isLoading}>
      Sign in
    </Button>
  );
};

export default SignInButton;
