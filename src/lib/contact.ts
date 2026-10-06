import { services } from "@/content/services";

export const serviceOptions = [
  ...services.map((service) => service.title),
  "Something else",
] as const;

export const budgetOptions = [
  "Under $25k",
  "$25k – $75k",
  "$75k – $200k",
  "$200k+",
  "Monthly retainer / per engineer",
  "Not sure yet",
] as const;

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  referrer?: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX = { name: 120, email: 200, company: 160, message: 4000 };

export function validateContact(input: Partial<ContactPayload>): {
  errors: FieldErrors;
  value: ContactPayload;
} {
  const value: ContactPayload = {
    name: (input.name ?? "").trim(),
    email: (input.email ?? "").trim(),
    company: (input.company ?? "").trim(),
    service: (input.service ?? "").trim(),
    budget: (input.budget ?? "").trim(),
    message: (input.message ?? "").trim(),
    referrer: (input.referrer ?? "").trim(),
  };

  const errors: FieldErrors = {};

  if (value.name.length < 2) errors.name = "Tell us your name.";
  else if (value.name.length > MAX.name) errors.name = "That name is too long.";

  if (!EMAIL.test(value.email)) errors.email = "Enter a valid work email.";
  else if (value.email.length > MAX.email) errors.email = "That email is too long.";

  if (value.company.length > MAX.company) errors.company = "That company name is too long.";

  if (value.message.length < 20)
    errors.message = "A sentence or two about the project, please.";
  else if (value.message.length > MAX.message)
    errors.message = "Please keep it under 4000 characters.";

  return { errors, value };
}
