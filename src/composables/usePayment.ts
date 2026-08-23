import { ref } from "vue";

export interface PaymentConfig {
  terminalKey: string;
  amount: number;
  orderId: string;
  description: string;
  itemName?: string;
}

declare global { interface Window {
  PaymentIntegration?: any;
  __tinkoffReady?: boolean;
  __tinkoffIntegration?: any;
} }

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function waitForTinkoff(): Promise<void> {
  if (window.__tinkoffReady) return;
  for (let i = 0; i < 100; i++) {
    if (window.__tinkoffReady) return;
    await sleep(100);
  }
  throw new Error("Tinkoff not ready after 10s");
}

export async function loadTinkoffScript(): Promise<void> {
  await waitForTinkoff();
}

export async function openPayment(config: PaymentConfig) {
  try {
    await waitForTinkoff();
    const int = window.__tinkoffIntegration;
    if (!int) throw new Error("Integration not found");

    const itemName = config.itemName || config.description;
    const amountKopecks = config.amount;

    const body = {
      TerminalKey: config.terminalKey,
      Amount: amountKopecks,
      OrderId: config.orderId,
      Description: config.description.substring(0, 140),
      SuccessURL: `${window.location.origin}/payment/success/`,
      FailURL: `${window.location.origin}/payment/fail/`,
      DATA: { connection_type: "Widget" },
      Receipt: {
        Email: "info@fonai.ru",
        Taxation: "usn_income",
        Items: [{
          Name: itemName.substring(0, 128),
          Price: amountKopecks,
          Quantity: 1,
          Amount: amountKopecks,
          Tax: "none",
          PaymentMethod: "full_payment",
          PaymentObject: "service",
        }],
      },
    };

    const resp = await new window.PaymentIntegration.Helpers()
      .request("/api/init.php", "POST", body);
    if (!resp || !resp.PaymentURL) throw new Error("No PaymentURL");

    document.querySelectorAll("[data-tbank-overlay]").forEach(el => el.remove());

    const c = document.createElement("div");
    c.setAttribute("data-tbank-overlay", "true");
    c.style.cssText = "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center";
    const fid = "tbank-frm-" + config.orderId;
    c.innerHTML = '<div id="' + fid + '" style="width:100%;max-width:420px;height:600px;background:#fff;border-radius:12px;overflow:hidden"></div>';
    c.onclick = (e: Event) => { if (e.target === c) { c.remove(); int.iframe.remove("p-" + config.orderId); } };
    document.body.appendChild(c);

    const ifrName = "p-" + config.orderId;
    await int.iframe.remove(ifrName);
    const ifr = await int.iframe.create(ifrName, {});
    await ifr.mount(c.querySelector("#" + fid), resp.PaymentURL);
  } catch (e: any) {
    console.error("Payment error:", e);
    alert("Платёжная система временно недоступна. " + (e.message || "Попробуйте позже."));
  }
}

export function usePayment() {
  return { loadTinkoffScript, openPayment };
}