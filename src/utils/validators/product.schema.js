import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  description: z.string().optional()
});

export const productUpdateSchema = productCreateSchema.partial();
