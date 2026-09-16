import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Award,
  Zap,
  Code2,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight,
  Flame,
  Binary,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const DecodeRushPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { showSuccess } = useNotification();
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: '/events/decode-rush' } });
      return;
    }
    setIsRegistered(true);
    showSuccess('Successfully registered for Decode Rush 2026!');
  };

  const rounds = [
    {
      round: 'ROUND 01',
      title: 'Logic Maze & Cipher Decryption',
      duration: '45 Minutes',
      type: 'Online / Offline Screening',
      desc: 'Participants will encounter cryptic logic puzzles, pseudo-code analysis, number pattern ciphers, and algorithmic brainteasers designed to test pure deductive speed and analytical aptitude.',
      topics: ['Cryptic Ciphers', 'Bitwise Riddles', 'Code Output Prediction', 'Mathematical Logic'],
    },
    {
      round: 'ROUND 02',
      title: 'The Speed Debug & Algorithmic Arena',
      duration: '90 Minutes',
      type: 'Competitive Coding & Debugging',
      desc: 'Shortlisted contenders advance to the high-stakes code arena. Fix broken algorithmic code under tight time constraints, uncover edge-case bugs, and write optimized solution patches in C++, Java, or Python.',
      topics: ['Bug Fixing Sprints', 'Time/Space Complexity Fixes', 'Edge-Case Patches', 'Speed Implementation'],
    },
  ];

  const rules = [
    'Participants can compete individually or in teams of up to 2 members.',
    'Languages permitted for coding rounds: C, C++, Java, and Python.',
    'Use of external AI assistants, communication tools, or unauthorized tabs is strictly prohibited.',
    'Plagiarism or code sharing between competing teams will result in immediate disqualification.',
    'In case of score ties, time taken to submit correct solutions will determine the leaderboard ranking.',
    'The decision of the event heads and judging panel shall be final and binding.',
  ];

  const prizes = [
    {
      rank: '1ST PRIZE',
      amount: '? 7,000',
      perks: 'Winner Trophy + Certificate of Excellence + Exclusive Goodies',
      glow: 'from-amber-400/20 to-amber-600/10 border-amber-400/40 text-amber-300',
      badge: 'bg-amber-400/20 text-amber-300 border-amber-400/50',
    },
    {
      rank: '2ND PRIZE',
      amount: '? 4,000',
      perks: 'Runner Up Trophy + Certificate of Excellence',
      glow: 'from-purple-400/20 to-purple-600/10 border-purple-400/40 text-purple-200',
      badge: 'bg-purple-400/20 text-purple-200 border-purple-400/50',
    },
    {
      rank: '3RD PRIZE',
      amount: '? 2,500',
      perks: 'Bronze Trophy + Certificate of Merit',
      glow: 'from-pink-400/20 to-pink-600/10 border-pink-400/40 text-pink-200',
      badge: 'bg-pink-400/20 text-pink-200 border-pink-400/50',
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-black text-white selection:bg-purple-600 selection:text-white">
      {/* Blurred Celestial Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/assets/backgrounds/blurred-background.png')`,
        }}
      />

      {/* Ambient gradient glow overlays */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-[400px] h-[300px] bg-pink-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 flex flex-col items-center">
        
        {/* Navigation Breadcrumb / Back Link */}
        <div className="w-full flex items-center justify-between mb-6">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/30 bg-[#190a2b]/60 backdrop-blur-md text-purple-200 hover:text-white hover:border-purple-300 hover:bg-purple-900/40 transition-all text-xs font-semibold uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Events</span>
          </Link>

          {/* Live Event Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/40 bg-pink-950/40 text-pink-300 text-xs font-aldrich tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span>Registration Open</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="w-full text-center flex flex-col items-center mb-10 sm:mb-12">
          {/* Event Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/40 bg-purple-950/50 backdrop-blur-md text-purple-200 font-aldrich text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Binary className="w-4 h-4 text-[#f472b6]" />
            <span>TECHNICAL FLAGSHIP EVENT</span>
          </div>

          {/* Main Title: DECODE RUSH */}
          <h1 className="font-tungsten text-6xl sm:text-8xl md:text-9xl tracking-tight text-gradient-ctd leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            DECODE RUSH
          </h1>

          {/* Subtitle */}
          <p className="font-aldrich text-sm sm:text-lg md:text-xl font-normal tracking-[0.3em] sm:tracking-[0.45em] text-purple-200/90 uppercase mt-2">
            Unravel The Mystery • Patch The Code • Conquer The Arena
          </p>

          {/* Glowing Pink Divider */}
          <div className="w-20 sm:w-28 h-[2px] bg-gradient-to-r from-transparent via-[#f472b6] to-transparent shadow-[0_0_10px_#f472b6,0_0_20px_rgba(244,114,182,0.8)] rounded-full my-4" />

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mt-2">
            <div className="glass-card p-3 sm:p-4 text-center rounded-xl">
              <Calendar className="w-5 h-5 mx-auto text-[#f472b6] mb-1" />
              <p className="text-[10px] text-purple-300/70 font-aldrich uppercase tracking-wider">Date</p>
              <p className="text-xs sm:text-sm font-bold text-white tracking-wide">6 OCT 2026</p>
            </div>

            <div className="glass-card p-3 sm:p-4 text-center rounded-xl">
              <Clock className="w-5 h-5 mx-auto text-purple-300 mb-1" />
              <p className="text-[10px] text-purple-300/70 font-aldrich uppercase tracking-wider">Time</p>
              <p className="text-xs sm:text-sm font-bold text-white tracking-wide">10:00 AM - 1:00 PM</p>
            </div>

            <div className="glass-card p-3 sm:p-4 text-center rounded-xl">
              <Users className="w-5 h-5 mx-auto text-[#f472b6] mb-1" />
              <p className="text-[10px] text-purple-300/70 font-aldrich uppercase tracking-wider">Team Size</p>
              <p className="text-xs sm:text-sm font-bold text-white tracking-wide">1 - 2 Members</p>
            </div>

            <div className="glass-card p-3 sm:p-4 text-center rounded-xl">
              <Trophy className="w-5 h-5 mx-auto text-amber-300 mb-1" />
              <p className="text-[10px] text-purple-300/70 font-aldrich uppercase tracking-wider">Prize Pool</p>
              <p className="text-xs sm:text-sm font-bold text-white tracking-wide">? 13,500+</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 border-b border-purple-800/40 w-full max-w-4xl pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'rounds', label: 'Rounds & Format' },
            { id: 'rules', label: 'Rules & Criteria' },
            { id: 'prizes', label: 'Prize Pool' },
            { id: 'contact', label: 'Contact' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-2 rounded-full font-aldrich text-xs sm:text-sm tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white font-bold shadow-[0_0_15px_rgba(244,114,182,0.4)] border border-pink-400/50'
                  : 'text-purple-300/70 hover:text-white hover:bg-purple-950/40 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content 1: Overview */}
        {activeTab === 'overview' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-200">
            {/* Main Overview Card */}
            <div
              className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
              style={{
                background: 'rgba(28, 12, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(220, 150, 255, 0.3)',
                boxShadow: '0 15px 40px rgba(10, 2, 20, 0.7)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-purple-900/50 border border-purple-400/40 text-[#f472b6]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-aldrich text-lg sm:text-xl font-bold tracking-wider text-white uppercase">
                  About Decode Rush
                </h3>
              </div>

              <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-light mb-6">
                <strong>Decode Rush</strong> is the quintessential speed-programming and analytical riddle gauntlet of Credenz Tech Dayz. Designed to simulate high-pressure software engineering and debugging situations, this challenge evaluates not just your coding prowess, but your ability to parse obfuscated logic, spot subtle runtime flaws, and translate abstract riddles into blazing-fast algorithms.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#170828]/70 border border-purple-500/20 flex flex-col gap-1.5">
                  <Flame className="w-5 h-5 text-orange-400 mb-1" />
                  <h4 className="font-bold text-sm text-white font-aldrich">Adrenaline Rush</h4>
                  <p className="text-xs text-purple-200/75 leading-relaxed">
                    Time-bound rounds where every single second counts toward your final position.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#170828]/70 border border-purple-500/20 flex flex-col gap-1.5">
                  <Code2 className="w-5 h-5 text-[#f472b6] mb-1" />
                  <h4 className="font-bold text-sm text-white font-aldrich">Real Debugging</h4>
                  <p className="text-xs text-purple-200/75 leading-relaxed">
                    Tackle actual erroneous code snippets and reconstruct faulty logic structures.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#170828]/70 border border-purple-500/20 flex flex-col gap-1.5">
                  <Award className="w-5 h-5 text-amber-400 mb-1" />
                  <h4 className="font-bold text-sm text-white font-aldrich">PICT Honors</h4>
                  <p className="text-xs text-purple-200/75 leading-relaxed">
                    Compete against PICT's top talent and claim prestigious certificates & prizes.
                  </p>
                </div>
              </div>
            </div>

            {/* Registration CTA Card */}
            <div className="glass-card-glow p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-1">
                <h3 className="font-aldrich text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                  Ready to test your decoding limits?
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80">
                  {isAuthenticated
                    ? `Logged in as ${user?.fullName || user?.username}. Click below to confirm registration.`
                    : 'Sign in to register and secure your spot on the live contest leaderboard.'}
                </p>
              </div>

              <Button
                size="lg"
                onClick={handleRegister}
                disabled={isRegistered}
                withArrow={!isRegistered}
                className="w-full sm:w-auto flex-shrink-0"
              >
                {isRegistered ? '? REGISTRATION CONFIRMED' : 'REGISTER NOW'}
              </Button>
            </div>
          </div>
        )}

        {/* Tab Content 2: Rounds & Format */}
        {activeTab === 'rounds' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-200">
            {rounds.map((item, idx) => (
              <div
                key={item.round}
                className="rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:border-purple-400/60"
                style={{
                  background: 'rgba(28, 12, 42, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1.5px solid rgba(220, 150, 255, 0.3)',
                  boxShadow: '0 15px 40px rgba(10, 2, 20, 0.7)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#9333ea]/30 border border-[#c084fc]/50 text-[#fed7aa] font-aldrich text-xs font-bold tracking-widest">
                      {item.round}
                    </span>
                    <h3 className="font-aldrich text-lg sm:text-xl font-bold text-white uppercase">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-aldrich text-purple-300/80">
                    <Clock className="w-3.5 h-3.5 text-[#f472b6]" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed mb-5 font-light">
                  {item.desc}
                </p>

                <div>
                  <p className="text-[11px] uppercase tracking-widest font-aldrich text-purple-300/70 mb-2">
                    Key Focus Areas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.topics.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg bg-purple-950/70 border border-purple-500/30 text-xs text-purple-200 tracking-wide font-medium"
                      >
                        • {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Rules & Criteria */}
        {activeTab === 'rules' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-200">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: 'rgba(28, 12, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(220, 150, 255, 0.3)',
                boxShadow: '0 15px 40px rgba(10, 2, 20, 0.7)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-purple-900/50 border border-purple-400/40 text-[#f472b6]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-aldrich text-lg sm:text-xl font-bold tracking-wider text-white uppercase">
                  Rules & Guidelines
                </h3>
              </div>

              <div className="space-y-4">
                {rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1a092c]/60 border border-purple-500/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#f472b6] flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-light">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Prize Pool */}
        {activeTab === 'prizes' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {prizes.map((p) => (
                <div
                  key={p.rank}
                  className={`rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-between border bg-gradient-to-b backdrop-blur-xl shadow-2xl transition-transform hover:-translate-y-1 duration-300 ${p.glow}`}
                >
                  <div className="space-y-3 w-full">
                    <span
                      className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold font-aldrich tracking-widest uppercase border ${p.badge}`}
                    >
                      {p.rank}
                    </span>
                    <h4 className="font-tungsten text-5xl sm:text-6xl text-white tracking-wide">
                      {p.amount}
                    </h4>
                  </div>

                  <div className="w-full pt-6 mt-6 border-t border-white/10">
                    <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed font-light">
                      {p.perks}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 5: Contact */}
        {activeTab === 'contact' && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-200">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: 'rgba(28, 12, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(220, 150, 255, 0.3)',
                boxShadow: '0 15px 40px rgba(10, 2, 20, 0.7)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-purple-900/50 border border-purple-400/40 text-[#f472b6]">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-aldrich text-lg sm:text-xl font-bold tracking-wider text-white uppercase">
                  Event Coordinators
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#170828]/70 border border-purple-500/30 flex flex-col space-y-1">
                  <p className="text-[11px] font-aldrich text-purple-300/70 uppercase tracking-widest">Lead Coordinator</p>
                  <p className="text-base font-bold text-white">Event Head</p>
                  <p className="text-xs text-purple-200/90 font-mono pt-1">+91 98765 43210</p>
                  <p className="text-xs text-purple-300/70">decoderush.ctd@pictieee.in</p>
                </div>

                <div className="p-5 rounded-xl bg-[#170828]/70 border border-purple-500/30 flex flex-col space-y-1">
                  <p className="text-[11px] font-aldrich text-purple-300/70 uppercase tracking-widest">Co-Lead Coordinator</p>
                  <p className="text-base font-bold text-white">Technical Coordinator</p>
                  <p className="text-xs text-purple-200/90 font-mono pt-1">+91 91234 56789</p>
                  <p className="text-xs text-purple-300/70">support@pictieee.in</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default DecodeRushPage;
