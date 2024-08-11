import Image from "next/image";
import Link from "next/link";

const videoId = '8ogJlOIxKVE';

export default async function Home() {
  const res = await fetch(`http://localhost:3000/api?videoId=${videoId}`);
  const data = (await res.json()).data;
  let text: string = ''
  if (data) {
    data.forEach((v: { text: string; }) => text += v.text);
    console.log(text.length);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <textarea className="w-[600px] h-[800px] text-black" defaultValue={text} />
    </main>
  );
}
