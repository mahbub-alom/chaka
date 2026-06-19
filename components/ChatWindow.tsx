import React, { useState, useRef, useEffect } from 'react';
import { ChatConversation, ChatMessage } from '@/types';
import { 
  Send, 
  CheckCheck, 
  Phone, 
  MessageSquare, 
  AlertCircle, 
  Camera, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  Volume2, 
  VolumeX,
  Clock,
  ArrowRight
} from 'lucide-react';
import { MOCK_AUTO_REPLIES } from '@/lib/data';
import { convertToWebP } from '@/utils/imageUtils';
import { motion, AnimatePresence } from 'motion/react';

interface ChatWindowProps {
  chat: ChatConversation;
  isDarkMode: boolean;
  onSendMessage: (chatId: string, text: string, senderId: string, image?: string) => void;
  currentUserRole: 'buyer' | 'seller';
}

const MOCK_BUYER_REPLIES = [
  "Perfect! Can we schedule a physical inspection tomorrow afternoon?",
  "I am really interested in this vehicle. Is there a minor wiggle room on the pricing?",
  "Awesome! Could you please share the showroom's Google Map location pin?",
  "Great, how many owners has this vehicle had in Bangladesh?",
  "Sounds good to me. I would like to run the chassis number through the JP Auction Verify tool first."
];

export default function ChatWindow({ chat, isDarkMode, onSendMessage, currentUserRole }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatFileInputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages, isTyping]);

  // Self-contained Web Audio API professional sound synthesiser
  const playSound = (type: 'send' | 'receive') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'send') {
        // High-end clean digital swipe (A5 to C6 pitch glide)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.12);
        
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else {
        // Aesthetic responsive soft double chime/ping
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.08); // G5
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      }
    } catch (e) {
      // Swallowed if blocked by browser policy before user interaction
    }
  };

  const handleSend = (textToSend: string, imageToSend?: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed && !imageToSend) return;

    const sender = currentUserRole === 'buyer' ? 'buyer' : 'seller';
    
    // Play sound on send
    playSound('send');
    
    onSendMessage(chat.id, trimmed, sender, imageToSend);
    setInputText('');

    // Trigger instant real-time simulated client reply representing interactive chat
    if (!imageToSend) {
      setIsTyping(true);
      const randomDelay = 1200 + Math.random() * 800;
      
      setTimeout(() => {
        setIsTyping(false);
        
        // Play reply beep chime
        playSound('receive');
        
        let autoReplyText = '';
        if (currentUserRole === 'buyer') {
          const randomIndex = Math.floor(Math.random() * MOCK_AUTO_REPLIES.length);
          autoReplyText = MOCK_AUTO_REPLIES[randomIndex];
          onSendMessage(chat.id, autoReplyText, 'seller');
        } else {
          const randomIndex = Math.floor(Math.random() * MOCK_BUYER_REPLIES.length);
          autoReplyText = MOCK_BUYER_REPLIES[randomIndex];
          onSendMessage(chat.id, autoReplyText, 'buyer');
        }
      }, randomDelay);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(inputText);
    }
  };

  const handleFileAttachClick = () => {
    chatFileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsOptimizing(true);
      const webpBase64 = await convertToWebP(file, 1000, 0.75);
      handleSend('📷 Attached Image', webpBase64);
    } catch (err) {
      console.error('Failed to convert image to WebP: ', err);
    } finally {
      setIsOptimizing(false);
      if (chatFileInputRef.current) {
        chatFileInputRef.current.value = '';
      }
    }
  };

  const QUICK_MESSAGES = [
    'Is this item still available for sale?',
    'Is the price slightly negotiable?',
    'Are all vehicle papers up-to-date?',
    'I want to inspect it. When can we meet?',
    'Please share your exact location.'
  ];

  // Derive opponent's avatar initials
  const opponentName = currentUserRole === 'buyer' ? chat.sellerName : chat.buyerName;
  const partnerInitials = opponentName
    ? opponentName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'Ch';

  return (
    <div
      id={`chat-win-${chat.id}`}
      className={`flex flex-col h-[520px] md:h-[620px] rounded-2xl border overflow-hidden transition-all duration-300 shadow-xl ${
        isDarkMode 
          ? 'bg-slate-950 border-slate-800 text-slate-100 shadow-slate-950/40' 
          : 'bg-white border-slate-200 text-slate-900 shadow-slate-100/60'
      }`}
    >
      {/* Header Info */}
      <div className={`p-4 flex items-center justify-between border-b transition-colors ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/80 border-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              referrerPolicy="no-referrer"
              src={chat.listingImage || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=80'} 
              alt={chat.listingTitle} 
              className="w-11 h-11 object-cover rounded-xl shadow-inner border border-stone-800/10 dark:border-white/10"
            />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 p-0.5 dark:bg-slate-950">
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className={`text-[12.5px] font-black leading-none truncate max-w-[150px] md:max-w-[280px] ${
                isDarkMode ? 'text-slate-100' : 'text-slate-950'
              }`}>
                {chat.listingTitle}
              </h4>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/10 text-orange-500 border border-orange-500/10">
                <ShieldCheck className="w-2.5 h-2.5" /> Verified Chat
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`text-[11px] font-black ${isDarkMode ? 'text-teal-400' : 'text-[#ff6600]'}`}>
                {chat.listingPrice}
              </span>
              <span className="text-[10px] text-slate-400 font-sans">•</span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block animate-pulse"></span>
                {currentUserRole === 'buyer' ? `Seller: ${chat.sellerName}` : `Buyer: ${chat.buyerName}`}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Sound Synthesiser Enabler toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                : 'bg-slate-800/20 text-slate-500 border border-transparent'
            }`}
            title={soundEnabled ? "Mute interactive chat sound" : "Enable active audio feedback"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <a
            href={`tel:01712345678`}
            className={`p-2 rounded-xl border transition-colors flex items-center justify-center cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-750 hover:bg-slate-700 text-slate-300' 
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
            title="Call Partner"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar ${
        isDarkMode ? 'bg-slate-950/98' : 'bg-slate-50/30'
      }`}>
        <div className="text-center py-1">
          <span className={`text-[9.5px] px-3.5 py-1 rounded-full font-black tracking-wide flex items-center justify-center gap-1.5 w-fit mx-auto border ${
            isDarkMode 
              ? 'bg-slate-900/40 border-slate-800 text-slate-400' 
              : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <ShieldCheck className="w-3 h-3 text-orange-500 shrink-0" />
            Secure Chat Link Active
          </span>
        </div>

        {/* Marketplace Notice Disclaimer in Chat */}
        <div className={`p-3 rounded-xl border text-left transition-all ${
          isDarkMode 
            ? 'bg-amber-950/10 border-amber-900/30 text-amber-200' 
            : 'bg-amber-50/50 border-amber-200 text-stone-750'
        }`}>
          <p className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Marketplace Safety Note / সতর্কতা:
          </p>
          <p className="text-[10.5px] leading-relaxed font-semibold">
            Chaka.bd is a listing-only platform and has no involvement in deal transactions, guarantees, or payments. Deal safety is entirely your own responsibility. Physical inspection is highly advised before any transaction. <br />
            <span className="text-stone-500 dark:text-amber-300 font-medium block mt-1">চাকা.বিডি কোনো লেনদেন, বিক্রয় বা ডেলিভারি করে না। লেনদেনের সকল দ্বায়িত্ব ও নিরাপত্তা ক্রেতা-বিক্রেতার সম্পূর্ণ নিজস্ব। লেনদেনের পূর্বে সশরীরে যাচাই করুন।</span>
          </p>
        </div>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {chat.messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center text-slate-400"
              >
                <div className="p-3.5 rounded-full bg-[#ff6600]/10 text-[#ff6600] dark:bg-orange-500/10 dark:text-orange-400 mb-3">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 font-sans">Secure Conversation</h5>
                <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                  Send a message to start negotiating with the seller securely on Chaka.bd.
                </p>
              </motion.div>
            ) : (
              chat.messages.map((message) => {
                const isMe = (currentUserRole === 'buyer' && message.senderId === 'buyer') ||
                             (currentUserRole === 'seller' && message.senderId === 'seller');
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`flex items-start gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMe && (
                      <div className="h-7 w-7 rounded-lg font-black text-[10px] text-stone-900 flex items-center justify-center bg-gradient-to-br from-orange-300 to-teal-400 shadow-sm shrink-0">
                        {partnerInitials}
                      </div>
                    )}

                    <div className={`max-w-[78%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`rounded-2xl px-3.5 py-2.5 text-[12px] shadow-sm relative transition-all ${
                        isMe 
                          ? isDarkMode 
                            ? 'bg-gradient-to-r from-teal-500 to-orange-600 text-stone-950 font-bold rounded-br-none shadow-teal-500/5' 
                            : 'bg-orange-400 text-slate-950 font-bold rounded-br-none shadow-orange-400/5'
                          : isDarkMode 
                            ? 'bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-none' 
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                      }`}>
                        {message.image && (
                          <div className="mb-2 overflow-hidden rounded-xl border border-black/5 dark:border-white/5 cursor-zoom-in max-w-[200px]">
                            <img 
                              src={message.image} 
                              alt="Attached snippet" 
                              className="w-full h-auto object-cover max-h-[140px] hover:scale-105 transition-transform duration-200" 
                              onClick={() => {
                                const w = window.open();
                                if (w) {
                                  w.document.write(`<body style="margin:0;background:#050505;display:flex;align-items:center;justify-content:center;height:100vh;"><img src="${message.image}" style="max-width:100%;max-height:100vh;object-fit:contain;box-shadow:0 10px 40px rgba(0,0,0,0.5);" /></body>`);
                                }
                              }}
                            />
                          </div>
                        )}
                        {message.text && (
                          <p className={`leading-relaxed whitespace-pre-wrap font-sans ${isMe ? 'text-neutral-950' : ''}`}>
                            {message.text}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mt-1 px-1 opacity-70">
                        <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1 uppercase">
                          <Clock className="w-2.5 h-2.5" />
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isMe && <CheckCheck className="w-3.5 h-3.5 text-orange-400" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {isTyping && (
          <div className="flex justify-start items-center gap-2">
            <div className="h-7 w-7 rounded-lg font-black text-[10px] text-stone-900 flex items-center justify-center bg-gradient-to-br from-orange-300 to-teal-400 shadow-sm shrink-0 uppercase">
              {partnerInitials}
            </div>
            <div className={`rounded-xl px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-bl-none flex items-center gap-1`}>
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick templates helper */}
      {currentUserRole === 'buyer' && chat.messages.length < 6 && (
        <div className={`p-2.5 border-t overflow-x-auto flex gap-2 no-scrollbar ${
          isDarkMode ? 'bg-slate-900/40 border-slate-900' : 'bg-slate-50/50 border-slate-100'
        }`}>
          {QUICK_MESSAGES.map((msg, i) => (
            <button
              key={i}
              onClick={() => handleSend(msg)}
              className={`text-[11px] font-sans font-semibold whitespace-nowrap px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 hover:border-teal-500 hover:bg-slate-800 text-slate-300 hover:text-white' 
                  : 'bg-white border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 text-slate-700 hover:text-teal-700 shadow-2xs'
              }`}
            >
              {msg}
            </button>
          ))}
        </div>
      )}

      {/* 2026 Smart Negotiation Digital Panel */}
      <AnimatePresence>
        {showOfferForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`p-4 border-t border-dashed overflow-hidden transition-all duration-300 ${
              isDarkMode ? 'bg-slate-900 text-white border-slate-800' : 'bg-orange-50/90 text-slate-800 border-orange-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-1 bg-orange-500/10 px-2.5 py-1 rounded-lg">
                🏷️ Direct Price Offer
              </span>
              <button 
                onClick={() => setShowOfferForm(false)}
                className="text-[10px] font-black text-rose-500 hover:text-rose-600 transition-transform hover:scale-105 uppercase cursor-pointer"
              >
                [ Close ]
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[11px] font-black text-slate-450 uppercase">
                  Proposed:
                </span>
                <input
                  type="text"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="e.g., BDT 1,850,000"
                  className={`w-full pl-22 pr-3 py-2 text-[12px] rounded-xl border focus:outline-none transition-all font-black ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-teal-500' 
                      : 'bg-white border-slate-200 text-slate-900 focus:border-teal-400 focus:ring-1 focus:ring-teal-400'
                  }`}
                />
              </div>
              <button
                onClick={() => {
                  const trimmed = offerPrice.trim();
                  if (!trimmed) return;
                  const formattedMessage = `💸 [Smart Direct Offer Proposal] I am making a direct purchase offer of BDT ${trimmed} for this listing. Let me know if you would like to proceed.`;
                  handleSend(formattedMessage);
                  setShowOfferForm(false);
                  setOfferPrice('');
                }}
                className="px-4 py-2.5 text-[11.5px] font-extrabold bg-[#ff6600] hover:bg-[#eb5e00] text-white rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1 uppercase"
              >
                Propose <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[9px] text-slate-450 mt-1.5 font-sans italic">
              * Safety notice: Sending an offer does not lock funds. Ensure physical check-up before payments.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Tray */}
      <div className={`p-4 border-t flex items-center gap-2 transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <button
          onClick={() => setShowOfferForm(!showOfferForm)}
          className={`px-3 py-2.5 rounded-xl transition-all font-black text-xs flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 border ${
            showOfferForm
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-sm'
              : 'bg-orange-500/10 border-orange-500/20 text-[#ff6600] hover:bg-[#ff6600] hover:text-white hover:border-[#ff6600]'
          }`}
          title="Make direct proposed offer"
        >
          🏷️ <span className="inline">Offer</span>
        </button>

        {/* Dynamic Image upload / WebP converter button */}
        <button
          type="button"
          onClick={handleFileAttachClick}
          disabled={isOptimizing}
          className={`p-2.5 rounded-xl border transition-all text-xs flex items-center justify-center cursor-pointer shrink-0 ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-750 text-slate-300 hover:bg-slate-700 hover:text-teal-400' 
              : 'bg-slate-50 border-slate-250 text-slate-650 hover:bg-slate-100 hover:text-teal-600 hover:border-teal-300'
          }`}
          title="Attach photo (WebP optimized auto-converter)"
        >
          {isOptimizing ? (
            <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
          ) : (
            <Camera className="w-4 h-4" />
          )}
        </button>
        
        {/* Hidden File input */}
        <input
          type="file"
          ref={chatFileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Write your message here..."
          className={`flex-1 text-[12px] px-3.5 py-2.5 rounded-xl border focus:outline-none transition-all ${
            isDarkMode 
              ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-teal-500 focus:bg-slate-950/80 shadow-2xs' 
              : 'bg-slate-50 border-slate-250 focus:border-teal-400 focus:bg-white text-slate-900 shadow-2xs'
          }`}
        />
        
        <button
          onClick={() => handleSend(inputText)}
          disabled={!inputText.trim()}
          className={`p-2.5 rounded-xl transition-all font-bold ${
            inputText.trim() 
              ? 'bg-gradient-to-r from-teal-500 to-orange-500 text-slate-950 hover:from-teal-400 hover:to-orange-400 shadow-md cursor-pointer' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
