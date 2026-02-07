import { z } from "zod"

export const CreateProjectSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(3, "Project name must be at least 3 characters long"),
  description: z.string().max(200).optional(),
  status: z.enum(["active", "archived"]).default("active"),
})

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>
