import { z } from "zod";

export const mongoIdSchema = z.object({
  id: z.string().length(24, "Invalid MongoDB ID")
});
