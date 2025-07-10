import { useEffect } from 'react';

const loadPaystackScript = () => {
  if (document.getElementById('paystack-script')) return;
  const script = document.createElement('script');
  script.id = 'paystack-script';
  script.src = 'https://js.paystack.co/v1/inline.js';
  script.async = true;
  document.body.appendChild(script);
};

export default function usePaystack() {
  useEffect(() => {
    loadPaystackScript();
  }, []);

  const payWithPaystack = ({ email, amount, reference, callback, onClose, metadata = {} }) => {
    const paystackParams = {
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(amount * 100),
      ref: reference,
      currency: 'GHS',
      metadata,
      callback: typeof callback === 'function' ? callback : () => {},
      onClose: typeof onClose === 'function' ? onClose : () => {},
    };
    if (!window.PaystackPop) {
      alert('Payment script not loaded. Please try again.');
      return;
    }
    const handler = window.PaystackPop.setup(paystackParams);
    handler.openIframe();
  };

  return payWithPaystack;
} 