import { z } from "zod";

export const UserFormValidation = z.object({
  customer_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  queue_number: z
    .string()
    .min(2, "Prefix must be exactly 2 characters.")
    .max(2, "Prefix must be exactly 2 characters."),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  queueing_system: z
    .string()
    .min(1, 'Queueing system is required')
});