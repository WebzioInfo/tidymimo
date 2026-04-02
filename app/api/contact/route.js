import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mailer';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Save mapping to database
    await prisma.contactMessage.create({
      data: { name, email, message }
    });

    // Send the email using the central mailer component
    await sendContactEmail({ name, email, message });

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('[CONTACT-FORM-ERROR]', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
