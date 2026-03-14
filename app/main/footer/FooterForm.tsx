"use client"

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/app/components/button/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Field } from "./Field";

import styles from './Footer.module.css';
 
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  serviceType: z.string().min(1, {
    message: "Please select a service type.",
  }),
  projectDescription: z.string().min(10, {
    message: "Please provide at least 10 characters.",
  }),
  budget: z.string().min(1, {
    message: "Please specify your budget.",
  }),
});

const FormSuccess = () => (
  <div className="space-y-4 p-6 border border-gray-200 rounded-lg bg-white/60">
    <p className="text-lg font-semibold">Thanks! Your message was sent.</p>
    <p className="text-sm text-gray-600">I’ll review it and get back to you shortly.</p>
  </div>
);

function sendFormData(
  values: z.infer<typeof formSchema>,
) {
  const formUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfQKT17RDKxVzTdU9cfJSQkRBU7nOG4topsgazBLMhrUI7GfQ/formResponse";
  const data = new FormData();
  // Google Forms field mappings
  data.append("entry.296873294", values.name);
  data.append("entry.1768426773", values.email);
  data.append("entry.671014386", values.serviceType);
  data.append("entry.1837187805", values.projectDescription);
  data.append("entry.1106207482", values.budget);
  // Honeypot to reduce spam (should remain empty)
  data.append("entry.999999999", "");

  return fetch(formUrl, {
    method: "POST",
    body: data,
    mode: "no-cors", // Google Forms does not support CORS; assume success
  });
}


export const FooterForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      serviceType: "",
      projectDescription: "",
      budget: "",
    },
  });
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus("sending");

    await sendFormData(values)
      .then(() => {
        setStatus("success");
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }

  const FormBody = () => (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className={styles.formGrid}>
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Field label="your beautiful name">
              <Input
                className={styles.formInput}
                placeholder="John Smith"
                {...field}
              />
            </Field>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <Field label="your email">
              <Input
                className={styles.formInput}
                type="email"
                placeholder="johnsmith@gmail.com"
                {...field}
              />
            </Field>
          )}
        />

        {/* Service Type */}
        <div className={styles.formFullWidth}>
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <Field className={styles.formFullWidth} label="what do you need me for?">
                <select
                  className={styles.formInput}
                  {...field}
                >
                  <option value="">Select service</option>
                  <option value="specific-project">specific project development</option>
                  <option value="consulting">consulting</option>
                  <option value="maintenance">website maintenance</option>
                  <option value="redesign">website redesign</option>
                  <option value="other">other</option>
                </select>
              </Field>
            )}
          />
        </div>
      </div>

      {/* Project Description */}
      <FormField
        control={form.control}
        name="projectDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-gray-500">describe the project in any level of detail</FormLabel>
            <FormControl>
              <textarea
                {...field}
                rows={3}
                className="w-full border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-gray-500 px-0 py-2 resize-none"
                placeholder="describe the project in any level of detail"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Budget */}
      <FormField
        control={form.control}
        name="budget"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-gray-500">your budget</FormLabel>
            <FormControl>
              <Input
                placeholder="1000$"
                {...field}
                className="border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-gray-500 px-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Submit Button */}
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "sending..." : "submit"}
        </Button>
        {status === "error" && (
          <span className="text-sm text-red-600">Something went wrong. Please try again.</span>
        )}
      </div>
    </form>
  );

  return (
    <Form {...form}>
      {status === "success" ? (
        <FormSuccess />
      ) : (
        <FormBody />
      )}
    </Form>
  )
}