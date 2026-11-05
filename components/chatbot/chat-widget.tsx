'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, X, Send, Minus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [localInput, setLocalInput] = useState('')
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })

  const isLoading = status === 'streaming'
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const renderText = (message: { parts?: Array<{ type?: string; text?: string }> }) =>
    message.parts
      ?.filter((part) => part.type === 'text' && typeof part.text === 'string')
      .map((part) => part.text)
      .join('') || ''

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl transition-transform hover:scale-110 z-50 p-0"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Ouvrir le chat</span>
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-[350px] flex-col rounded-2xl border bg-background shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 fade-in-0 sm:w-[400px]">
      <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">
            🌸
          </div>
          <div>
            <h3 className="font-medium leading-none">Nina</h3>
            <p className="text-xs text-primary-foreground/80 mt-1">Assistante Vyna</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-white/20 text-primary-foreground"
            onClick={() => setIsOpen(false)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-white/20 text-primary-foreground"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex h-[400px] flex-col overflow-y-auto p-4 gap-4 bg-secondary/30">
        {messages.length === 0 && (
          <div className="flex w-max max-w-[85%] flex-col gap-2 rounded-2xl rounded-tl-sm bg-background border px-4 py-2 text-sm text-muted-foreground shadow-sm">
            Bonjour ! 👋 Je suis Nina, votre assistante virtuelle. Comment puis-je vous aider aujourd&apos;hui ?
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-2 text-sm',
              m.role === 'user'
                ? 'ml-auto bg-primary text-primary-foreground rounded-tr-sm'
                : 'bg-background border rounded-tl-sm shadow-sm',
            )}
          >
            <span className="whitespace-pre-wrap">{renderText(m)}</span>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex w-max max-w-[85%] items-center gap-2 rounded-2xl rounded-tl-sm bg-background border px-4 py-3 text-sm text-muted-foreground shadow-sm">
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/50" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/50" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/50" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-background p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!localInput.trim() || isLoading) return
            void sendMessage({ text: localInput })
            setLocalInput('')
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 rounded-full bg-secondary/50 border-transparent focus-visible:ring-primary/20"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!localInput.trim() || isLoading}
            className="rounded-full h-10 w-10 shrink-0 shadow-md"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Envoyer</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
