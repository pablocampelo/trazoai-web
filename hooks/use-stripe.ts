import { useState } from 'react';

export function useStripe() {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (planId: string) => {
    setLoading(true);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to create checkout session');
      }

      const sessionId = String(data?.sessionId || '');
      if (!sessionId) {
        throw new Error('No session ID received from server');
      }

      // Demo redirect interno (sin Stripe real)
      const plan = encodeURIComponent(planId);
      const sid = encodeURIComponent(sessionId);

      window.location.href = `/dashboard?checkout=success&plan=${plan}&sessionId=${sid}`;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      alert(`Checkout demo: ${errorMessage}. (En esta demo no hay pagos reales)`);
    } finally {
      setLoading(false);
    }
  };

  return { redirectToCheckout, loading };
}
