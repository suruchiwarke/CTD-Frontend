import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Users, UserCheck, ShoppingCart, AlertCircle } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { teamsApi } from '../../api/teams.js';
import { useNotification } from '../../context/NotificationContext';

export const DuoRegistrationModal = ({
  isOpen,
  onClose,
  event,
  user,
  initialStep = 'PROMPT',
  onRegistrationComplete,
}) => {
  const navigate = useNavigate();
  const { showSuccess } = useNotification();

  const getGroup = (c) => {
    const s = String(c || '').toLowerCase().trim();
    if (
      s === 'te' ||
      s === 'be' ||
      s === 'senior' ||
      s.includes('third') ||
      s.includes('final') ||
      s === 'te/be'
    ) {
      return 'Senior';
    }
    return 'Junior';
  };

  const primaryGroup = getGroup(user?.category);

  // Steps: 'PROMPT' | 'ADD_TEAMMATE' | 'CHECKOUT_PROMPT'
  const [step, setStep] = useState(initialStep);
  const [teamName, setTeamName] = useState('');
  const [teammateIdentifier, setTeammateIdentifier] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep || 'PROMPT');
      setError('');
    }
  }, [isOpen, initialStep]);

  if (!isOpen || !event) return null;

  const handleClose = () => {
    setStep(initialStep || 'PROMPT');
    setError('');
    setTeamName('');
    setTeammateIdentifier('');
    onClose();
  };

  const handlePromptYes = () => {
    setError('');
    setStep('ADD_TEAMMATE');
  };

  const handlePromptNo = () => {
    if (onRegistrationComplete) onRegistrationComplete(null);
    showSuccess(`Registered for ${event.name} as a solo participant!`);
    setStep('CHECKOUT_PROMPT');
  };

  const handleAddTeammateSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const query = teammateIdentifier.trim();
    if (!query) {
      setError('Please enter your teammate username, PRN, or email.');
      return;
    }

    setIsLoading(true);
    try {
      // Use user.id if available, else fall back to username or email
      const primaryId = user?.id || user?.username || user?.email || 'usr_guest';

      const response = await teamsApi.addTeammate({
        eventId: event.id,
        primaryUserId: primaryId,
        teammateIdentifier: query,
        teamName: teamName.trim(),
      });

      if (response && response.success) {
        const addedTeammate = response.data.teammate;
        if (onRegistrationComplete) onRegistrationComplete(addedTeammate);
        showSuccess(response.message || `Teammate added successfully!`);
        setStep('CHECKOUT_PROMPT');
      }
    } catch (err) {
      setError(err.message || 'Failed to add teammate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = () => {
    handleClose();
    navigate('/cart');
  };

  const handleBrowseEvents = () => {
    handleClose();
    navigate('/events');
  };

  // Shared glowing icon badge matching user mockups
  const IconBadge = ({ icon: Icon }) => (
    <div className="w-16 h-16 rounded-full bg-purple-950/70 border border-purple-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.35)] mb-5">
      <Icon className="w-8 h-8 text-purple-200 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
    </div>
  );

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-[420px] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
        style={{
          background: 'rgba(26, 11, 38, 0.94)',
          backdropFilter: 'blur(25px)',
          border: '1.5px solid rgba(168, 85, 247, 0.40)',
          boxShadow: '0 0 40px rgba(168, 85, 247, 0.28), inset 0 0 22px rgba(192, 132, 252, 0.10)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors p-1 rounded-full hover:bg-purple-950/60"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── STEP 1: "Do you want to add teammate ?" ── */}
        {step === 'PROMPT' && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-200">
            <IconBadge icon={Users} />
            <h3 className="font-aldrich text-lg sm:text-xl text-white font-medium tracking-wide mb-8">
              Do you want to add teammate ?
            </h3>
            <div className="grid grid-cols-2 gap-3.5 w-full">
              <Button type="button" variant="primary" onClick={handlePromptYes} className="w-full font-aldrich tracking-widest">
                YES
              </Button>
              <Button type="button" variant="primary" onClick={handlePromptNo} className="w-full font-aldrich tracking-widest">
                NO
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 2: "Add Your Team Details" ── */}
        {step === 'ADD_TEAMMATE' && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-200">
            <IconBadge icon={Users} />
            <h3 className="font-aldrich text-lg sm:text-xl text-white font-semibold tracking-wide mb-1">
              Add Your Team Details
            </h3>
            <p className="font-aldrich text-[11px] text-purple-200/70 uppercase tracking-wider mb-4">
              Category:{' '}
              <span className="text-pink-300 font-bold">{user?.category || 'Junior'}</span>
            </p>

            {error && (
              <div className="w-full mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs font-aldrich flex items-center gap-2.5 text-left animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleAddTeammateSubmit} className="w-full space-y-3.5">
              <Input
                name="teamName"
                placeholder="Team name (optional)"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                icon={<Users className="w-4 h-4" />}
              />
              <Input
                name="teammate"
                placeholder="Teammate username, PRN or email"
                value={teammateIdentifier}
                onChange={(e) => {
                  setTeammateIdentifier(e.target.value);
                  if (error) setError('');
                }}
                icon={<UserCheck className="w-4 h-4" />}
                autoFocus
              />
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setStep('PROMPT')}
                  className="w-full font-aldrich tracking-widest"
                >
                  BACK
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full font-aldrich tracking-widest"
                >
                  ADD TO CART
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ── STEP 3: "Do you want to ?" (Checkout prompt) ── */}
        {step === 'CHECKOUT_PROMPT' && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-200">
            <IconBadge icon={ShoppingCart} />
            <h3 className="font-aldrich text-lg sm:text-xl text-white font-medium tracking-wide mb-8">
              Do you want to ?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              <Button
                type="button"
                variant="primary"
                onClick={handleCheckout}
                className="w-full font-aldrich tracking-widest"
              >
                CHECKOUT
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleBrowseEvents}
                className="w-full font-aldrich tracking-widest text-[11px] sm:text-xs"
              >
                BROWSE THROUGH EVENTS
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
