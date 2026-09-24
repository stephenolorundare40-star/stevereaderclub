import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

/**
 * POST /api/contact
 * Body: { name: string, email: string, bookTitle?: string, message: string }
 *
 * Forwards the submission to profstephenbookclub@gmail.com via Gmail SMTP.
 *
 * Required environment variables (set as Cloudflare secrets):
 *   GMAIL_USER          — the Gmail address that sends the mail
 *   GMAIL_APP_PASSWORD  — a Google App Password (NOT the account password)
 *
 * If those are not set, the route returns 503 and a clear error message
 * so the submitter knows to retry or write directly.
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

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return NextResponse.json(
      { ok: false, error: "Email address is not valid." },
      { status: 422 }
    )
  }

  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPass) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        error:
          "The contact form has not been fully configured yet. Please email profstephenbookclub@gmail.com directly while we finish setup.",
      },
      { status: 503 }
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
      from: `"STEVEREADERCLUB contact" <${gmailUser}>`,
      to: RECIPIENT,
      replyTo: email,
      subject,
      text,
      html,
    })

    return NextResponse.json(
      {
        ok: true,
        delivered: true,
        messageId: info.messageId,
      },
      { status: 200 }
    )
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    console.error("[contact] SMTP send failed:", errorMsg)

    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        error: "Email delivery failed. Please email profstephenbookclub@gmail.com directly.",
      },
      { status: 502 }
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
