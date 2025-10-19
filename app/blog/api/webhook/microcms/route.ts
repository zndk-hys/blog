import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.text();

  const signature = request.headers.get('x-microcms-signature');
  if (!signature) {
    return NextResponse.json({error: 'Invalid signature.'}, {status: 401});
  }

  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expectedSignature, 'hex');

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return NextResponse.json({error: 'Invalid signature.'}, {status: 401});
  }

  revalidatePath('/blog');
  
  return NextResponse.json({ok: true}, {status: 200});
}