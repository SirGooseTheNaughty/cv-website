"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getFormApiUrl() {
  if (process.env.NEXT_PUBLIC_FORM_API_URL) {
    return process.env.NEXT_PUBLIC_FORM_API_URL;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3001/form";
  }

  return "/api/form";
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formApiUrl = getFormApiUrl();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      project: String(formData.get("project") ?? "").trim(),
    };

    try {
      const response = await fetch(formApiUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="space-y-2">
        <p className="text-xl font-medium text-content">Message received — thanks!</p>
        <p className="text-content/70">
          I&apos;ll review your project details and get back to you shortly. Looking forward to talking!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name" className="text-content">Name</Label>
        <Input
          id="name"
          name="name"
          required
          disabled={status === "sending"}
          className="h-11 rounded-none border-stroke bg-transparent text-content transition-colors focus-visible:border-accent focus-visible:ring-0"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-content">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          disabled={status === "sending"}
          className="h-11 rounded-none border-stroke bg-transparent text-content transition-colors focus-visible:border-accent focus-visible:ring-0"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="project" className="text-content">Project description</Label>
        <textarea
          id="project"
          name="project"
          required
          disabled={status === "sending"}
          rows={5}
          className="w-full resize-y rounded-none border border-stroke bg-transparent px-3 py-2 text-sm text-content outline-none transition-colors placeholder:text-content/50 focus-visible:border-accent"
          placeholder="Tell me briefly about your project, goals, and timeline."
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          disabled={status === "sending"}
          className="h-11 rounded-none bg-content px-6 text-bg-1 transition-colors hover:bg-accent"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </Button>
        {status === "error" ? (
          <p className="text-sm text-content/70">Failed to send message. Please try again.</p>
        ) : null}
      </div>
    </form>
  );
}
