import React from 'react';
import { ShoppingCart, Trash2, Users } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const isEmpty = !cartItems || cartItems.length === 0;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black selection:bg-pink-500 selection:text-white">
      {/* Cosmic Blurred Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/assets/backgrounds/blurred-background.png')`,
        }}
      />

      {/* Ambient background glow spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 flex items-center justify-center">
        {/* Glassmorphic Cart Card */}
        <div className="w-full max-w-2xl sm:max-w-3xl bg-[#12071f]/65 border border-pink-500/40 rounded-3xl p-6 sm:p-10 md:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(244,114,182,0.15)] flex flex-col min-h-[380px] sm:min-h-[440px] transition-all duration-300">
          
          {/* Card Header: Icon Badge + Heading */}
          <div className="flex items-center gap-4">
            {/* Glass Icon Box */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-900/40 border border-pink-400/40 backdrop-blur-md flex items-center justify-center text-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.25)] flex-shrink-0">
              <ShoppingCart className="w-6 h-6 text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]" />
            </div>

            {/* Title with pink underline */}
            <div className="flex flex-col">
              <h1 className="font-tungsten text-3xl sm:text-4xl tracking-wider text-white uppercase font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                EVENTS IN CART
              </h1>
              <div className="w-10 h-[2.5px] bg-pink-400/90 rounded-full mt-1 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
            </div>
          </div>

          {/* Empty Cart State */}
          {isEmpty ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10 sm:py-14 my-auto">
              
              {/* Glowing Empty Cart Illustration with Light Rays */}
              <div className="relative flex items-center justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
                <svg
                  className="w-24 h-24 sm:w-28 sm:h-28 text-pink-400 drop-shadow-[0_0_20px_rgba(244,114,182,0.7)]"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Radiating Light Rays / Sparks */}
                  <line x1="38" y1="26" x2="31" y2="16" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="50" y1="22" x2="50" y2="10" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="62" y1="26" x2="69" y2="16" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Shopping Cart Wireframe Outline */}
                  <path
                    d="M22 36H29L37 64H69L76 44H32"
                    stroke="#f472b6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Wheels */}
                  <circle cx="41" cy="74" r="3.5" stroke="#f472b6" strokeWidth="3" />
                  <circle cx="65" cy="74" r="3.5" stroke="#f472b6" strokeWidth="3" />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide font-aldrich drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Your cart is empty
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-purple-200/70 font-aldrich mt-2 max-w-sm tracking-wide">
                Looks like you haven't added any events yet.
              </p>
            </div>
          ) : (
            /* Populated cart list if events are present */
            <div className="flex-1 py-8 space-y-5">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between bg-[#2a133d]/40 border border-pink-500/30 rounded-2xl p-4 backdrop-blur-md hover:bg-[#2a133d]/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon Box */}
                    <div className="w-12 h-12 rounded-xl bg-[#3f1954]/50 border border-pink-400/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-pink-100" />
                    </div>
                    {/* Event Name & Subtext */}
                    <div className="flex flex-col">
                      <h3 className="text-white font-bold tracking-wide uppercase">
                        {item.shortName || item.name}
                      </h3>
                      <p className="text-xs text-pink-200/60 mt-0.5">
                        PICT IEEE Student Branch
                      </p>
                    </div>
                  </div>

                  {/* Price & Delete Button */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-xl sm:text-2xl font-bold text-pink-200">
                      {item.fee !== "FREE" && !item.fee.includes('₹') ? '₹' : ''}{item.fee.split(' ')[0]}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center hover:bg-pink-500/30 hover:border-pink-500/50 transition-all text-pink-300 group"
                    >
                      <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Checkout Button */}
              <div className="pt-6 mt-4 border-t border-pink-500/20 flex justify-end">
                <button
                  onClick={() => navigate('/checkout')}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold text-white tracking-wide hover:from-pink-400 hover:to-purple-400 shadow-[0_0_15px_rgba(244,114,182,0.4)] transition-all hover:scale-105"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
