"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MascotLoader } from "@/components/mascot/mascot-loader-client";
import {
  budgetOptions,
  serviceOptions,
  validateContact,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/contact";
import { ease } from "@/lib/motion";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const empty: ContactPayload = {
  name: "",
  email: "",
  company: "",
  service: serviceOptions[0],
  budget: "",
  message: "",
  referrer: "",
};

type Status = "idle" | "submitting" | "sent" | "error";

/** Tab order, so the earliest invalid field is the one we jump to. */
const fieldOrder: (keyof ContactPayload)[] = ["name", "email", "company", "message"];

function focusFirstError(errors: FieldErrors) {
  const first = fieldOrder.find((field) => errors[field]);
  if (first) document.getElementById(first)?.focus();
}

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState<string | null>(null);

  const update =
    (field: keyof ContactPayload) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      // Clear the error as soon as the user starts fixing the field.
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { errors: nextErrors } = validateContact(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      focusFirstError(nextErrors);
      return;
    }

    setStatus("submitting");
    setNotice(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        ok: boolean;
        errors?: FieldErrors;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        setNotice(
          data.message ??
            `Something went wrong. Please email us at ${site.email} instead.`,
        );
        if (data.errors) focusFirstError(data.errors);
        return;
      }

      setStatus("sent");
      setValues(empty);
    } catch {
      setStatus("error");
      setNotice(`Network error. Please email us at ${site.email} instead.`);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="flex flex-col items-start gap-4 py-8"
            role="status"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
              <CheckCircle2 size={22} />
            </span>
            <h2 className="text-2xl">Thanks — that reached us.</h2>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
              An engineer will read it and reply within one business day. If it is
              urgent, email{" "}
              <a className="text-ink underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              directly.
            </p>
            <Button variant="secondary" size="sm" onClick={() => setStatus("idle")}>
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease }}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={errors.name} htmlFor="name">
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={update("name")}
                  className={inputClass(errors.name)}
                  placeholder="Alex Carter"
                />
              </Field>

              <Field label="Work email" error={errors.email} htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update("email")}
                  className={inputClass(errors.email)}
                  placeholder="alex@company.com"
                />
              </Field>

              <Field label="Company" error={errors.company} htmlFor="company" optional>
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  value={values.company}
                  onChange={update("company")}
                  className={inputClass(errors.company)}
                  placeholder="Company Ltd"
                />
              </Field>

              <Field label="Budget" htmlFor="budget" optional>
                <select
                  id="budget"
                  name="budget"
                  value={values.budget}
                  onChange={update("budget")}
                  className={inputClass()}
                >
                  <option value="">Select a range</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="What do you need?" htmlFor="service">
              <select
                id="service"
                name="service"
                value={values.service}
                onChange={update("service")}
                className={inputClass()}
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="About the project" error={errors.message} htmlFor="message">
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={update("message")}
                className={cn(inputClass(errors.message), "h-auto resize-y py-3 leading-relaxed")}
                placeholder="What you are building, what is in the way, and any deadline we should know about."
              />
            </Field>

            {/* Honeypot — hidden from users and from assistive tech. */}
            <div aria-hidden className="hidden">
              <label htmlFor="referrer">Referrer</label>
              <input
                id="referrer"
                name="referrer"
                tabIndex={-1}
                autoComplete="off"
                value={values.referrer}
                onChange={update("referrer")}
              />
            </div>

            {notice ? (
              <p role="alert" className="text-sm text-danger">
                {notice}
              </p>
            ) : null}

            <AnimatePresence>
              {status === "submitting" ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="overflow-hidden"
                >
                  <MascotLoader compact label="Sending your enquiry" />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-ink-faint">
                We use your details only to reply to this enquiry.
              </p>

              <Button type="submit" disabled={status === "submitting"} className="sm:shrink-0">
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send enquiry
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputClass(error?: string) {
  return cn(
    "h-11 w-full rounded-xl border bg-paper px-3.5 text-[0.9375rem] text-ink transition-colors duration-200 outline-none placeholder:text-ink-faint/70",
    "focus:border-accent focus:ring-2 focus:ring-accent/15",
    error ? "border-danger-line" : "border-line hover:border-ink/20",
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-sm font-medium text-ink"
      >
        {label}
        {optional ? (
          <span className="font-mono text-[0.625rem] tracking-wide text-ink-faint uppercase">
            optional
          </span>
        ) : null}
      </label>

      {children}

      {error ? (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
