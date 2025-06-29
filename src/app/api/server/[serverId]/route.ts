// src/app/api/server/[serverId]/route.ts

import { NextResponse } from 'next/server';
import animeConfig from '@/configs/animeConfig';
import generateUrlPath from '@/utils/generateUrlPath';

const {
  bellonimeApi: { apiUrl, baseUrlPath },
} = animeConfig;

export async function POST(
  request: Request,
  { params }: { params: { serverId: string } }
) {
  // JANGAN DESTRUCTURE, LANGSUNG PAKAI `params.serverId`
  if (!params.serverId) {
    return NextResponse.json({ error: 'Server ID tidak ditemukan' }, { status: 400 });
  }

  try {
    const pathname = generateUrlPath(baseUrlPath, "/server", params.serverId);
    const url = new URL(pathname, apiUrl).href;
    const response = await fetch(url);
    const data = await response.json();
    const streamUrl = data?.data?.url;

    return NextResponse.json({ url: streamUrl });

  } catch (error) {
    console.error('API Route /api/server Error:', error);
    return NextResponse.json(
      { error: 'Gagal memproses permintaan server' },
      { status: 500 }
    );
  }
}