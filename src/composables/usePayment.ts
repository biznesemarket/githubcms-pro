import { ref } from "vue";

export interface PaymentConfig {
  terminalKey: string;
  amount: number;
  orderId: string;
  description: string;
}

const isReady = ref(false);
const initError = ref<string | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global { interface Window { PaymentIntegration?: any; onPaymentIntegrationLoad?: () => void; TINKOFF_TERMINAL_KEY?: string; } }

export function loadTinkoffScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isReady.value) { resolve(); return; }

    const script = document.createElement("script");
    script.src = "https://integrationjs.t-static.ru/integration.js";
    script.async = true;

    window.onPaymentIntegrationLoad = () => {
      const config = {
        terminalKey: window.TINKOFF_TERMINAL_KEY || "DEMO",
        product: "eacq",
        features: { payment: {} },
      };

      window.PaymentIntegration?.init(config)
        .then(() => {
          isReady.value = true;
          resolve();
        })
        .catch((err: Error) => {
          initError.value = err.message;
          reject(err);
        });
    };

    script.onerror = () => reject(new Error("Failed to load Tinkoff script"));
    document.body.appendChild(script);
  });
}

export function openPayment(config: PaymentConfig) {
  if (!window.PaymentIntegration) {
    console.error("Tinkoff PaymentIntegration not loaded");
    return;
  }

  window.PaymentIntegration.pay(
    {
      amount: config.amount,
      orderId: config.orderId,
      description: config.description,
      successUrl: `${window.location.origin}/payment/success/`,
      failUrl: `${window.location.origin}/payment/fail/`,
    },
    (result: { success: boolean; error?: string }) => {
      if (result.success) {
        window.location.href = `/payment/success/?order=${config.orderId}`;
      } else {
        console.error("Payment failed:", result.error);
        alert(`Оплата не прошла: ${result.error || "попробуйте снова"}`);
      }
    },
  );
}

export function usePayment() {
  return { isReady, initError, loadTinkoffScript, openPayment };
}
