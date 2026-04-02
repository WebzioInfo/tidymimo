import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(messages);
  } catch (err) {
    console.error('[GET MESSAGES]', err);
    return NextResponse.json({ error: 'Failed to fetch messages.' }, { status: 500 });
  }
}
