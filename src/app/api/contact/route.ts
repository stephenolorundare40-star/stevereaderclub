import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { db } from "@/lib/db"

/**
 * POST /api/contact
 * Body: { name: string, email: string, bookTitle?: string, message: string }
 *
 * Behaviour:
 *  1. Persists the submission to the Submission table (so a message is never
 *     lost, even if SMTP delivery fails).
 *  2. Attempts to deliver it to profstephenbookclub@gmail.com via Gmail SMTP.
 *     Requires the following environment variables:
 *       GMAIL_USER          — the Gmail address that sends the mail
 *       GMAIL_APP_PASSWORD  — a Google App Password (NOT the account password)
 *     If those are not set, the route still returns 200 (with delivered=failed)
 *     and the message is stored in the database for later review.
 *  3. Returns a JSON envelope with the submission id and delivery status.
 */

const RECIPIENT = "profstephenbookclub@gmail.com"

export async function POST(req: Request) {
  let body: {
    name?: string
    email?: string
    bookTitle?: string
    message?: string
  } = {}

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    )
  }

  const name = (body.name || "").trim().slice(0, 120)
  const email = (body.email || "").trim().slice(0, 200)
  const bookTitle = (body.bookTitle || "").trim().slice(0, 200)
  const message = (body.message || "").trim().slice(0, 5000)

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 422 }
    )
  }

  // Basic email format sanity check
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return NextResponse.json(
      { ok: false, error: "Email address is not valid." },
      { status: 422 }
    )
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null

  // 1) Persist to the database first
  let submission: { id: string } | null = null
  try {
    submission = await db.submission.create({
      data: {
        name,
        email,
        bookTitle: bookTitle || null,
        message,
        ip,
        delivered: "pending",
      },
      select: { id: true },
    })
  } catch (e) {
    console.error("[contact] DB insert failed:", e)
  }

  // 2) Try SMTP delivery
  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPass) {
    console.warn(
      "[contact] GMAIL_USER / GMAIL_APP_PASSWORD not set. Submission stored in DB only."
    )
    if (submission) {
      try {
        await db.submission.update({
          where: { id: submission.id },
          data: {
            delivered: "failed",
            error: "SMTP credentials not configured on server.",
          },
        })
      } catch {}
    }
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        id: submission?.id,
        note: "Saved to the database. SMTP not yet configured by the site owner.",
      },
      { status: 200 }
    )
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  })

  const subject = bookTitle
    ? `New submission — ${name} (${bookTitle})`
    : `New submission — ${name}`

  const text = [
    `A new submission arrived via stevereaderclub.com`,
    ``,
    `Name:        ${name}`,
    `Email:       ${email}`,
    `Book title:  ${bookTitle || "(not provided)"}`,
    ``,
    `Message:`,
    message,
    ``,
    `Submitted:   ${new Date().toISOString()}`,
    `IP:          ${ip || "unknown"}`,
  ].join("\n")

  const html = `
    <div style="font-family:Georgia,serif;color:#1A1A1A;max-width:560px;">
      <h2 style="margin:0 0 12px;font-size:20px;color:#1B3A2A;">
        New submission — ${escapeHtml(name)}
      </h2>
      <p style="margin:0 0 16px;color:#6B6157;font-size:13px;">
        ${new Date().toISOString()}
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:6px 0;color:#6B6157;width:110px;vertical-align:top;">Name</td>
          <td style="padding:6px 0;color:#1A1A1A;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6B6157;vertical-align:top;">Email</td>
          <td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#1B3A2A;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6B6157;vertical-align:top;">Book title</td>
          <td style="padding:6px 0;color:#1A1A1A;">${escapeHtml(bookTitle) || "<em>(not provided)</em>"}</td>
        </tr>
      </table>
      <h3 style="margin:18px 0 8px;font-size:14px;color:#1B3A2A;">Message</h3>
      <div style="padding:14px;border:1px solid #E5E0D5;background:#FAF7F0;font-size:14px;line-height:1.55;white-space:pre-wrap;">${escapeHtml(message)}</div>
      <p style="margin-top:18px;color:#A0A0A0;font-size:11px;">
        Sent from the STEVEREADERCLUB contact form. Reply directly to this email to respond to ${escapeHtml(name)}.
      </p>
    </div>
  `.trim()

  try {
    const info = await transporter.sendMail({
      from: `"STEVEREADERCLUB contact\" <${gmailUser}>`,
      to: RECIPIENT,
      replyTo: email,
      subject,
      text,
      html,
    })

    if (submission) {
      try {
        await db.submission.update({
          where: { id: submission.id },
          data: { delivered: "sent", error: null },
        })
      } catch {}
    }

    return NextResponse.json(
      {
        ok: true,
        delivered: true,
        id: submission?.id,
        messageId: info.messageId,
      },
      { status: 200 }
    )
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    console.error("[contact] SMTP send failed:", errorMsg)

    if (submission) {
      try {
        await db.submission.update({
          where: { id: submission.id },
          data: { delivered: "failed", error: errorMsg.slice(0, 500) },
        })
      } catch {}
    }

    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        id: submission?.id,
        error: "Stored, but email delivery failed. Please check SMTP settings.",
      },
      { status: 200 }
    )
  }
}

function escapeHtml(s: string) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
