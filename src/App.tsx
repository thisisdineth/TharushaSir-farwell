/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Terminal, 
  Globe, 
  Gift, 
  ChevronDown, 
  Mail,
  Key,
  Database,
  ArrowRight,
  X
} from 'lucide-react';

const Paper = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: -2 }}
    whileInView={{ opacity: 1, y: 0, rotate: className.includes('rotate') ? 1 : 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`bg-white p-8 md:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-slate-100 relative ${className}`}
  >
    <div className="absolute inset-0 paper-grain opacity-20 pointer-events-none" />
    {children}
  </motion.div>
);

export default function App() {
  const [showGift, setShowGift] = useState(false);
  const [lang, setLang] = useState<'en' | 'si'>('en');
  const giftRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    if (showGift && giftRef.current) {
      giftRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showGift]);

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-12 px-4 md:py-24 font-sans selection:bg-blue-50">
      {/* Language Toggle */}
      <div className="max-w-3xl mx-auto mb-12 flex justify-end">
        <button 
          onClick={() => setLang(lang === 'en' ? 'si' : 'en')}
          className="typewriter text-xs font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 hover:bg-white transition-colors cursor-pointer"
        >
          {t.langToggle}
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-16 md:space-y-32">
        
        {/* Intro Section - The First Paper */}
        <section>
          <Paper className="md:-rotate-1">
            <h1 className="typewriter text-3xl md:text-4xl leading-tight mb-8 font-bold">
              {t.name} 
              <span className="block text-slate-400 text-xl md:text-2xl mt-2">{t.college}</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed typewriter text-slate-600 mb-12">
              {t.intro}
            </p>
            <div className="flex justify-center text-slate-300">
              <motion.div 
                animate={{ y: [0, 5, 0] }} 
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </div>
          </Paper>
        </section>

        {/* Story Section */}
        <section className="relative">
          <Paper className="md:rotate-1">
            <div className="space-y-8">
              <h2 className="typewriter text-2xl md:text-3xl text-slate-800 font-bold underline underline-offset-8">{t.scaredTitle}</h2>
              <div className="space-y-6 text-base md:text-lg typewriter text-slate-500 leading-relaxed">
                <p>
                  {t.scaredP1}
                </p>
                <p>
                  {t.scaredP2}
                </p>
                <div className="py-4">
                  <div className="aspect-[16/10] bg-slate-50 flex items-center justify-center text-slate-300 typewriter border border-slate-100 uppercase tracking-widest text-xs">
                    <p>{t.photoLabel}</p>
                  </div>
                  <p className="text-[10px] text-center mt-2 opacity-50 typewriter italic">{t.photoSub}</p>
                </div>
                <p>
                  {t.ycsSuccess}
                </p>
              </div>
            </div>
          </Paper>
        </section>

        {/* Business & Freedom Section */}
        <section>
          <Paper className="md:-rotate-1">
            <div className="space-y-12">
              <div className="py-8 border-l-2 border-slate-200 pl-8 space-y-6">
                <p className="typewriter text-xl md:text-2xl text-slate-800 leading-tight italic">
                  {t.quote}
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 typewriter">{t.lessonTitle}</p>
              </div>
              
              <div className="space-y-6 text-base md:text-lg typewriter text-slate-500">
                <p>
                  {t.businessP1}
                </p>
                <p>
                  {t.businessP2}
                </p>
              </div>
              
              <div className="pt-8 border-t border-slate-50 flex items-center gap-4 text-slate-400">
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                <span className="typewriter text-sm font-bold uppercase tracking-widest">{t.seeYou}</span>
              </div>
            </div>
          </Paper>
        </section>

        {/* Gift Trigger Section */}
        <section className="text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowGift(!showGift)}
            className="inline-block cursor-pointer"
          >
            <div className={`sketched-border bg-white px-12 py-6 inline-flex items-center gap-4 transition-colors ${showGift ? 'bg-slate-50' : 'bg-white'}`}>
              {showGift ? <X className="w-6 h-6 text-slate-400" /> : <Gift className="w-6 h-6 text-blue-500" />}
              <span className="typewriter text-lg font-bold">{showGift ? (lang === 'en' ? 'Close Gift Box' : 'තෑග්ග වසන්න') : t.exploreGift}</span>
            </div>
            {!showGift && <p className="mt-4 handwritten text-lg text-slate-400 italic">{t.giftSource}</p>}
          </motion.div>
        </section>

        {/* Farewell/Gift Section */}
        <div ref={giftRef} className="scroll-mt-24">
          <AnimatePresence>
            {showGift && (
              <motion.section
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="space-y-12"
              >
              <Paper className="md:rotate-1">
                <div className="space-y-12">
                  <div className="text-center space-y-4">
                    <h2 className="typewriter text-3xl font-bold text-slate-800 uppercase tracking-tighter">{t.smallToken}</h2>
                    <p className="typewriter text-lg text-slate-500 leading-relaxed max-w-lg mx-auto">
                      "{t.giftMotive}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Gemini Pro Gift */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <Terminal className="w-5 h-5 text-slate-400" />
                        <h3 className="typewriter font-bold">{t.geminiTitle}</h3>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-lg space-y-4 border border-slate-100">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{t.loginEmail}</label>
                          <p className="typewriter text-sm font-bold truncate">iamyourgift@tharushaperera.com</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{t.initialAccess}</label>
                          <p className="typewriter text-sm font-bold">********</p>
                        </div>
                      </div>
                      <p className="typewriter text-base text-slate-400 leading-tight">
                        {t.geminiDesc}
                      </p>
                    </div>

                    {/* Domain Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-slate-400" />
                        <h3 className="typewriter font-bold">{t.domainTitle}</h3>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-lg space-y-4 border border-slate-100">
                        <div className="flex items-center justify-between text-xs">
                          <span className="typewriter text-slate-400">{t.registrar}</span>
                          <span className="typewriter font-bold">Namecheap</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="typewriter text-slate-400">{t.status}</span>
                          <span className="typewriter font-bold text-green-600">{t.active}</span>
                        </div>
                        <div className="pt-4 flex flex-col gap-2">
                          <button className="flex items-center justify-between group text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-black transition-colors">
                            {t.setupGuide} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                      <p className="typewriter text-base text-slate-400 leading-tight">
                        {t.domainDesc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-12 text-center border-t border-slate-50">
                    <p className="typewriter text-2xl text-slate-800 italic mb-8 underline underline-offset-4">{t.longJourney}</p>
                    <div className="space-y-1">
                      <p className="typewriter text-xs text-slate-400 flex items-center justify-center gap-2">
                        <Mail className="w-3 h-3" /> infodinethdil@gmail.com
                      </p>
                      <p className="typewriter text-2xl mt-4 font-bold">{t.yours}</p>
                      <p className="typewriter text-[10px] uppercase tracking-[0.4em] text-slate-300">Mahanama College</p>
                    </div>
                  </div>
                </div>
              </Paper>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Simple Footer */}
        <footer className="relative mt-32 py-32 overflow-hidden border-t border-slate-100">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" 
              alt="Background" 
              className="w-full h-full object-cover grayscale opacity-5"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f8] via-transparent to-[#f8f8f8]" />
          </div>
          
          <div className="relative z-10 text-center space-y-4">
            <p className="typewriter text-[10px] uppercase tracking-[0.5em] text-slate-400">
              {t.footerTribute}
            </p>
            <p className="typewriter text-[10px] text-slate-300 uppercase tracking-widest">
              2024 &bull; Designed by Dineth Dilshan &bull; Apilageai PVT LTD
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

const translations = {
  en: {
    langToggle: "සිංහලෙන් කියවන්න",
    name: "Sir, I'm Dineth,",
    college: "a student at Mahanama College Colombo.",
    intro: "I won YCS 2024 All Island 2nd Runner Up for Best Programmer because of you, sir. Everything started when you saw something in me.",
    scaredTitle: "Scared to ICT...",
    scaredP1: "When I was in Grade 10 and 11, I was really scared of ICT because sir was kind of strict...",
    scaredP2: "But Hirosh, Pamith, and Ameesha introduced me to you. We did good things together.",
    photoLabel: "Photo: Moments at Mahanama",
    photoSub: "Capture: One of our best memories together",
    ycsSuccess: "You found my talent and told me to go to YCS. I got All Island 2nd place like nothing. I even met top people at international science fair qualifications because of you!",
    quote: "“A threewheel driver has more freedom to take decisions about his business than a school teacher who does an 8-1 job.”",
    lessonTitle: "A lesson that shaped my future",
    businessP1: "The idea of Apilageai first came to my mind from you, sir. I developed it into a real-life business, and I'm earning from it now.",
    businessP2: "My dream is to graduate in ICT, start my own company, and maybe become an ICT field topper. Thank you for teaching me the freedom of decision taking.",
    seeYou: "I will come to see you whenever it is needed, sir.",
    exploreGift: "Explore gift from Dineth",
    giftSource: "Purchased with my first earnings from Apilageai PVT LTD",
    smallToken: "A Small Token",
    giftMotive: "Instead of physical gifts, these are for the mentor who inspired me with ICT.",
    geminiTitle: "Gemini Pro Account",
    loginEmail: "Login Email",
    initialAccess: "Initial Access",
    geminiDesc: "A full year of Gemini Pro. Top version for a top teacher.",
    domainTitle: "Tharushaperera.com",
    registrar: "Registrar",
    status: "Status",
    active: "Active",
    setupGuide: "Setup Guide (Blogger)",
    domainDesc: "This domain is yours, sir. For your own journey.",
    longJourney: "Hope you have a long journey with students, sir.",
    yours: "Yours,Dineth Dilshan",
    footerTribute: "A tribute to a mentor"
  },
  si: {
    langToggle: "Read in English",
    name: "සර්, මම දිනෙත්,",
    college: "කොළඹ මහානාම විද්‍යාලයේ ශිෂ්‍යයෙක්.",
    intro: "සර් නිසා තමයි මම YCS 2024 සමස්ත ලංකා හොඳම ක්‍රමලේඛක අංශයෙන් තෙවන ස්ථානය (2nd Runner Up) දිනාගත්තේ. හැමදේම පටන් ගත්තේ සර් මගේ දක්ෂතාවය හඳුනාගත්තු දවසේ ඉදලයි.",
    scaredTitle: "ICT වලට බය වුණු කාලය...",
    scaredP1: "මම 10 සහ 11 ශ්‍රේණිවල ඉද්දි ICT වලට ඇත්තටම බය වුණා මොකද සර් ටිකක් සැරයි කියලා හිතුණු නිසා...",
    scaredP2: "ඒත් හිරෝෂ්, පමිත් සහ අමීෂ මාව සර්ට හදුන්වලා දුන්නා. අපි එකතුවෙලා ගොඩක් දේවල් කළා.",
    photoLabel: "ඡායාරූපය: මහානාමයේ මතකයන්",
    photoSub: "ඡායාරූපය: අපේ හොඳම මතකයන්ගෙන් එකක්",
    ycsSuccess: "සර් මගේ හැකියාව දැකලා මට YCS යන්න කිව්වා. මම හරිම ලේසියෙන් සමස්ත ලංකා දෙවන (සමස්ත තරගාවලියෙන්) ස්ථානය ලබාගත්තා. ජාත්‍යන්තර විද්‍යා ප්‍රදර්ශන සුදුසුකම් ලැබීමේදී ලෝකයේ ඉහළම පුද්ගලයින් මුණගැහෙන්න ලැබුණෙත් සර් නිසයි!",
    quote: "“8-5 රස්සාවක් කරන කෙනෙකුට වඩා, තමන්ගේ ව්‍යාපාරය ගැන තීරණ ගන්න ත්‍රීවීල් රියදුරෙකුට නිදහස තියෙනවා.”",
    lessonTitle: "සර් මට දවසක් මේක කිව්වා මම මේ කියපු දේ ගැන ලොකු අවධානයකින් ඉන්නේ",
    businessP1: "Apilageai කල්පනාව මුලින්ම මගේ හිතට ආවේ සර් නිසයි. මම ඒක සැබෑ ව්‍යාපාරයක් දක්වා දියුණු කළා, දැන් මම ඒකෙන් ආදායමකුත් ලබනවා.",
    businessP2: "මගේ හීනය තමයි ICT පැත්තෙන් උපාධියක් අරගෙන මගේම සමාගමක් පටන් ගන්න එක. ඒ වගේම ICT ක්ෂේත්‍රයේ ප්‍රමුඛයෙක් වෙන්නත් කැමැතියි. තීරණ ගැනීමේ නිදහස ගැන මට කියා දුන්නට පින් සර්ට.",
    seeYou: "සර්ට ඕනෑම වෙලාවක මම සර්ව බලන්න එනවා.",
    exploreGift: "මගෙන් සර්ට තෑග්ගක්",
    giftSource: "Apilageai PVT LTD එකෙන් මම ලැබූ මගේ පළමු ආදායමෙන් ගත් එකක්",
    smallToken: "පුංචි සිහිවටනයක්",
    giftMotive: "ඉතින් සර්, භෞතික තෑග්ගකට වඩා ICT වලින් මාව දිරිමත් කරපු මගේ ගුරුවරයාට මේ වගේ තෑග්ගක් වටීවි කියලා මම හිතනවා.",
    geminiTitle: "Gemini Pro ගිණුම",
    loginEmail: "ඊමේල් ලිපිනය",
    initialAccess: "මුරපදය (Password)",
    geminiDesc: "Gemini Pro වසරක් සඳහා. දක්ෂ ගුරුවරයෙකුට වටිනාම මෙවලමක්.",
    domainTitle: "Tharushaperera.com",
    registrar: "රෙජිස්ට්‍රාර්",
    status: "තත්ත්වය",
    active: "සක්‍රීයයි",
    setupGuide: "සකස් කිරීමේ උපදෙස් (Blogger)",
    domainDesc: "සර්, මේ ඩොමේන් එක සර් වෙනුවෙන්මයි. සර්ගේ ගමනට මේක උදව්වක් වේවි.",
    longJourney: "සර්ගේ මේ ගමන තවත් සිසුන් රැසකට ආලෝකයක් වේවා කියලා ප්‍රාර්ථනා කරනවා.",
    yours: "මීට, දිනෙත් ",
    footerTribute: "ගුරුවරයෙකුට කරන උපහාරයක්"
  }
};

