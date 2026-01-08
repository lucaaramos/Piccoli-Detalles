import { z } from "zod";

export const getProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().min(1).optional(),

  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),

  inStock: z.enum(["true", "false"]).optional(),

  sort: z.enum(["createdAt", "price", "name"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),

   startDate: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : undefined))
    .refine(
      (date) => !date || !Number.isNaN(date.getTime()),
      "startDate inválida"
    ),

  endDate: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : undefined))
    .refine(
      (date) => !date || !Number.isNaN(date.getTime()),
      "endDate inválida"
    )
});
export const productQuerySchema = getProductsQuerySchema;
