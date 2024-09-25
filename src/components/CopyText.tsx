'use client';
import { Copy } from "lucide-react";

const CopyText = ({text} : { text: string}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (<div className="text-gray-400 cursor-pointer">
    <Copy onClick={handleCopy} />
  </div>)

}

export default CopyText;