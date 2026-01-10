"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LatencyContextType {
  latency: number | null;
  updateLatency: (time: number) => void;
}

const LatencyContext = createContext<LatencyContextType>({
  latency: null,
  updateLatency: () => {},
});

export function LatencyProvider({ children }: { children: ReactNode }) {
  const [latency, setLatency] = useState<number | null>(null);

  const updateLatency = (time: number) => {
    setLatency(time);
  };

  return (
    <LatencyContext.Provider value={{ latency, updateLatency }}>
      {children}
    </LatencyContext.Provider>
  );
}

export function useLatency() {
  return useContext(LatencyContext);
}
