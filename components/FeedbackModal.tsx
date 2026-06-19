import React, { useState } from 'react';
import { 
  MessageSquare, 
  Bug, 
  Lightbulb, 
  X, 
  Send, 
  CheckCircle2 
} from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function FeedbackModal({ isOpen, onClose, isDarkMode }: FeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'other'>('feature');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setIsSubmitting(true);
    
    // Simulate API call and success state
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const handleClose = () => {
    onClose();
    // Keep timeout to avoid content flash during transition
    setTimeout(() => {
      setFeedbackType('feature');
      setFeedbackText('');
      setFeedbackEmail('');
      setIsSubmitted(false);
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300">
      <div 
        onClick={handleClose} 
        className="absolute inset-0"
      />
      <div className={`relative w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-all transform scale-100 ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#ff6600]" />
            <h3 className="font-extrabold text-base tracking-tight">Give Us Your Feedback</h3>
          </div>
          <button 
            onClick={handleClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                What's on your mind?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackType('feature')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-xs font-bold transition-all gap-1 cursor-pointer ${
                    feedbackType === 'feature'
                      ? 'border-[#ff6600] bg-[#ff6600]/10 text-[#ff6600]'
                      : isDarkMode 
                        ? 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-400' 
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>Feature</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('bug')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-xs font-bold transition-all gap-1 cursor-pointer ${
                    feedbackType === 'bug'
                      ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                      : isDarkMode 
                        ? 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-400' 
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <Bug className="w-4 h-4" />
                  <span>Report Bug</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('other')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-xs font-bold transition-all gap-1 cursor-pointer ${
                    feedbackType === 'other'
                      ? 'border-slate-500 bg-slate-500/10 text-slate-500'
                      : isDarkMode 
                        ? 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-400' 
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Suggestion</span>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="feedback-comment" className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Your message
              </label>
              <textarea
                id="feedback-comment"
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                required
                maxLength={1000}
                placeholder={
                  feedbackType === 'bug'
                    ? "Describe how we can reproduce the issue you encountered..."
                    : feedbackType === 'feature'
                      ? "What new features or additions would make Chaka.BD even better?"
                      : "Any queries, improvement suggestions, or kind words..."
                }
                className={`w-full text-xs font-medium rounded-xl p-3 border focus:outline-none focus:ring-1 focus:ring-[#ff6600]/50 transition-all ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-[#ff6600]' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#ff6600]'
                }`}
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Be descriptive</span>
                <span>{feedbackText.length}/1000 characters</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="feedback-email" className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center justify-between">
                <span>Email Address <span className="text-slate-500/60 font-bold lowercase normal-case">(optional)</span></span>
              </label>
              <input
                id="feedback-email"
                type="email"
                value={feedbackEmail}
                onChange={(e) => setFeedbackEmail(e.target.value)}
                placeholder="Enter your email so we can reply..."
                className={`w-full text-xs font-medium rounded-xl px-3 py-2 border focus:outline-none focus:ring-1 focus:ring-[#ff6600]/50 transition-all ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-[#ff6600]' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#ff6600]'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !feedbackText.trim()}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                !feedbackText.trim()
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : 'bg-[#ff6600] text-white hover:bg-[#028059] active:scale-98 shadow-md hover:shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Sending feedback...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 text-orange-500">
              <CheckCircle2 className="w-6 h-6 animate-bounce-subtle" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-extrabold text-base">Feedback Received!</h4>
              <p className={`text-xs max-w-xs mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Thank you for helping us improve Chaka.BD. Our team will review your report and take action where necessary.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              OK, Got It
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
