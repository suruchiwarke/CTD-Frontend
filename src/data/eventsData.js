import { Terminal, Puzzle, Code2, Compass, Binary } from 'lucide-react';
import {
  ReverseCodeIcon,
  EnigmaIcon,
  NCCIcon,
  NTHIcon,
  DecodeRushIcon,
} from '../components/common/EventIcons';

// Single source of truth for all 5 Credenz Tech Dayz events.
// backendName -> event_name the FastAPI backend accepts (rc | ncc | enigma).
// Events without it (nth, decode-rush) have no backend registration yet.
// Used by both EventsPage (grid/cards) and EventDetailPage (full page).
//
// badgeIcon  -> small line-art badge (currently unused on the detail page;
//               kept here as a placeholder until real event logos are added)
// listIcon   -> lucide-react icon shown on the EventsPage grid card
export const eventsData = [
  {
    id: 'reverse-coding',
    backendName: 'rc',
    name: 'REVERSE CODING',
    eyebrow: 'Event 01',
    tagline: 'Deduce the hidden logic from the output alone. The problem unfolds in reverse.',
    cardDescription:
      'No source code provided. Analyze sample inputs and outputs to uncover the hidden logic and implement the matching solution.',
    category: 'technical',
    type: 'TECHNICAL',
    badgeIcon: ReverseCodeIcon,
    listIcon: Terminal,
    logo: '/assets/logos/reverse-coding.png',
    date: '07 Oct 2026',
    teamSize: '1–2 Participants',
    fee: '₹50 per team',
    prize: '₹5,000',
    isFeatured: false,
    isDuo: true,
    description: [
      'Reverse Coding is a unique programming event where participants are challenged to work backwards from the output to deduce the hidden logic of the program.',
      'The problems begin with simpler scenarios and gradually move toward complex ones, requiring participants to sharpen their debugging and reverse-engineering skills.',
      'You can participate individually or with a team mate. If you are participating with a teammate only one person needs to register and pay.',
    ],
    rules: [
      'Participants must deduce source logic purely from the given output.',
      'No internet access is permitted during the event.',
      'All decisions of the organising committee are final.',
      'Teams of 1–2 members. Only one registration is required per team.',
    ],
    contacts: [
      { name: 'Suruchi Warke', phone: '+91 94232 40874' },
      { name: 'Atharva Patel', phone: '+91 93738 71166' },
    ],
  },
  {
    id: 'enigma',
    backendName: 'enigma',
    name: 'ENIGMA',
    eyebrow: 'Event 02',
    tagline: 'Test your logic, reasoning, and analytical thinking under pressure.',
    cardDescription:
      'An aptitude-based challenge of puzzles, reasoning tasks, and quantitative problems solved under time pressure.',
    category: 'non-technical',
    type: 'NON-TECHNICAL',
    badgeIcon: EnigmaIcon,
    listIcon: Puzzle,
    logo: '/assets/logos/enigma.png',
    date: '06–07 Oct 2026',
    teamSize: '1–2 Participants',
    fee: 'FREE',
    prize: '₹2,500',
    isFeatured: false,
    isDuo: true,
    description: [
      'Enigma is an aptitude-based event designed to test logical reasoning, analytical thinking, and quantitative problem-solving skills.',
      'This competition challenges participants with puzzles, aptitude questions, and reasoning tasks that must be solved under time pressure.',
      'The event emphasizes quick decision-making and accuracy, ensuring that only the sharpest minds emerge victorious.',
      'It is the ideal platform for participants who enjoy cracking puzzles and thinking outside the box.',
      'You can participate individually or with a team mate. If you are participating with a teammate only one person needs to register.',
    ],
    rules: [
      'Participants must solve all questions within the allotted time limit.',
      'No internet access is permitted during the event.',
      'All decisions of the organising committee are final.',
      'Teams of 1–2 members. Only one registration is required per team.',
    ],
    contacts: [
      { name: 'Anushka Chitkote', phone: '+91 88304 19969' },
      { name: 'Pranjali Lad', phone: '+91 87674 82382' },
    ],
  },
  {
    id: 'ncc',
    backendName: 'ncc',
    name: 'NATIONAL COMPUTING CONTEST',
    shortName: 'NCC',
    eyebrow: 'Event 03',
    tagline: 'Test your coding skills, logical thinking, and problem-solving abilities against the clock.',
    cardDescription:
      'A competitive programming clash spanning basic algorithms to advanced data structures, in the language of your choice.',
    category: 'technical',
    type: 'TECHNICAL',
    badgeIcon: NCCIcon,
    listIcon: Code2,
    logo: '/assets/logos/ncc.png',
    date: '06 Oct 2026',
    teamSize: '1–2 Participants',
    fee: '₹50 per team',
    prize: '₹5,000',
    isFeatured: false,
    isDuo: true,
    description: [
      'The National Computing Contest is a competitive programming event designed to test coding skills, logical thinking, and problem-solving abilities.',
      'The contest presents problems of varying difficulty, ranging from basic algorithms to advanced data structures.',
      'Participants can code in any language of their choice - C++, Java, Python, C, etc.',
      'You can participate individually or with a team mate. If you are participating with a teammate only one person needs to register and pay.',
    ],
    rules: [
      'Participants may code in any language of their choice — C++, Java, Python, C, and more.',
      'No internet access is permitted during the contest.',
      'All decisions of the organising committee are final.',
      'Teams of 1–2 members. Only one registration is required per team.',
    ],
    contacts: [
      { name: 'Dhruval Porwal', phone: '+91 95612 49322' },
      { name: 'Shreyas Chavan', phone: '+91 94046 03087' },
    ],
  },
  {
    id: 'nth',
    name: 'NETWORK TREASURE HUNT',
    shortName: 'NTH',
    eyebrow: 'Event 04',
    tagline: 'Crack riddles, ciphers, and logic puzzles across levels to race up the leaderboard.',
    cardDescription:
      'An online, individual puzzle-solving hunt across levels of riddles and ciphers, ranked live on the leaderboard.',
    category: 'non-technical',
    type: 'ONLINE CRYPTIC',
    badgeIcon: NTHIcon,
    listIcon: Compass,
    logo: '/assets/logos/nth.png',
    date: '03–04 Oct 2026',
    teamSize: 'Individual',
    fee: 'FREE',
    prize: '₹5,000',
    isFeatured: false,
    description: [
      'The Network Treasure Hunt (NTH) is an online puzzle-solving competition open to individual participants.',
      'The event is structured as a series of levels, each containing riddles, ciphers, and logic-based puzzles that must be solved to unlock the next stage.',
      'As the levels progress, the puzzles become more complex, demanding sharp reasoning and lateral thinking.',
      'Real-time leaderboard updates keep the competition intense and engaging, while speed and accuracy remain the deciding factors for victory.',
      'Registration is individually.',
    ],
    rules: [
      'Each level must be solved in sequence to unlock the next stage.',
      'The leaderboard updates in real time — speed and accuracy both count.',
      'No collaboration or external assistance between participants is permitted.',
      'Registration is individual; team entries are not accepted.',
      'All decisions of the organising committee are final.',
    ],
    contacts: [
      { name: 'Sanyog Pakhale', phone: '+91 91047 06250' },
      { name: 'Vivek Amrutkar', phone: '+91 79724 91055' },
    ],
  },
  {
    id: 'decode-rush',
    name: 'DECODE RUSH',
    eyebrow: 'Event 05',
    tagline: 'Crack the clues, race across campus, uncover the treasure.',
    cardDescription:
      'A campus-wide treasure hunt of puzzles, riddles, and hidden clues — teamwork and speed decide the winners.',
    category: 'non-technical',
    type: 'TREASURE HUNT',
    badgeIcon: DecodeRushIcon,
    listIcon: Binary,
    logo: '/assets/logos/decode-rush.png',
    date: '05 Oct 2026',
    teamSize: '2–4 Members',
    fee: 'FREE',
    prize: '₹13,500+',
    isFeatured: false,
    description: [
      'Decode Rush is an exciting treasure hunt event held across the campus, designed to combine fun, adventure, and teamwork.',
      'Participants work together to crack puzzles, riddles, and hidden clues scattered throughout the campus.',
      'With each clue leading to the next location, the hunt becomes increasingly thrilling as teams race against one another.',
      'The first team to successfully decode all the clues and uncover the final treasure is declared the winner.',
      'You have to make a team of minimum 2 and maximum 4 members.',
    ],
    rules: [
      'Teams must have a minimum of 2 and a maximum of 4 members.',
      'Each clue must be solved in sequence to unlock the location of the next.',
      'Teams must remain within the designated campus boundaries at all times.',
      'The first team to decode all clues and reach the final treasure location wins.',
      'Any form of external assistance or tampering with clues is strictly prohibited.',
      'The decision of the event heads and judging panel shall be final and binding.',
    ],
    contacts: [
      { name: 'Sharva Marawar', phone: '+91 87881 22374' },
      { name: 'Isha Suryawanshi', phone: '+91 99609 38004' },
    ],
  },
];

export const getEventById = (id) => eventsData.find((e) => e.id === id);
export const getEventByBackendName = (name) => eventsData.find((e) => e.backendName === name);
