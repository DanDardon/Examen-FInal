// stripeService.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q9f87RqdboZECAlc9JUXFkxFQA4hx6tcrTpVEXX2glg2CKFY60uOiZGgXTBHbkyzb6MIxmVBUfY5v4zykWKpllM00tcKIQfca'); // Reemplaza con tu clave pública

export const createCheckoutSession = async (amount: number) => {
  const stripe = await stripePromise;

  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  const sessionId = await response.json();
  await stripe!.redirectToCheckout({ sessionId });
};
