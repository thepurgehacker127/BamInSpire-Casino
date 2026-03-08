import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    console.log("New support request received:", {
      name,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message: "Support request submitted successfully.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }
}