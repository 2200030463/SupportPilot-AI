"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

interface VoiceControllerProps {
  onSpeechResult: (text: string) => void;
  lastAssistantResponse?: string;
}

export function VoiceController({ onSpeechResult, lastAssistantResponse }: VoiceControllerProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  // Web Speech API STT
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Edge.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN"; // English (India) / Hinglish support

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onSpeechResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Text-To-Speech Synthesis
  useEffect(() => {
    if (ttsEnabled && lastAssistantResponse && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any existing speech
      const cleanText = lastAssistantResponse.replace(/[\*\_#`]/g, ""); // Strip markdown symbols
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "en-IN";
      utterance.rate = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  }, [lastAssistantResponse, ttsEnabled]);

  const toggleTTS = () => {
    if (isSpeaking && typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setTtsEnabled(!ttsEnabled);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Speech-to-Text Mic Button */}
      <button
        type="button"
        onClick={startListening}
        aria-label={isListening ? "Stop voice listening" : "Start voice input"}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
          isListening
            ? "bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
        }`}
        title="Voice Input (Speech-To-Text)"
      >
        {isListening ? (
          <>
            <MicOff className="h-4 w-4" />
            <span>Listening...</span>
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 text-emerald-400" />
            <span>Voice</span>
          </>
        )}
      </button>

      {/* Text-To-Speech Voice Toggle */}
      <button
        type="button"
        onClick={toggleTTS}
        aria-label={ttsEnabled ? "Mute text to speech voice output" : "Enable text to speech voice output"}
        className={`flex items-center justify-center rounded-lg p-2 transition-all ${
          ttsEnabled ? "bg-slate-800 text-cyan-400 border border-slate-700" : "bg-slate-900 text-slate-400 border border-slate-800"
        }`}
        title={ttsEnabled ? "Voice Output Active" : "Voice Muted"}
      >
        {ttsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    </div>
  );
}
