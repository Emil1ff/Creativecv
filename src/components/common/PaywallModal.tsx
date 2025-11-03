import Button from "../ui/button/Button";
import { usePayment } from "../../context/PaymentContext";

interface PaywallModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  price?: number; // in USD
}

export default function PaywallModal({ onClose, onSuccess, price = 6 }: PaywallModalProps) {
  const { purchasePro, loading } = usePayment();

  const handlePurchase = async () => {
    await purchasePro({ priceCents: price * 100, plan: "pro" });
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Unlock Export</h3>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          Export to high‑quality PDF, unlimited times. One‑time payment, no subscription.
        </p>

        <div className="mt-4 rounded-lg border border-brand-300/40 p-4 dark:border-brand-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Pro Export</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Hi‑DPI PDF, multi‑page, ATS‑safe</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">${price}</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button variant="primary" onClick={handlePurchase} disabled={loading} className="min-w-[140px]">
            {loading ? "Processing..." : "Pay & Export"}
          </Button>
        </div>
      </div>
    </div>
  );
}


