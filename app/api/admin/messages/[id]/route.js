import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function PATCH(request, { params }) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    const { isRead } = body;

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('[PATCH MESSAGE]', err);
    return NextResponse.json({ error: 'Failed to update message.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE MESSAGE]', err);
    return NextResponse.json({ error: 'Failed to delete message.' }, { status: 500 });
  }
}
