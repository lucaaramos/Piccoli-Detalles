import { z } from "zod";

export const createOrderSchema = z.object({
  products: z.array(
    z.object({
      productId: z.string().length(24, "Invalid product ID"),
      quantity: z.number().int().positive("Quantity must be greater than 0")
    })
  ).min(1, "Order must contain at least one product"),

  totalAmount: z.number().positive("Total amount must be greater than 0")
});
