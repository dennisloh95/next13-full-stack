"use client";

import { createApiKey } from "@/helpers/create-api-key";
import { Key } from "lucide-react";
import React, { FC, FormEvent, useState } from "react";
import CopyButton from "./CopyButton";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { toast } from "./ui/Toast";

const RequestApiKey: FC = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const generateApiKey = await createApiKey();
      setApiKey(generateApiKey);
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          message: err.message,
          type: "error",
        });
        return;
      }

      toast({
        title: "Error",
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto h-12 w-12 text-gray-400" />
        <LargeHeading>Request your API Key</LargeHeading>
        <Paragraph>You haven&apos;t requested an API key yet. </Paragraph>
      </div>

      <form onSubmit={createNewApiKey} className="mt-6 sm:flex sm:items-end">
        <label htmlFor="emails" className="sr-only">
          Your API key
        </label>
        <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              type="button"
              valueToCopy={apiKey}
              className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to display it here!"
          />
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0 flex justify-center">
          <Button disabled={!!apiKey} isLoading={isCreating} type="submit">
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
