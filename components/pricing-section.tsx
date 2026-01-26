'use client';

import { useEffect, useRef, useState } from 'react';
import { useStripe } from '@/hooks/use-stripe';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

type PlanId = 'free' | 'pro' | 'ultra';

export default function PricingSection() {
  const { redirectToCheckout } = useStripe();

  const [checkoutPendingPlan, setCheckoutPendingPlan] = useState<PlanId | null>(null);
  const [currentPlan, setCurrentPlan] = useState<PlanId>('free');
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const checkoutProcessingRef = useRef(false);

  const handleSubscribe = async (planId: PlanId) => {
    if (checkoutProcessingRef.current) return;

    try {
      const authResponse = await fetch('/api/me/summary');
      if (!authResponse.ok) {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.href);
        return;
      }
    } catch {
      window.location.href = '/login?redirect=' + encodeURIComponent(window.location.href);
      return;
    }

    checkoutProcessingRef.current = true;
    setCheckoutPendingPlan(planId);

    try {
      await redirectToCheckout(planId);
    } finally {
      checkoutProcessingRef.current = false;
      setCheckoutPendingPlan(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadPlan = async () => {
      try {
        const res = await fetch('/api/me/summary');
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && data?.plan) {
          setCurrentPlan(data.plan);
        }
      } catch {
        /* ignore */
      }
    };

    loadPlan();

    const params = new URLSearchParams(window.location.search);

    if (params.get('success') === 'true') {
      const plan = params.get('plan') as PlanId | null;
      setBannerMessage(plan ? `Suscripción a ${plan} completada.` : 'Pago completado.');
      loadPlan();
      setCheckoutPendingPlan(null);
      window.history.replaceState({}, '', window.location.pathname);
    }

    if (params.get('canceled') === 'true') {
      setBannerMessage('Pago cancelado. Puedes reintentar.');
      setCheckoutPendingPlan(null);
      window.history.replaceState({}, '', window.location.pathname);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <Badge variant="secondary">Pricing</Badge>
          <h2 id="creditos-planes" className="text-3xl md:text-4xl font-bold">
            Créditos & Planes
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Elige el plan que mejor se adapte a tu flujo creativo.
          </p>
        </div>

        {bannerMessage && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="rounded-md bg-green-50 border border-green-100 text-green-800 px-4 py-3 text-sm">
              {bannerMessage}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* FREE */}
          <Card className="h-[500px] flex flex-col">
            <CardHeader className="text-center">
              <div className="text-gray-500">Gratuito</div>
              <div className="text-5xl font-bold">Free</div>
              <CardDescription>Para comenzar</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <ul className="space-y-3 mb-auto text-sm text-gray-700">
                <li>5 diseños / mes</li>
                <li>Resolución estándar</li>
                <li>Estilos básicos</li>
              </ul>

              <Button
                className="mt-6"
                onClick={() => {
                  window.location.href = '/signup';
                }}
              >
                {currentPlan === 'free' ? 'Plan actual' : 'Seleccionar gratuito'}
              </Button>
            </CardContent>
          </Card>

          {/* PRO */}
          <Card className="h-[500px] flex flex-col">
            <CardHeader className="text-center">
              <div className="text-gray-500">Pro</div>
              <div className="text-5xl font-bold">€5</div>
              <CardDescription>/ mes</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <ul className="space-y-3 mb-auto text-sm text-gray-700">
                <li>Diseños ilimitados</li>
                <li>Alta resolución</li>
                <li>Todos los estilos</li>
              </ul>

              <Button
                disabled={checkoutPendingPlan !== null || currentPlan === 'pro'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe('pro');
                }}
              >
                {checkoutPendingPlan === 'pro' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentPlan === 'pro'
                  ? 'Plan actual'
                  : checkoutPendingPlan === 'pro'
                    ? 'Procesando...'
                    : 'Obtener Pro'}
              </Button>
            </CardContent>
          </Card>

          {/* ULTRA */}
          <Card className="h-[500px] flex flex-col relative overflow-hidden">
            <div
              className="absolute bottom-0 inset-x-0 h-[55%]"
              style={{
                background: 'linear-gradient(90deg, #FF66B6 0%, #FFCC33 100%)',
                opacity: 0.8,
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
              }}
            />

            <CardHeader className="text-center relative z-10">
              <div className="text-gray-500">Ultra</div>
              <div className="text-5xl font-bold">€48</div>
              <CardDescription>/ año</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 relative z-10">
              <ul className="space-y-3 mb-auto text-sm text-gray-700">
                <li>Funciones avanzadas</li>
                <li>Resolución máxima</li>
                <li>Soporte dedicado</li>
              </ul>

              <Button
                disabled={checkoutPendingPlan !== null || currentPlan === 'ultra'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe('ultra');
                }}
              >
                {checkoutPendingPlan === 'ultra' && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {currentPlan === 'ultra'
                  ? 'Plan actual'
                  : checkoutPendingPlan === 'ultra'
                    ? 'Procesando...'
                    : 'Obtener Ultra'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
