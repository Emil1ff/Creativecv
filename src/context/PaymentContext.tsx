import { createContext, useContext, useEffect, useMemo, useState } from "react";

type PaymentContextType = {
  isPro: boolean;
  purchasePro: (opts?: { priceCents?: number; plan?: string }) => Promise<void>;
  loading: boolean;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

const STORAGE_KEY = "creativecv_pro_status";

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") setIsPro(true);
  }, []);

  const purchasePro = async (_opts?: { priceCents?: number; plan?: string }) => {
    setLoading(true);
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 1200));
    setIsPro(true);
    localStorage.setItem(STORAGE_KEY, "true");
    setLoading(false);
  };

  const value = useMemo(
    () => ({ isPro, purchasePro, loading }),
    [isPro, loading]
  );

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
}

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error("usePayment must be used within PaymentProvider");
  return ctx;
}


