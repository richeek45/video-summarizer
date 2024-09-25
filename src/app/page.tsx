import OpenAI from "openai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import markdownit from 'markdown-it';
import { getPrompt } from "@/utils/prompt";
import DOMPurify from "isomorphic-dompurify";
import CopyText from "@/components/CopyText";


// const videoId = '8ogJlOIxKVE';
// const videoId = 'hX4a-i_Y7Vk';
// const videoId = 'oD7j-GZvVmg';
// const videoId = 't23lCCo4g34'
const videoId = 'pcC4Dr6Wj2Q'
// const videoId = 'uDcb12CqoR4' //not working
interface Data {
  text: string, 
  duration: number, 
  offset: number, 
  lang: string
}

const message1 = `<h3>Highlights and Key Points from the Video:</h3> <ol> <li> <p><strong>Changing Economy in Software Development:</strong></p> <ul> <li>The traditional approach of relying solely on resumes to secure job opportunities is becoming less effective.</li> <li>Networking and self-marketing are essential in the current job market.</li> </ul> </li> <li> <p><strong>Importance of Personal Branding:</strong></p> <ul> <li>Successful developers actively market themselves to stand out in a competitive landscape.</li> <li>Establishing a strong online presence can lead to increased job opportunities and frequent offers.</li> </ul> </li> <li> <p><strong>Examples of Successful Developers:</strong></p> <ul> <li>There are many developers who regularly receive job offers due to their strong personal branding and visibility.</li> <li>These individuals are often well-known in the community, which enhances their credibility.</li> </ul> </li> <li> <p><strong>Common Mistakes in Outreach:</strong></p> <ul> <li>Many applicants fail to establish authority and professionalism when reaching out for opportunities (e.g., using non-credible email addresses).</li> <li>A lack of a professional website or portfolio diminishes their chances of being taken seriously.</li> </ul> </li> <li> <p>**Professional</p> </li> </ol>
`;

const message = `### **Summary**
The release of Deno 2 marks a significant improvement in the JavaScript backend ecosystem, offering full compatibility with Node.js and npm. This video explores Deno 2's new features, including enhanced TypeScript support, an integrated package registry, and improved code management functionalities.

### **Analogy**
Think of Deno 2 as a powerhouse vehicle that finally has the compatibility to drive on multiple highways (Node.js and npm) without any speed bumps, providing developers with a smoother and more efficient coding journey.

### **Notes**
- 🚀 **New Features**: Deno 2 redefines JavaScript with polished qualities and powerful enhancements.
- 🔗 **Full Compatibility**: Deno 2 now seamlessly works with Node.js and npm, addressing previous limitations.
- 🎨 **TypeScript Support**: No configuration needed; just change the file extension to '.ts' for TypeScript benefits.
- ✅ **Built-in Code Quality Tools**: Deno includes tools like linting and formatting, reducing reliance on external packages.
- 📦 **Package Management**: Supports monorepos and retains compatibility with existing package.json workflows using 'deno install'.
- 💾 **Standard Library**: Deno's stable standard library reduces the need for many third-party packages.
- ⚙️ **Binary Compilation**: Developers can compile JavaScript into binaries, enhancing portability across operating systems.
- 📚 **Interactive Notebooks**: Integrated Jupyter kernel allows for innovative, block-by-block code execution in JavaScript, expanding its development capabilities.
- 🏗️ **Technical Debt Management**: Existing projects can transition to Deno and leverage npm packages, easing the switch.`;

const getTextSummary = (data: Data[]) => {
  // merge text together based on offset -> limit 20
  let res: string[] = [];
  let offset = 20;
  let b = '';

  data.forEach(v => {
      if (Math.ceil(v.offset) <= offset) {
          b += v.text + ' ';
      } else {
          res.push(b);
          offset += 20;
          b = v.text;
      }
  })

  return res;
}

const openAIResponse = async (message: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
  });
  // "Give highlights of the video with pointers. Give a brief explanation of the key points with pointers."
  const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
          {"role": "user", 
            "content": getPrompt(message)
          }
      ],
      max_completion_tokens: 400
  });
  console.log(completion.usage);
  return completion;
}

export default async function Home() {
  const res = await fetch(`http://localhost:3000/api?videoId=${videoId}`); 
  const data = (await res.json()).data; 
  let textArr: string[] = [];
  if (data) {
    console.log(data[0], 'data');
    textArr = getTextSummary(data);
  }

  // console.log(textArr, 'text')

  // const response = await openAIResponse(textArr.join(" "));
  // const message: string = response.choices[0].message.content;
  const md = markdownit({
    html: true,
    linkify: false,
    quotes: '“”‘’',
  }).use(require('markdown-it-sup'));
  const result = md.render(DOMPurify.sanitize(message));
  console.log(message);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <nav className="flex w-full drop-shadow-md justify-between border p-5">
        <div>
          Icon
        </div>
        <div className="flex gap-10">
          <div>
            Sign In
          </div>
          <div>Get Started</div>
        </div>
      </nav>
      {/* <input placeholder="Enter the youtube id..." value='' /> */}
      <div className="flex gap-10">
        <iframe
          width="400"
          height="300" src={`https://www.youtube.com/embed/${videoId}`}
          title="4 Top-notch Coding Projects for Employment!"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen>
        </iframe>
        <Tabs defaultValue="transcript" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="summarize">Summarize</TabsTrigger>
          </TabsList>
          <TabsContent value="transcript">

            <div className='w-[600px] h-[500px] overflow-scroll p-4 border-2'>
              {textArr.map((text, index) => (
                <div key={index} className="flex flex-grow justify-between gap-2 mb-10 text-sm shadow-lg border-0 drop-shadow-lg p-4 pr-8">
                  {text}
                  <CopyText text={text} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="summarize">
            <div className='w-[600px] h-[500px] overflow-scroll p-4 border-2'>
              <div className="text-xs" dangerouslySetInnerHTML={{ __html: result }} />;
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
