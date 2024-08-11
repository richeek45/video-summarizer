import { NextRequest, NextResponse } from "next/server"; 
import '../../../envConfig';
import { YoutubeTranscript } from 'youtube-transcript';

export async function GET(request: NextRequest) { 
  const videoId = request.nextUrl.searchParams.get('videoId');
  if (videoId) {
    const res = await YoutubeTranscript.fetchTranscript(videoId);
    return NextResponse.json({ data: res });
  }

  return NextResponse.json({data: '' });
}