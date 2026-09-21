import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Tag, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { teamsApi } from '../api/teams';
import { cartApi } from '../api/cart';
import { useNotification } from '../context/NotificationContext';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamDetails, setTeamDetails] = useState({});
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);

  // Calculate total bill
  const totalBill = cartItems.reduce((acc, item) => {
    const feeStr = item.fee;
    if (feeStr === 'FREE') return acc;
    const feeNum = parseInt(feeStr.replace(/[^0-9]/g, ''));
    return acc + (isNaN(feeNum) ? 0 : feeNum);
  }, 0);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    const fetchTeams = async () => {
      if (!user) {
        setIsLoadingTeams(false);
        return;
      }
      setIsLoadingTeams(true);
      const details = {};
      
      for (const event of cartItems) {
        try {
          const backendEventId = (event.shortName || event.id).toLowerCase();
          
          const res = await teamsApi.getDuoTeamStatus(backendEventId, user.id);
          if (res && res.data) {
            details[event.id] = res.data;
          }
        } catch (error) {
          console.error(`Error fetching team for ${event.id}:`, error);
        }
      }
      setTeamDetails(details);
      setIsLoadingTeams(false);
    };

    fetchTeams();
  }, [cartItems, user, navigate]);

  const handleConfirmRegistration = async () => {
    if (totalBill > 0 && !transactionId.trim()) {
      showNotification('error', 'Transaction ID is required for paid events');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Add all events to backend cart
      for (const event of cartItems) {
        const backendEventId = (event.shortName || event.id).toLowerCase();

        const team = teamDetails[event.id] || {};
        const isPrimary = team.isPrimary !== false; // default true if unknown

        // Build payload matching backend EventCreate schema
        const payload = {
          event_name: backendEventId,
          person1: user?.username || 'user',
          person2: team.teammate?.fullName || null,
          person2_username: team.teammate?.username || null,
          person2_email: team.teammate?.email || null,
          team_name: team.teamName || null
        };

        try {
          await cartApi.addEventToCart(payload);
        } catch (err) {
          if (err.response?.status !== 400 || !err.response.data.detail.includes("already in your cart")) {
            throw err;
          }
        }
      }

      // 2. Checkout
      await cartApi.checkoutCart({ utr: transactionId.trim() || null });

      showNotification('success', 'Registration submitted successfully!');
      clearCart();
      navigate('/profile'); // Redirect to profile or success page
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || error.message || 'Failed to submit registration';
      showNotification('error', msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingTeams) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#11071F] selection:bg-pink-500 selection:text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-pink-600/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">
        
        {/* Banner Alert */}
        <div className="absolute top-24 right-4 sm:right-8 bg-[#fdf3e7] border border-orange-200 text-orange-900 px-6 py-3 rounded-md shadow-lg font-medium text-sm z-20">
          You will receive the Mail once we review your registration
        </div>

        {/* Outer Glassmorphic Card */}
        <div className="w-full bg-[#1e0b2b]/60 border border-pink-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_30px_rgba(244,114,182,0.1)] flex flex-col lg:flex-row gap-10 mt-8">
          
          {/* Left Column (Forms & Details) */}
          <div className="flex-1 flex flex-col">
            
            {/* Header with Back Arrow */}
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => navigate('/cart')}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Cart</span>
                <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
                  {cartItems.map(i => i.shortName || i.name).join(', ')}
                </h1>
              </div>
            </div>

            {/* Event Summary List */}
            <div className="space-y-4">
              {cartItems.map((event) => {
                const team = teamDetails[event.id];
                const teamSize = team?.teammate ? 2 : 1;
                
                return (
                  <div key={event.id} className="space-y-4">
                    {/* Team Size */}
                    <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-400" />
                        <span className="text-gray-300 font-medium">Team Size</span>
                      </div>
                      <span className="text-white font-bold">{teamSize}</span>
                    </div>

                    {/* Event & Price */}
                    <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-purple-400" />
                        <span className="text-gray-300 font-medium">Event</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white font-medium">{event.shortName || event.name}</span>
                        <span className="text-white font-bold">{event.fee !== "FREE" && !event.fee.includes('₹') ? '₹' : ''}{event.fee.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Team Name */}
                    {teamSize > 1 && team?.teamName && (
                      <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-purple-400" />
                          <span className="text-gray-300 font-medium">Team Name</span>
                        </div>
                        <span className="text-white font-medium">{team.teamName}</span>
                      </div>
                    )}

                    {/* Teammate Usernames */}
                    {teamSize > 1 && (
                      <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-purple-400" />
                          <span className="text-gray-300 font-medium">Teammate Usernames</span>
                        </div>
                        <ul className="text-white text-sm text-right">
                          <li>• {user?.username}</li>
                          <li>• {team?.teammate?.username}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Transaction ID */}
              {totalBill > 0 && (
                <div className="flex items-center justify-between bg-black/40 border border-pink-500/30 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-3 min-w-max">
                    <FileText className="w-5 h-5 text-pink-400" />
                    <span className="text-gray-300 font-medium">Transaction ID</span>
                  </div>
                  <input 
                    type="text" 
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Enter transaction id"
                    className="bg-transparent text-white text-right outline-none w-full ml-4 placeholder:text-gray-500"
                  />
                </div>
              )}
            </div>

            {/* Confirm Button */}
            <button 
              onClick={handleConfirmRegistration}
              disabled={isSubmitting}
              className="mt-8 w-full py-4 bg-gradient-to-r from-pink-500 via-pink-400 to-[#ffe6a7] rounded-xl font-bold text-gray-900 tracking-wider hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(244,114,182,0.4)] disabled:opacity-50"
            >
              {isSubmitting ? 'PROCESSING...' : 'CONFIRM REGISTRATION'}
            </button>
          </div>

          {/* Right Column (Scan & Pay) */}
          {totalBill > 0 && (
            <div className="w-full lg:w-[350px] bg-black/60 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-pink-300 mb-2">Scan & Pay</h2>
              <p className="text-gray-400 text-sm mb-6">
                Pay ₹{totalBill} to confirm your registration
              </p>
              
              <div className="bg-white p-4 rounded-2xl mb-6">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=pictieee@ybl&pn=PICT+IEEE+Student+Branch&am=50&cu=INR" 
                  alt="UPI QR Code" 
                  className="w-48 h-48 object-contain"
                />
              </div>

              <p className="text-gray-500 text-xs">
                Scan this QR code using any UPI app
              </p>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};
