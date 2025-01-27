'use client'

import { useState } from 'react'
import { generateTextWithAI } from '@/actions/ai.actions'
// import { SpeakerIcon } from 'lucide-react'

// const textToSpeech = (text: string) => {
//   const SpeechSynthesis = window.speechSynthesis
//   const utterance = new SpeechSynthesisUtterance(text)
//   utterance.lang = 'es-ES'
//   utterance.rate = 1.2
//   utterance.pitch = 1
//   utterance.volume = 1
//   SpeechSynthesis.speak(utterance)
// }

export default function ChatPage() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const response = await generateTextWithAI(prompt)
    setResponse(response)
    setPrompt('')
    setIsLoading(false)
  }

  // Cancelar el audio al desmontar el componente
  // useEffect(() => {
  //   return () => {
  //     window.speechSynthesis.cancel()
  //   }
  // }, [])

  return (
    <div className='flex flex-col gap-2 items-center justify-center pt-4 h-full w-full max-w-2xl mx-auto'>
      <form className='flex gap-2 w-full' onSubmit={handleSubmit}>
        <input className="bg-transparent border border-white/20 px-3 py-2 rounded-xl w-full" type="text" name="prompt" placeholder='Ask me anything' value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        {/* {response && <button onClick={() => textToSpeech(response)}>
          <SpeakerIcon className='size-6' />
        </button>} */}
        <button className='bg-emerald-400 text-black px-4 py-1 rounded-xl' type="submit">
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </form>
      <div className='text-white/50 flex-1'>{response}</div>

    </div>
  )
}
