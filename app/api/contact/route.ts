import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate form inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real implementation, you would use a service like Nodemailer, SendGrid, etc.
    // For demonstration purposes, we'll just log the data and return a success response
    console.log("Contact form submission:", {
      to: "info@mozena.com.tr",
      from: email,
      name,
      message,
    })

    // Return success response
    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
