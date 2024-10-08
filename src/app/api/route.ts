import { NextRequest, NextResponse } from "next/server"; 
import '../../../envConfig';
import { YoutubeTranscript } from 'youtube-transcript';
// import transcriptJson from "../../utils/transcript.json";

export async function GET(request: NextRequest) { 
  const videoId = request.nextUrl.searchParams.get('videoId');
  console.log(videoId);
  if (videoId) {
    const res = await YoutubeTranscript.fetchTranscript(videoId);
    return NextResponse.json({ data: res });
  }

  // return NextResponse.json({data: transcriptJson });
  return NextResponse.json({data: '' });
}