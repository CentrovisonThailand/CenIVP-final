import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return NextResponse.json({ views: 0 });
    }

    // คำสั่ง incr จะบวกเลขเพิ่มทีละ 1 ใน key ที่ชื่อ 'inspecttiga_global_views'
    const views = await kv.incr('inspecttiga_global_views');
    return NextResponse.json({ views });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Database Error' }, { status: 500 });
  }
}
