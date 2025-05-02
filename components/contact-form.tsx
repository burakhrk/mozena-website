"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface ContactFormProps {
  dictionary: any
}

export function ContactForm({ dictionary }: ContactFormProps) {
  const { form } = dictionary.contact

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<{
    type: "success" | "error" | "loading" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: form.fillFields,
      })
      return
    }

    setStatus({
      type: "loading",
      message: form.sending,
    })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus({
          type: "success",
          message: form.success,
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        const error = await response.json()
        throw new Error(error.message || form.error)
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : form.error,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {form.name}
        </label>
        <Input id="name" value={formData.name} onChange={handleChange} placeholder={form.namePlaceholder} />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {form.email}
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={form.emailPlaceholder}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {form.message}
        </label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={form.messagePlaceholder}
          className="min-h-[120px]"
        />
      </div>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button type="submit" className="w-full" disabled={status.type === "loading"}>
          {status.type === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {form.sending}
            </>
          ) : (
            form.send
          )}
        </Button>
      </motion.div>

      {status.type && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 rounded-md text-sm ${
            status.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : status.type === "error"
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                : ""
          }`}
        >
          {status.message}
        </motion.div>
      )}
    </form>
  )
}
