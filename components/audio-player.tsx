"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2 } from "lucide-react"

interface AudioPlayerProps {
  audioUrl: string
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isStarted, setIsStarted] = useState(false)
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // تعيين الصوت للتشغيل التلقائي والتكرار
    audio.volume = 0.4 // مستوى صوت مناسب
    audio.loop = true

    const handleCanPlay = async () => {
      try {
        // محاولة التشغيل التلقائي
        await audio.play()
        setIsStarted(true)
        setShowButton(false)
      } catch (err) {
        console.log("[Audio] Auto-play blocked by browser, showing start button")
        setShowButton(true)
      }
    }

    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  const startAudio = async () => {
    if (!audioRef.current) return
    
    try {
      await audioRef.current.play()
      setIsStarted(true)
      setShowButton(false)
    } catch (err) {
      console.log("[Audio] Failed to start audio:", err)
    }
  }

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        crossOrigin="anonymous" 
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
      
      {showButton && !isStarted && (
        <button
          onClick={startAudio}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 animate-pulse"
          title="تشغيل الموسيقى"
        >
          <Volume2 className="w-5 h-5" />
          <span className="font-semibold">تشغيل الموسيقى</span>
        </button>
      )}
    </>
  )
}
