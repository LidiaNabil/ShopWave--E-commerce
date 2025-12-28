import React from 'react'
import { z } from "zod"

export const formSchema = z.object({
  email: z.string()
        .nonempty("Email is required")
        .regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Please enter a valid email address like name@example.com"
        ),
  password: z.string()
    .nonempty('Password is required')
    .min(8, {message: "Password must be at least 8 characters.",
  }).regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Password must contain at least one number and one character"),
})

