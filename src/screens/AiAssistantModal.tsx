import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Zap,
  CheckCircle,
  HelpCircle,
  Bot,
  User,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { AiChatMessage, Professional } from '../types';
import { RAG_KNOWLEDGE_DOCUMENTS } from '../data/mockData';
import { askTrustoraAI } from '../services/geminiService';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onNavigateToCategory: (categoryId: string) => void;
  onBookProvider: (professionalId: string) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  onNavigateToCategory,
  onBookProvider
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: "Hello! I am Trustora AI Assistant. You can describe your problem in simple words or speak in English or Telugu (ఉదాహరణకు: 'మా ఇంట్లో వాటర్ ట్యాప్ లీక్ అవుతోంది'). How can I help you today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState(initialQuery);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'te'>('en');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
      if (initialQuery && initialQuery.trim()) {
        if (initialQuery === 'Voice diagnosis') {
          setTimeout(() => toggleSpeechRecognition(), 400);
        } else {
          handleUserQuery(initialQuery);
        }
      }
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Natural Language AI Classifier & RAG engine
  const handleUserQuery = async (query: string) => {
    if (!query.trim()) return;

    const userMsg: AiChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const lower = query.toLowerCase();

      // Check RAG Policy Queries first
      if (
        lower.includes('guarantee') ||
        lower.includes('warranty') ||
        lower.includes('recurring') ||
        lower.includes('rework')
      ) {
        const doc = RAG_KNOWLEDGE_DOCUMENTS[1];
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'assistant',
            text: `According to our ${doc.title}: ${doc.content}`,
            timestamp: 'Just now',
            suggestedAction: {
              label: 'Explore Verified Services',
              categoryId: 'electrician',
              actionType: 'view_service'
            }
          }
        ]);
        setIsTyping(false);
        return;
      }

      if (
        lower.includes('cancel') ||
        lower.includes('refund') ||
        lower.includes('money back')
      ) {
        const doc = RAG_KNOWLEDGE_DOCUMENTS[2];
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'assistant',
            text: `Policy Clarification: ${doc.content}`,
            timestamp: 'Just now'
          }
        ]);
        setIsTyping(false);
        return;
      }

      const result = await askTrustoraAI(query, selectedLanguage);

      const catId =
        result.category === 'Plumber'
          ? 'plumber'
          : result.category === 'AC Service'
          ? 'ac_service'
          : result.category === 'Cleaning'
          ? 'cleaning'
          : 'electrician';

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: result.text,
          timestamp: 'Just now',
          classificationData: {
            category: result.category || 'Electrician',
            intent: result.intent || 'service_repair',
            priority: result.priority || 'normal',
            confidence: result.confidence || 0.96,
            estimatedCost: result.estimatedCost || '₹199 visit charge'
          },
          suggestedAction: {
            label: `Book ${result.category || 'Professional'}`,
            categoryId: catId,
            actionType: 'view_service'
          }
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: 'I can help connect you with verified Electricians or Plumbers in your area.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Web Speech API Voice Recognition
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your current browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLanguage === 'te' ? 'te-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleUserQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Text-to-Speech
  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage === 'te' ? 'te-IN' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[85vh] sm:h-[80vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Assistant Header */}
        <div className="p-4 bg-gradient-to-r from-[#0B1F3A] to-[#0A364A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base">Trustora AI Assistant</h3>
                <span className="text-[10px] bg-teal-400 text-teal-950 font-bold px-1.5 py-0.2 rounded font-mono">
                  RAG + NLP
                </span>
              </div>
              <p className="text-[11px] text-teal-200/90">
                Natural problem diagnostic • Telugu & English
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle: EN / TE */}
            <div className="flex bg-white/10 rounded-lg p-0.5 text-[11px] font-bold">
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-2 py-0.5 rounded-md transition ${
                  selectedLanguage === 'en' ? 'bg-teal-500 text-white' : 'text-slate-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setSelectedLanguage('te')}
                className={`px-2 py-0.5 rounded-md transition ${
                  selectedLanguage === 'te' ? 'bg-teal-500 text-white' : 'text-slate-300'
                }`}
              >
                తెలుగు
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Try:
          </span>
          <button
            onClick={() => handleUserQuery('My kitchen tap is leaking since yesterday')}
            className="text-[11px] font-medium bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 px-2.5 py-1 rounded-full shrink-0 transition"
          >
            🚰 Tap leaking
          </button>
          <button
            onClick={() => handleUserQuery('Main MCB breaker keeps tripping on AC start')}
            className="text-[11px] font-medium bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 px-2.5 py-1 rounded-full shrink-0 transition"
          >
            ⚡ Breaker tripping
          </button>
          <button
            onClick={() => handleUserQuery('AC is running but not cooling the room')}
            className="text-[11px] font-medium bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 px-2.5 py-1 rounded-full shrink-0 transition"
          >
            ❄️ AC not cooling
          </button>
          <button
            onClick={() => handleUserQuery('How much is the visit charge and is it adjusted?')}
            className="text-[11px] font-medium bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 px-2.5 py-1 rounded-full shrink-0 transition"
          >
            💰 Visit fee policy
          </button>
          <button
            onClick={() => handleUserQuery('Is there a 30-day rework warranty on repairs?')}
            className="text-[11px] font-medium bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 px-2.5 py-1 rounded-full shrink-0 transition"
          >
            🛡️ 30-Day Guarantee
          </button>
          <button
            onClick={() => handleUserQuery('మా ఇంట్లో వాటర్ ట్యాప్ లీక్ అవుతోంది')}
            className="text-[11px] font-medium bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded-full shrink-0 transition"
          >
            🗣️ తెలుగు (వాటర్ లీక్)
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-teal-700 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>

                {/* AI Structured NLP Classification Output Card (Feature 4 in spec) */}
                {msg.classificationData && (
                  <div className="mt-3 p-2.5 bg-teal-50/80 rounded-xl border border-teal-200/80 text-[11px] text-slate-700 space-y-1">
                    <div className="font-bold text-teal-900 flex items-center justify-between">
                      <span>Service Identified:</span>
                      <span className="font-black text-teal-700">{msg.classificationData.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Intent:</span>
                      <span className="font-mono">{msg.classificationData.intent}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Confidence:</span>
                      <span className="font-mono text-emerald-700 font-bold">
                        {(msg.classificationData.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Estimated Range:</span>
                      <span className="font-bold text-slate-900">
                        {msg.classificationData.estimatedCost}
                      </span>
                    </div>
                  </div>
                )}

                {/* Suggested Direct Action Button */}
                {msg.suggestedAction && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        onClose();
                        if (msg.suggestedAction?.categoryId) {
                          onNavigateToCategory(msg.suggestedAction.categoryId);
                        }
                      }}
                      className="w-full py-2 bg-[#009688] hover:bg-[#00796B] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* TTS Audio playback button */}
                {msg.sender === 'assistant' && (
                  <div className="mt-2 flex items-center justify-end">
                    <button
                      onClick={() => handleSpeak(msg.text)}
                      className="text-[10px] text-slate-400 hover:text-teal-700 flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs text-xs">
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500 py-1">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-xs text-xs">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] font-medium text-slate-500 ml-1">Analyzing diagnosis...</span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserQuery(inputText);
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Mic Button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-xl transition ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
              }`}
              title="Speak in English or Telugu"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                selectedLanguage === 'te'
                  ? 'మీ సమస్యను ఇక్కడ టైప్ చేయండి లేదా మాట్లాడండి...'
                  : 'Describe your service requirement...'
              }
              className="flex-1 py-2.5 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600 focus:bg-white transition"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white rounded-xl transition shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
