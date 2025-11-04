export type Lang = "en" | "hi" | "as";


export const translations = {
  en: {
    title: "District Insights",
    byDistrict: "Search by District",
    byLocation: "Search with My Location",
    placeholder: "Enter district name...",
    listening: "Listening...",
    listenSummary: " Listen Summary",
  },
  hi: {
    title: "ज़िला इनसाइट्स",
    byDistrict: "ज़िले द्वारा खोजें",
    byLocation: "मेरे स्थान से खोजें",
    placeholder: "ज़िले का नाम दर्ज करें...",
    listening: "सुन रहे हैं...",
    listenSummary: " सारांश सुनें",
  },
  as: {
    title: "জিলা ইনসাইটছ",
    byDistrict: "জিলা অনুসৰি অনুসন্ধান কৰক",
    byLocation: "মোৰ অৱস্থানৰ সৈতে অনুসন্ধান কৰক",
    placeholder: "জিলাৰ নাম লিখক...",
    listening: "শুনিছে...",
    listenSummary: " সারসংক্ষেপ শুনক",
  },
};






export const ui = {
  en: {
    title: "District Insights",
    byDistrict: "Search by District",
    byLocation: "Search with My Location",
    placeholder: "Enter district name...",
       useLocation: "Use My Location",
    listenSummary: "🎧 Listen Summary",
    fetchingLocation: "Fetching location...",
    noDistrict: "No district selected",
    viewInsights: "View Insights",
  },
  hi: {
    title: "ज़िला इनसाइट्स",
    byDistrict: "ज़िले द्वारा खोजें",
    byLocation: "मेरे स्थान से खोजें",
     useLocation: "मेरा स्थान उपयोग करें",
    placeholder: "ज़िले का नाम दर्ज करें...",
    listenSummary: "🎧 सारांश सुनें",
    fetchingLocation: "स्थान प्राप्त किया जा रहा है...",
    noDistrict: "कोई जिला चयनित नहीं है",
    viewInsights: "इन्साइट्स देखें",
  },
  as: {
    title: "জিলা ইনসাইটছ",
    byDistrict: "জিলা অনুসৰি অনুসন্ধান কৰক",
    byLocation: "মোৰ অৱস্থানৰ সৈতে অনুসন্ধান কৰক",
    placeholder: "জিলাৰ নাম লিখক...",
       useLocation: "মোৰ অৱস্থান ব্যৱহাৰ কৰক",
    listenSummary: "🎧 সারসংক্ষেপ শুনক",
    fetchingLocation: "অৱস্থান বিচাৰি আছে...",
    noDistrict: "কোনো জিলা নিৰ্বাচিত নহয়",
    viewInsights: "ইনচাইটচ চাওক",
  },
};

// metric labels and voice-friendly phrases
export const metrics = {
  en: {
    employmentRate: "Employment Rate",
    fundsAllocated: "Funds Allocated (Cr)",
    fundsUtilized: "Funds Utilized (Cr)",
    households: "Households Engaged",
    workers: "Workers",
    persondaysGenerated: "Person-days Generated",
    avgDaysPerHH: "Avg Days per HH",
    womenParticipation: "Women Participation",
    scParticipation: "SC Participation",
    stParticipation: "ST Participation",
  },
  hi: {
    employmentRate: "रोजगार दर",
    fundsAllocated: "आवंटित निधि (करोड़)",
    fundsUtilized: "उपयोगित निधि (करोड़)",
    households: "रुचि परिवार",
    workers: "श्रमिक",
    persondaysGenerated: "व्यक्ति-दिवस",
    avgDaysPerHH: "प्रति परिवार औसत दिन",
    womenParticipation: "महिला भागीदारी",
    scParticipation: "अनु. जाति भागीदारी",
    stParticipation: "अनु. जनजाति भागीदारी",
  },
  as: {
    employmentRate: "নিযুক্তিৰ হাৰ",
    fundsAllocated: "অলকৃত তহবিল (কোটি)",
    fundsUtilized: "ব্যৱহৃত তহবিল (কোটি)",
    households: "সংলগ্ন পৰিয়াল",
    workers: "কর্মী",
    persondaysGenerated: "জন-দিন সৃষ্টি",
    avgDaysPerHH: "প্রতি ঘৰৰ গড় দিন",
    womenParticipation: "মহিলা অংশগ্ৰহণ",
    scParticipation: "SC অংশগ্ৰহণ",
    stParticipation: "ST অংশগ্ৰহণ",
  },
};



export const voiceTemplates = {
  en: (d: any) =>
    `${d.name} district in ${d.state}. In ${d.year}, the approved labour budget was ₹${d.approvedLabourBudget?.toLocaleString() ?? 0}. 
    ₹${d.totalExpenditure?.toLocaleString() ?? 0} crore was spent. 
    ${d.totalHouseholdsWorked?.toLocaleString() ?? 0} households and ${d.totalIndividualsWorked?.toLocaleString() ?? 0} individuals worked, 
    generating ${d.womenPersondays?.toLocaleString() ?? 0} women persondays, 
    ${d.scPersondays?.toLocaleString() ?? 0} SC, and ${d.stPersondays?.toLocaleString() ?? 0} ST persondays. 
    Average days of employment were ${d.averageDaysEmployment ?? 0}.`,

  hi: (d: any) =>
    `${d.state} के ${d.name} जिले में, ${d.year} में ₹${d.approvedLabourBudget?.toLocaleString() ?? 0} का श्रम बजट स्वीकृत हुआ। 
    ₹${d.totalExpenditure?.toLocaleString() ?? 0} करोड़ खर्च हुए। 
    ${d.totalHouseholdsWorked?.toLocaleString() ?? 0} परिवारों और ${d.totalIndividualsWorked?.toLocaleString() ?? 0} व्यक्तियों ने कार्य किया। 
    महिला व्यक्ति-दिवस ${d.womenPersondays?.toLocaleString() ?? 0}, अनुसूचित जाति ${d.scPersondays?.toLocaleString() ?? 0}, 
    अनुसूचित जनजाति ${d.stPersondays?.toLocaleString() ?? 0}। औसतन ${d.averageDaysEmployment ?? 0} दिन का रोजगार मिला।`,

  as: (d: any) =>
    `${d.state} ৰাজ্যৰ ${d.name} জিলাত, ${d.year} চনত ₹${d.approvedLabourBudget?.toLocaleString() ?? 0} টকা অনুমোদিত হৈছিল। 
    ₹${d.totalExpenditure?.toLocaleString() ?? 0} কোটি খৰচ হৈছিল। 
    ${d.totalHouseholdsWorked?.toLocaleString() ?? 0} ঘৰে আৰু ${d.totalIndividualsWorked?.toLocaleString() ?? 0} ব্যক্তিয়ে কাম কৰিছিল। 
    মহিলাৰ ${d.womenPersondays?.toLocaleString() ?? 0} জন-দিন, SC ${d.scPersondays?.toLocaleString() ?? 0}, ST ${d.stPersondays?.toLocaleString() ?? 0}। 
    গড়ে প্ৰতি ঘৰক ${d.averageDaysEmployment ?? 0} দিন কাম দিয়া হৈছিল।`,
};




// src/lib/constants/language.ts


const fmt = (n?: number) => (n ? Number(n).toFixed(1) : "0.0");

export const voiceTemplatesCompare: Record<
  Lang,
  (d1: any, d2: any) => string
> = {
  en: (d1, d2) => {
    return `This is a district comparison between ${d1.name} in ${d1.state} and ${d2.name} in ${d2.state}.

${d1.name} had an approved labour budget of ₹${fmt(d1.approvedLabourBudget)}, while ${d2.name} had ₹${fmt(d2.approvedLabourBudget)}.
In terms of total expenditure, ${d1.name} spent ₹${fmt(d1.totalExpenditure)}, compared to ₹${fmt(d2.totalExpenditure)} for ${d2.name}.
Households that worked were ${fmt(d1.totalHouseholdsWorked)} in ${d1.name} versus ${fmt(d2.totalHouseholdsWorked)} in ${d2.name}.
For individuals employed, ${fmt(d1.totalIndividualsWorked)} in ${d1.name} versus ${fmt(d2.totalIndividualsWorked)} in ${d2.name}.
Women persondays stood at ${fmt(d1.womenPersondays)} for ${d1.name}, compared to ${fmt(d2.womenPersondays)} for ${d2.name}.
SC persondays were ${fmt(d1.scPersondays)} against ${fmt(d2.scPersondays)}, and ST persondays ${fmt(d1.stPersondays)} versus ${fmt(d2.stPersondays)}.
The average wage rate was ₹${fmt(d1.averageWageRate)} in ${d1.name} and ₹${fmt(d2.averageWageRate)} in ${d2.name}.
Overall, ${d1.name} ${
      d1.totalHouseholdsWorked > d2.totalHouseholdsWorked ? "performed better" : "lagged slightly behind"
    } in labour participation compared to ${d2.name}.`;
  },

  hi: (d1, d2) => {
    return `${d1.state} राज्य का ${d1.name} जिला और ${d2.state} राज्य का ${d2.name} जिला, इन दोनों की तुलना इस प्रकार है।

${d1.name} में स्वीकृत श्रम बजट ₹${fmt(d1.approvedLabourBudget)} रहा, जबकि ${d2.name} में ₹${fmt(d2.approvedLabourBudget)} था।
कुल व्यय के मामले में ${d1.name} ने ₹${fmt(d1.totalExpenditure)} खर्च किए, जबकि ${d2.name} में यह ₹${fmt(d2.totalExpenditure)} रहा।
काम करने वाले परिवारों की संख्या ${fmt(d1.totalHouseholdsWorked)} बनाम ${fmt(d2.totalHouseholdsWorked)} रही।
कुल काम करने वाले व्यक्ति ${fmt(d1.totalIndividualsWorked)} बनाम ${fmt(d2.totalIndividualsWorked)} थे।
महिला व्यक्ति-दिवस ${fmt(d1.womenPersondays)} बनाम ${fmt(d2.womenPersondays)} रहे।
अनुसूचित जाति व्यक्ति-दिवस ${fmt(d1.scPersondays)} और अनुसूचित जनजाति व्यक्ति-दिवस ${fmt(d1.stPersondays)} बनाम ${fmt(d2.stPersondays)} रहे।
औसत मजदूरी ₹${fmt(d1.averageWageRate)} बनाम ₹${fmt(d2.averageWageRate)} रही।
कुल मिलाकर, ${d1.name} जिला श्रम भागीदारी में ${
      d1.totalHouseholdsWorked > d2.totalHouseholdsWorked ? "बेहतर" : "थोड़ा पीछे"
    } रहा ${d2.name} की तुलना में।`;
  },

  as: (d1, d2) => {
    return `${d1.state} ৰাজ্যৰ ${d1.name} আৰু ${d2.state} ৰাজ্যৰ ${d2.name} জিলাৰ তুলনামূলক প্ৰতিবেদন।

${d1.name} জিলাত অনুমোদিত মজুৰি বাজেট আছিল ₹${fmt(d1.approvedLabourBudget)}, যেতিয়া ${d2.name} ত আছিল ₹${fmt(d2.approvedLabourBudget)}।
মুঠ খৰচৰ ক্ষেত্ৰত ${d1.name} এ ₹${fmt(d1.totalExpenditure)} ব্যয় কৰিছিল, যেতিয়া ${d2.name} ত এই সংখ্যা আছিল ₹${fmt(d2.totalExpenditure)}।
কাম কৰা ঘৰ ${fmt(d1.totalHouseholdsWorked)} বনাম ${fmt(d2.totalHouseholdsWorked)} আছিল।
কাম কৰা ব্যক্তিৰ সংখ্যা ${fmt(d1.totalIndividualsWorked)} বনাম ${fmt(d2.totalIndividualsWorked)}।
মহিলা জন-দিন ${fmt(d1.womenPersondays)} বনাম ${fmt(d2.womenPersondays)} আছিল।
SC জন-দিন ${fmt(d1.scPersondays)} আৰু ST জন-দিন ${fmt(d1.stPersondays)} বনাম ${fmt(d2.stPersondays)} আছিল।
গড় মজুৰি আছিল ₹${fmt(d1.averageWageRate)} বনাম ₹${fmt(d2.averageWageRate)}।
সামগ্ৰিকভাবে, ${d1.name} ${
      d1.totalHouseholdsWorked > d2.totalHouseholdsWorked ? "অধিক উন্নত" : "অলপ পিছপৰা"
    } আছিল ${d2.name} জিলাৰ তুলনাত।`;
  },
};



export const languageComparePage = {
  en: {
    title: "Compare Districts",
    loading: "Loading district data...",
    compareNow: "Compare Now",
    noData: "No data available.",
    firstDistrict: "Enter first district...",
    secondDistrict: "Enter second district...",
    voiceSummary: "Voice Summary",
    stop: "Stop",
    snapshot: "Download Snapshot",
  },
  hi: {
    title: "जिलों की तुलना करें",
    loading: "जिला डेटा लोड हो रहा है...",
    compareNow: "अब तुलना करें",
    noData: "कोई डेटा उपलब्ध नहीं है।",
    firstDistrict: "पहले जिले का नाम दर्ज करें...",
    secondDistrict: "दूसरे जिले का नाम दर्ज करें...",
    voiceSummary: "वॉयस सारांश",
    stop: "रोकें",
    snapshot: "स्नैपशॉट डाउनलोड करें",
  },
  as: {
    title: "জিলা তুলনা কৰক",
    loading: "জিলা তথ্য লোড হৈছে...",
    compareNow: "এতিয়া তুলনা কৰক",
    noData: "কোনো তথ্য উপলব্ধ নাই।",
    firstDistrict: "প্ৰথম জিলাৰ নাম লিখক...",
    secondDistrict: "দ্বিতীয় জিলাৰ নাম লিখক...",
    voiceSummary: "ভয়েছ চাৰাংশ",
    stop: "বন্ধ কৰক",
    snapshot: "ছবিৰ স্ন্যাপশ্বট ডাউনল'ড কৰক",
  },
};



export const languageInstall: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    tip: string;
    installBtn: string;
    installing: string;
    alreadyInstalled: string;
    uninstallInfoTitle: string;
    uninstallInfo: string;
    backHome: string;
  }
> = {
  en: {
    title: "Install the App",
    subtitle: "Access Mitra offline anytime, anywhere.",
    tip: "Tap install to add Mitra to your home screen.",
    installBtn: "Install App",
    installing: "Installing...",
    alreadyInstalled: "App already installed!",
    uninstallInfoTitle: "How to uninstall",
    uninstallInfo: "To remove the app, go to your device settings and uninstall Mitra.",
    backHome: "Back to Home",
  },
  hi: {
    title: "ऐप इंस्टॉल करें",
    subtitle: "कहीं भी, कभी भी ऑफलाइन पहुँच।",
    tip: "मित्र को अपने होम स्क्रीन पर जोड़ने के लिए इंस्टॉल करें।",
    installBtn: "ऐप इंस्टॉल करें",
    installing: "इंस्टॉल हो रहा है...",
    alreadyInstalled: "ऐप पहले से इंस्टॉल है!",
    uninstallInfoTitle: "अनइंस्टॉल कैसे करें",
    uninstallInfo: "ऐप हटाने के लिए अपने डिवाइस की सेटिंग्स में जाएं।",
    backHome: "होम पर वापस जाएं",
  },
  as: {
    title: "এপ ইনষ্টল কৰক",
    subtitle: "যিকোনো ঠাইৰ পৰা অফলাইনত ব্যৱহাৰ কৰক।",
    tip: "আপোনাৰ হোম স্ক্ৰীনত মিত্ৰ যোগ কৰিবলৈ ইনষ্টল কৰক।",
    installBtn: "এপ ইনষ্টল কৰক",
    installing: "ইনষ্টল হৈ আছে...",
    alreadyInstalled: "এপ ইতিমধ্যে ইনষ্টল হৈছে!",
    uninstallInfoTitle: "আনইনষ্টল কেনেকৈ কৰিব",
    uninstallInfo: "এপ আঁতৰাবলৈ আপোনাৰ ডিভাইচৰ ছেটিংছত যাওক।",
    backHome: "ঘৰলৈ ফিৰি যাওক",
  },
};



export const languageFooter: Record<Lang, {
  home: string;
  insights: string;
  compare: string;
  install: string;
  about: string;
  copyright: string;
}> = {
  en: {
    home: "Home",
    insights: "Insights",
    compare: "Compare",
    install: "Install",
    about: "Mitra",
    copyright: "© 2025 Mitra. All rights reserved.",
  },
  hi: {
    home: "होम",
    insights: "जानकारी",
    compare: "तुलना",
    install: "इंस्टॉल",
    about: "मित्र",
    copyright: "© 2025 मित्र. सर्वाधिकार सुरक्षित।",
  },
  as: {
    home: "হোম",
    insights: "অভিজ্ঞতা",
    compare: "তুলনা",
    install: "ইনষ্টল",
    about: "মিত্ৰ",
    copyright: "© ২০২৫ মিত্ৰ. সকলো অধিকাৰ সংৰক্ষিত।",
  },
};




export const languageAbout: Record<
  Lang,
  {
    title: string;
    desc: string;
    features: string[];
    explore: string;
    listen: string;
  }
> = {
  en: {
    title: "About Mitra — Our Voice, Our Rights",
    desc: "Mitra is an open platform that simplifies MGNREGA data for every citizen — bringing transparency, empowerment, and awareness to the people of Bharat.",
    features: [
      "Voice summaries in local languages",
      "Easy comparison of district performance",
      "Offline-ready with PWA support",
      "Data transparency powered by Bharat’s citizens",
    ],
    explore: "Explore Insights →",
    listen: "Listen",
  },

  hi: {
    title: "मित्र के बारे में — हमारी आवाज़, हमारे अधिकार",
    desc: "मित्र एक खुला मंच है जो हर नागरिक के लिए MGNREGA डेटा को सरल बनाता है — पारदर्शिता, सशक्तिकरण और जागरूकता लाता है।",
    features: [
      "स्थानीय भाषाओं में वॉयस सारांश",
      "जिलों के प्रदर्शन की आसान तुलना",
      "PWA समर्थन के साथ ऑफ़लाइन उपयोग",
      "भारत के नागरिकों द्वारा संचालित पारदर्शिता",
    ],
    explore: "अंतर्दृष्टि देखें →",
    listen: "सुनें",
  },

  as: {
    title: "মিত্ৰ সম্পৰ্কে — আমাৰ স্বৰ, আমাৰ অধিকাৰ",
    desc: "মিত্ৰ হৈছে এটা মুক্ত মঞ্চ যি প্ৰতিজন নাগৰিকৰ বাবে MGNREGA তথ্য সহজ কৰে — স্বচ্ছতা, শক্তিকৰণ আৰু সজাগতা আনে।",
    features: [
      "স্থানীয় ভাষাত ভয়েছ সামৰি",
      "জিলা-প্ৰদৰ্শনৰ সহজ তুলনা",
      "PWA সহ অফলাইন সহায়তা",
      "ভাৰতবাসীৰ দ্বাৰা তথ্য স্বচ্ছতা",
    ],
    explore: "অন্তৰ্দৃষ্টি চাওক →",
    listen: "শুনক",
  },
};



export const languageContact: Record<
  Lang,
  {
    title: string;
    desc: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    email: string;
    address: string;
    listen: string;
  }
> = {
  en: {
    title: "Contact the Mitra Team",
    desc: "We’d love to hear from you — whether it’s feedback, suggestions, or stories of how Mitra helped your community.",
    namePlaceholder: "Full Name",
    emailPlaceholder: "Email Address",
    messagePlaceholder: "Your Message",
    submit: "Send Message",
    email: "support@mitra.gov.in",
    address: "IIT Patna, India",
    listen: "Listen",
  },

  hi: {
    title: "मित्र टीम से संपर्क करें",
    desc: "हम आपसे सुनना चाहेंगे — चाहे वह सुझाव हो, प्रतिक्रिया हो या आपकी कहानी कि कैसे मित्र ने मदद की।",
    namePlaceholder: "पूरा नाम",
    emailPlaceholder: "ईमेल पता",
    messagePlaceholder: "आपका संदेश",
    submit: "संदेश भेजें",
    email: "support@mitra.gov.in",
    address: "आईआईटी पटना, भारत",
    listen: "सुनें",
  },

  as: {
    title: "মিত্ৰ দলেৰ সৈতে যোগাযোগ কৰক",
    desc: "আমাক আপোনাৰ মতামত, পৰামৰ্শ বা মিত্ৰে আপোনাক কেনেকৈ সহায় কৰিছে সেই কথা জনাবলৈ আমি আগ্ৰহী।",
    namePlaceholder: "সম্পূৰ্ণ নাম",
    emailPlaceholder: "ইমেইল ঠিকনা",
    messagePlaceholder: "আপোনাৰ বাৰ্তা",
    submit: "বাৰ্তা পঠিয়াওক",
    email: "support@mitra.gov.in",
    address: "আইআইটি পতনা, ভাৰত",
    listen: "শুনক",
  },
};
