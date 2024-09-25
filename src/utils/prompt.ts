const prompt = `Your output should use the following template:
### Summary
### Analogy
### Notes
- [Emoji] Bulletpoint
You have been tasked with creating a concise within two lines summary of a YouTube video using its transcription.
Make a summary of the transcript. Make the titles in bold.
Create bullet points (each with an appropriate emoji) that summarize the key points or important moments from the video's transcription.
In addition to the bullet points. Please ensure that the summary, bullet points, and explanations 
fit within the 330-word limit, while still offering a comprehensive and clear understanding 
of the video's content. Use the text above: `

export const getPrompt = (message : string) => {
  return `${prompt} {${message}}`
}