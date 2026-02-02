import { z } from "zod"

export const CreateProjectSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
})

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>
