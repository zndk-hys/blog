import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.text();

  // 送られてきたシグネチャの取得
  const signature = request.headers.get('x-microcms-signature');
  if (!signature) {
    return NextResponse.json({error: 'Invalid signature.'}, {status: 401});
  }

  // シグネチャを導出するためのシークレットキーを環境変数から取得
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }

  // シークレットキーとリクエストボディからシグネチャを計算
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  // 比較用にBufferオブジェクトに変換
  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expectedSignature, 'hex');

  // 送られてきたシグネチャとこちらで計算したシグネチャを比較
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return NextResponse.json({error: 'Invalid signature.'}, {status: 401});
  }

  const json = JSON.parse(body);

  // キャッシュの破棄
  revalidatePath('/blog');
  revalidatePath(`/blog/${json.id}`);
  
  return NextResponse.json({ok: true}, {status: 200});
}