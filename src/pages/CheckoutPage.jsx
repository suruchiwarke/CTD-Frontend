import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Hash, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { getEventByBackendName } from '../data/eventsData';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

// Placeholder image - swap this file (or path) for the organiser's real payment QR.
const PAYMENT_QR_SRC = '/assets/payment/payment-qr-placeholder.svg';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, bill, isLoading, checkout } = useCart();
  const { showError, showSuccess } = useNotification();

  const [utr, setUtr] = useState('');
  const [utrError, setUtrError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isEmpty = !cartItems || cartItems.length === 0;
  const needsPayment = bill > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const trimmed = utr.trim();
    if (needsPayment && !trimmed) {
      const msg = 'Please enter your transaction ID to confirm registration.';
      setUtrError(msg);
      showError(msg);
      return;
    }

    setSubmitting(true);
    try {
      const res = await checkout(trimmed);
      showSuccess(res.message || 'Your request has been received.');
      // replace so browser-back doesn't land on a checkout page with an emptied cart
      navigate('/profile', { replace: true });
    } catch (err) {
      showError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black selection:bg-pink-500 selection:text-white">
      {/* Cosmic Blurred Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/assets/backgrounds/blurred-background.png')` }}
      />

      {/* Ambient background glow spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-[#12071f]/65 border border-pink-500/40 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(244,114,182,0.15)] flex flex-col">
          {/* Back to cart */}
          <button
            type="button"
            onClick={() => navigate('/cart')}
            disabled={submitting}
            className="self-start inline-flex items-center gap-2 mb-6 font-aldrich text-xs uppercase tracking-widest text-purple-300/80 hover:text-white transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to cart
          </button>

          {/* Header: Icon Badge + Heading */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-900/40 border border-pink-400/40 backdrop-blur-md flex items-center justify-center text-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.25)] flex-shrink-0">
              <CreditCard className="w-6 h-6 text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-tungsten text-3xl sm:text-4xl tracking-wider text-white uppercase font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                CHECKOUT
              </h1>
              <div className="w-10 h-[2.5px] bg-pink-400/90 rounded-full mt-1 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
            </div>
          </div>
          <p className="font-aldrich text-sm text-purple-200/70 mt-3 tracking-wide">
            Review your order, complete the payment and confirm your registration.
          </p>

          {isEmpty && (isLoading || submitting) ? (
            <div className="py-16 text-center">
              <p className="text-sm text-purple-200/70 font-aldrich tracking-wide">Loading your cart...</p>
            </div>
          ) : isEmpty ? (
            <div className="flex flex-col items-center text-center py-14">
              <ShoppingCart className="w-12 h-12 text-pink-400 drop-shadow-[0_0_12px_rgba(244,114,182,0.6)] mb-4" />
              <h2 className="text-xl font-bold text-white tracking-wide font-aldrich">Your cart is empty</h2>
              <p className="text-sm text-purple-200/70 font-aldrich mt-2 tracking-wide">
                Add events to your cart before checking out.
              </p>
              <Button type="button" className="mt-6 font-aldrich tracking-widest" onClick={() => navigate('/cart')}>
                BACK TO CART
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order summary */}
              <section aria-labelledby="order-summary" className="flex flex-col min-w-0">
                <h2 id="order-summary" className="font-tungsten text-2xl tracking-wider text-white uppercase font-bold">
                  ORDER SUMMARY
                </h2>
                <div className="mt-4 space-y-3">
                  {cartItems.map((item) => {
                    const meta = getEventByBackendName(item.event_name);
                    const members = [item.person1, item.person2].filter(Boolean);
                    return (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-3 rounded-2xl border border-purple-500/30 bg-purple-950/40 p-4"
                      >
                        <div className="min-w-0">
                          <h3 className="font-tungsten text-xl tracking-wider text-white uppercase font-bold break-words">
                            {meta?.name || item.event_name.toUpperCase()}
                          </h3>
                          {item.team_name && (
                            <p className="font-aldrich text-xs text-purple-200/70 mt-1 break-words">
                              Team {item.team_name}
                            </p>
                          )}
                          {item.person2 && (
                            <p className="font-aldrich text-xs text-purple-200/70 mt-1 break-words">
                              Members: {members.join(', ')}
                            </p>
                          )}
                        </div>
                        <span className="font-aldrich text-sm font-bold text-pink-300 flex-shrink-0">
                          {item.price > 0 ? `₹${item.price}` : 'FREE'}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-purple-800/40 font-aldrich">
                  <span className="text-xs uppercase tracking-widest text-purple-300/70">Total</span>
                  <span className="text-xl font-bold text-white">{needsPayment ? `₹${bill}` : 'FREE'}</span>
                </div>
              </section>

              {/* Payment */}
              <section aria-labelledby="scan-and-pay" className="flex flex-col items-center gap-5 min-w-0">
                <h2 id="scan-and-pay" className="font-tungsten text-2xl tracking-wider text-white uppercase font-bold self-start">
                  SCAN &amp; PAY
                </h2>

                {needsPayment ? (
                  <>
                    <img
                      src={PAYMENT_QR_SRC}
                      alt="Payment QR code"
                      className="w-full max-w-[240px] aspect-square rounded-2xl bg-white p-2 shadow-[0_0_25px_rgba(244,114,182,0.25)]"
                    />
                    <p className="font-aldrich text-sm text-purple-200/80 tracking-wide">
                      Amount to pay: <span className="font-bold text-pink-300">₹{bill}</span>
                    </p>
                    <Input
                      name="utr"
                      placeholder="Enter transaction ID"
                      aria-label="Transaction ID"
                      value={utr}
                      onChange={(e) => {
                        setUtr(e.target.value);
                        if (utrError) setUtrError('');
                      }}
                      error={utrError}
                      disabled={submitting}
                      icon={<Hash className="w-4 h-4" />}
                    />
                  </>
                ) : (
                  <p className="font-aldrich text-sm text-purple-200/80 tracking-wide self-start">
                    No payment is required for the events in your cart.
                  </p>
                )}

                <Button type="submit" isLoading={submitting} className="w-full font-aldrich tracking-widest mt-auto">
                  CONFIRM REGISTRATION
                </Button>
              </section>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};
