"use client";

import { useLatency } from "@/lib/LatencyContext";
import { useState } from "react";

export default function ConnectionIndicator() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { latency } = useLatency();

  const getQualityInfo = () => {
    if (latency === null) {
      return {
        color: "text-gray-600",
        quality: "Idle",
        description: "No recent requests"
      };
    }
    
    if (latency < 200) {
      return {
        color: "text-green-600",
        quality: "Excellent",
        description: "Fast response"
      };
    } else if (latency < 500) {
      return {
        color: "text-blue-600",
        quality: "Good",
        description: "Normal response"
      };
    } else if (latency < 1000) {
      return {
        color: "text-yellow-600",
        quality: "Fair",
        description: "Slightly slow"
      };
    } else {
      return {
        color: "text-red-600",
        quality: "Poor",
        description: "Slow response"
      };
    }
  };

  const qualityInfo = getQualityInfo();

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`cursor-help ${qualityInfo.color}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          />
        </svg>
      </div>

      {showTooltip && (
        <div className="absolute left-0 bottom-12 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-50 animate-fadeIn">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">API Response Time</span>
              <span className={`font-bold ${qualityInfo.color}`}>
                {qualityInfo.quality}
              </span>
            </div>
            
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Last request:</span>
                <span className="font-medium text-gray-900">
                  {latency !== null ? `${latency} ms` : "N/A"}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${qualityInfo.color}`}>
                  {qualityInfo.description}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t text-xs text-gray-500">
                <p className="mb-1 font-semibold">Response time ranges:</p>
                <p>• &lt;200ms: Excellent</p>
                <p>• 200-500ms: Good</p>
                <p>• 500-1000ms: Fair</p>
                <p>• &gt;1000ms: Poor</p>
                <p className="mt-2 text-yellow-700">⚠️ Warning shown after 5s</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
