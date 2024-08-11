import { NextRequest, NextResponse } from "next/server"; 
import '../../../envConfig';
import { YoutubeTranscript } from 'youtube-transcript';

export async function GET(request: NextRequest) { 
  const videoId3 = '8ogJlOIxKVE'; 
  const res = await YoutubeTranscript.fetchTranscript(videoId3);

  return NextResponse.json({ data: res });
}