"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { ArrowRight, Mail, Loader2, CheckCircle2 } from "lucide-react"

/**
 * Contact form — posts to /api/contact, which forwards to
 * profstephenbookclub@gmail.com via Gmail SMTP and stores the submission
 * in the database.
 *
 * The user-facing copy stays honest about what happens next: the committee
 * reads every message and replies personally. No marketing automation.
 */

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get("name") || "").trim()
    const email = String(fd.get("email") || "").trim()
    const bookTitle = String(fd.get("bookTitle") || "").trim()
    const message = String(fd.get("message") || "").trim()

    if (!name || !email || !message) {
      toast.error("Please fill in your name, email, and a short note.")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, bookTitle, message }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Submission failed.")
      }
      setDone(true)
      toast.success(
        data.delivered
          ? "Your message is on its way to Prof Stephen's inbox."
          : "Saved. The committee will read it shortly."
      )
      form.reset()
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong."
      toast.error(msg + " You can also email profstephenbookclub@gmail.com directly.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-primary/15 bg-card p-7 md:p-10 shadow-[0_30px_60px_-30px_rgba(27,58,42,0.3)]"
    >
      <div className="flex items-center justify-between border-b border-primary/15 pb-4 mb-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
          Author Submission · Form
        </p>
        <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/55 font-medium">
          Fields marked * required
        </p>
      </div>

      <h3 className="font-serif text-2xl md:text-3xl font-semibold text-primary">
        Submit your work for the next cycle.
      </h3>
      <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
        The chair reads every submission personally. A response may take up to
        four weeks during an active reading cycle. Messages route directly
        into the committee inbox at profstephenbookclub@gmail.com.
      </p>

      <div className="mt-7 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-[0.18em] text-primary font-medium">
              Full name *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Jane Doe"
              className="bg-background border-primary/20 focus-visible:ring-accent h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-[0.18em] text-primary font-medium">
              Email address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@yourdomain.com"
              className="bg-background border-primary/20 focus-visible:ring-accent h-11"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bookTitle" className="text-xs uppercase tracking-[0.18em] text-primary font-medium">
            Book title (if available)
          </Label>
          <Input
            id="bookTitle"
            name="bookTitle"
            placeholder="The Quiet Atlas"
            className="bg-background border-primary/20 focus-visible:ring-accent h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-primary font-medium">
            A short note to the committee *
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us about the book, where it is in its lifecycle, and why you believe it belongs in this cycle."
            className="bg-background border-primary/20 focus-visible:ring-accent resize-none"
            required
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-primary/15 pt-5">
        <p className="text-xs text-foreground/60 leading-relaxed max-w-md">
          By submitting, you agree to receive a single reply from Prof
          Stephen or the committee. We do not share, sell, or list-build with
          your address.
        </p>
        <Button
          type="submit"
          disabled={submitting || done}
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-7"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : done ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Message sent
            </>
          ) : (
            <>
              Submit to the committee
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div className="mt-6 pt-5 border-t border-primary/15 flex items-center gap-2 text-sm">
        <Mail className="h-4 w-4 text-accent" />
        <span className="text-foreground/65">Or write directly:</span>
        <a
          href="mailto:profstephenbookclub@gmail.com"
          className="link-underline font-medium text-primary"
        >
          profstephenbookclub@gmail.com
        </a>
      </div>
    </form>
  )
}
