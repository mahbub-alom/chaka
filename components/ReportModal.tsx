"use client";

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  isDarkMode: boolean;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export default function ReportModal({
  isOpen,
  onClose,
  listingId,
  isDarkMode,
  showToast
}: ReportModalProps) {
  const [reportReason, setReportReason] = useState<string>('Fake or mismatched specifications');
  const [reportDetails, setReportDetails] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmitReport = () => {
    if (!reportDetails.trim()) {
      showToast('Please type custom description details to submit your report.', 'error');
      return;
    }
    const reportId = `rep_${Date.now()}`;
    try {
      const savedReports = localStorage.getItem('chaka-reported-abuse-list');
      const parsedReports = savedReports ? JSON.parse(savedReports) : [];
      parsedReports.push({
        id: reportId,
        listingId: listingId || 'general',
        reason: reportReason,
        details: reportDetails,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('chaka-reported-abuse-list', JSON.stringify(parsedReports));
    } catch (e) {
      console.error("Local storage reporting error: ", e);
    }

    showToast('Your Abuse Report submitted successfully for quick audit.', 'success');
    onClose();
    setReportDetails('');
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs cursor-pointer transition-opacity" 
        onClick={onClose}
      />
      
      <div className={`relative max-w-md w-full rounded-3xl border p-6 shadow-2xl overflow-hidden transition-all duration-300 animate-slide-in z-10 ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="h-1 w-24 bg-orange-500 rounded-full mx-auto mb-4" />

        <div className="flex items-center gap-3 mb-3">
          <span className="p-2 rounded-xl bg-orange-500/10 text-orange-500 shrink-0">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </span>
          <div>
            <h3 className="font-extrabold text-sm md:text-base">Report Listing or Abuse</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-404">We investigate listings within 2 hours. Help keep Chaka Bangladesh authentic.</p>
          </div>
        </div>

        <div className="space-y-4 my-4 text-xs">
          <div>
            <label className="block text-[10px] uppercase font-black tracking-widest text-[#ff6600] mb-1.5">Select Abuse Type / Reason</label>
            <div className="relative">
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border outline-none text-xs ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-orange-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-orange-500'
                }`}
              >
                <option value="Fake or mismatched specifications">Fake or mismatched specifications</option>
                <option value="Fraudulent seller custom description">Fraudulent seller custom description</option>
                <option value="Incorrect pricing details / bait-and-switch">Incorrect pricing details / bait-and-switch</option>
                <option value="Stolen or invalid license / documentations">Stolen or invalid license / documentations</option>
                <option value="Visual spam or duplicative listing text">Visual spam or duplicative listing text</option>
                <option value="Seller unreachable or suspicious behavior">Seller unreachable or suspicious behavior</option>
                <option value="Other abuse pattern">Other abuse pattern</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-black tracking-widest text-[#ff6600] mb-1.5">Describe custom details / proof</label>
            <textarea
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              placeholder="Please write relevant details describing correct specifications... (আমাদের আপনার অভিযোগের সঠিক বিবরণ দিন)"
              rows={4}
              required
              className={`w-full px-3 py-2 text-xs rounded-xl border outline-none resize-none ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-orange-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-orange-500'
              }`}
            />
          </div>
        </div>

        <div className="flex gap-2.5 mt-5">
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmitReport}
            className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-orange-600/15"
          >
            Send Abuse Report 🚨
          </button>
        </div>
      </div>
    </div>
  );
}
