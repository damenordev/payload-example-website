'use server'

import { readDocFile } from '@/utilities/read-doc'
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

export const generateTextWithAI = async (prompt: string) => {
  const data = await readDocFile()
  const result = await generateText({
    model: google('gemini-2.0-flash-exp'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Responde en el idioma que te pregunten. Eres un experto arquitecto de software, y tienes que responder a la pregunta, siempre teniendo en el contexto el documento: ${prompt}. Contesta como si fuera un chat, no uses markdown, solo texto. Aporta información adicional si fuera necesario, sin perder el contexto del documento. No uses listas, ni tablas, ni código, solo texto.`,
          },
          {
            type: 'file',
            data,
            mimeType: 'application/pdf',
          },
        ],
      },
    ],
  })

  return result.text
}
