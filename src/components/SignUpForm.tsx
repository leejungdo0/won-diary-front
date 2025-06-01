"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define schema for validation
const formSchema = z.object({
  id: z.string().min(5, {
    message: "ID는 최소 5자를 입력해주세요.",
  }),
  dharmaName: z.string().min(2, {
    message: "Username은 최소 2자를 입력해주세요.",
  }),
  password: z
    .string()
    .min(8, {
      message: "비밀번호는 최소 8자를 입력해주세요.",
    })
    .refine(val => /\d/.test(val), {
      message: "비밀번호는 최소 하나의 숫자를 포함해야 합니다.",
    })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "비밀번호는 최소 하나의 특수문자를 포함해야 합니다.",
    }),
});

// Derive TypeScript type from schema
type ProfileFormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  // Initialize useForm with zod resolver and default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
      dharmaName: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: ProfileFormValues) => {
    // For now, simply log the validated data
    console.log("Submitted data:", data);
    // You can replace this with your desired submit logic
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>This is your ID to log in.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormDescription>Choose a secure password (min. 8 characters).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dharmaName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
