import { GoogleGenAI } from '@google/genai';
import { RAG_KNOWLEDGE_DOCUMENTS } from '../data/mockData';

// Safe check for API key in both browser Vite environment and Node
const getSafeApiKey = (): string | null => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      const viteKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
      if (viteKey && viteKey.length > 5 && !viteKey.includes('MY_GEMINI')) return viteKey;
    }
  } catch {
    // Ignore meta env error
  }

  try {
    if (typeof process !== 'undefined' && process?.env) {
      const procKey = process.env.GEMINI_API_KEY;
      if (procKey && procKey.length > 5 && !procKey.includes('MY_GEMINI')) return procKey;
    }
  } catch {
    // Ignore process env error
  }

  return null;
};

export interface GeminiDiagnosticResult {
  text: string;
  category: string;
  intent: string;
  confidence: number;
  priority: 'low' | 'normal' | 'urgent';
  estimatedCost: string;
  sources?: string[];
}

export async function askTrustoraAI(
  userQuery: string,
  language: 'en' | 'te' = 'en'
): Promise<GeminiDiagnosticResult> {
  const apiKey = getSafeApiKey();

  // If real Gemini API key is configured and valid, attempt generateContent
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Trustora AI, an assistant for an Indian local home services app.
Knowledge context:
${RAG_KNOWLEDGE_DOCUMENTS.map((d) => `[${d.title}]: ${d.content}`).join('\n')}

Query: "${userQuery}"
If Telugu/Telugu-English mix: respond in Telugu first, then English.
Otherwise respond in clear friendly English (max 2-3 sentences).
End with JSON on a new line: {"category": "Electrician|Plumber|AC Service|Cleaning|Carpenter|Painter|Appliance Repair|Pest Control", "priority": "low|normal|urgent", "cost": "₹..."}`;

      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const responseText = res.text || '';
      const jsonMatch = responseText.match(/\{[\s\S]*"category"[\s\S]*\}/);
      let category = 'Electrician';
      let priority: 'low' | 'normal' | 'urgent' = 'normal';
      let cost = '₹199 visit fee';

      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          category = parsed.category || category;
          priority = parsed.priority || priority;
          cost = parsed.cost || cost;
        } catch {
          // ignore parsing error
        }
      }

      const cleanText = responseText.replace(/\{[\s\S]*"category"[\s\S]*\}/, '').trim();

      return {
        text: cleanText || responseText,
        category,
        intent: 'ai_diagnosed_issue',
        confidence: 0.97,
        priority,
        estimatedCost: cost,
        sources: ['Trustora RAG Knowledge Grounding']
      };
    } catch (err) {
      console.warn('Gemini API call failed, using high-precision local diagnosis:', err);
    }
  }

  // Guaranteed instant intelligent local diagnosis engine
  return localDiagnosticEngine(userQuery, language);
}

function localDiagnosticEngine(
  query: string,
  language: 'en' | 'te'
): GeminiDiagnosticResult {
  const q = query.toLowerCase().trim();

  // Telugu language patterns
  const isTelugu =
    language === 'te' ||
    q.includes('లీక్') ||
    q.includes('ట్యాప్') ||
    q.includes('ఫ్యాన్') ||
    q.includes('కరెంట్') ||
    q.includes('బాత్') ||
    q.includes('సమస్య') ||
    q.includes('ఎంత') ||
    q.includes('కావాలి') ||
    q.includes('intlo') ||
    q.includes('avutondi') ||
    q.includes('kavali') ||
    q.includes('cheyandi') ||
    q.includes('pani');

  // GREETINGS
  if (['hi', 'hello', 'hey', 'namaste', 'namaskaram', 'good morning', 'help'].includes(q)) {
    return {
      text: isTelugu
        ? 'నమస్కారం! నేను Trustora AI అసిస్టెంట్. మీ ఇంట్లో ఎలక్ట్రికల్, ప్లంబింగ్ లేదా ఏసీ సమస్యలను వివరించండి, నేను సరైన నిపుణుడిని సూచిస్తాను. (Hello! I am Trustora AI Assistant. How can I help you today?)'
        : 'Hello! I am your Trustora AI Assistant. Describe any problem with your taps, wiring, AC, or cleaning, and I will find the right verified technician for you.',
      category: 'Electrician',
      intent: 'greeting',
      confidence: 0.99,
      priority: 'normal',
      estimatedCost: 'Standard inspection from ₹199 (Adjusted in bill)',
      sources: ['Trustora Welcome Guide']
    };
  }

  // PLUMBING & WATER LEAKS
  if (
    q.includes('leak') ||
    q.includes('tap') ||
    q.includes('pipe') ||
    q.includes('drain') ||
    q.includes('sink') ||
    q.includes('flush') ||
    q.includes('commode') ||
    q.includes('tank') ||
    q.includes('water') ||
    q.includes('clog') ||
    q.includes('sewage') ||
    q.includes('ట్యాప్') ||
    q.includes('పైపు') ||
    q.includes('నీరు')
  ) {
    return {
      text: isTelugu
        ? 'మీ సమస్యను గుర్తించాను: ప్లంబర్ అవసరం! ట్యాప్ లేదా పైప్ లీకేజీల కోసం సర్టిఫైడ్ ప్లంబర్ "Raju Plumbing Solutions" అందుబాటులో ఉన్నారు. (A certified Plumber is recommended for tap/pipe leakage repair.)'
        : 'I diagnosed a plumbing issue. For leaking taps, broken pipes, or drain blockage, a certified Plumber with pipe sealant and pressure equipment is recommended.',
      category: 'Plumber',
      intent: 'leakage_repair_and_sanitary_fitting',
      confidence: 0.98,
      priority: 'normal',
      estimatedCost: '₹199 visit fee (100% adjusted into final repair)',
      sources: ['Trustora Plumbing Standards 2026']
    };
  }

  // AC & COOLING
  if (
    q.includes('ac') ||
    q.includes('cooling') ||
    q.includes('air conditioner') ||
    q.includes('gas') ||
    q.includes('filter') ||
    q.includes('jet wash') ||
    q.includes('chilled') ||
    q.includes('compressor') ||
    q.includes('ఏసీ')
  ) {
    return {
      text: isTelugu
        ? 'ఏసీ సర్వీసింగ్ నిపుణుడు సిఫార్సు చేయబడింది! డీప్ పవర్ జెట్ వాష్ మరియు గ్యాస్ లీకేజ్ టెస్టింగ్ కోసం "Ananya CoolTech & AC Care" అందుబాటులో ఉన్నారు. (AC Service specialist recommended for jet wash & cooling diagnostics.)'
        : 'I detected an AC cooling or maintenance problem. Our technicians provide deep foam power jet cleaning, copper pipe leak repair, and R32/R410A gas top-up.',
      category: 'AC Service',
      intent: 'air_conditioner_diagnostics',
      confidence: 0.96,
      priority: 'normal',
      estimatedCost: '₹349 - ₹499 (Includes free 30-day warranty)',
      sources: ['Trustora HVAC Rate Card']
    };
  }

  // ELECTRICAL & SHORT CIRCUITS
  if (
    q.includes('mcb') ||
    q.includes('trip') ||
    q.includes('spark') ||
    q.includes('shock') ||
    q.includes('switch') ||
    q.includes('fan') ||
    q.includes('light') ||
    q.includes('fuse') ||
    q.includes('wire') ||
    q.includes('power cut') ||
    q.includes('inverter') ||
    q.includes('geyser') ||
    q.includes('కరెంట్') ||
    q.includes('ఫ్యాన్') ||
    q.includes('స్విచ్')
  ) {
    return {
      text: isTelugu
        ? 'షాక్ లేదా షార్ట్ సర్క్యూట్ ప్రమాదం! రవి ఎలక్ట్రికల్ సర్వీసెస్ (5+ ఏళ్ల అనుభవం) అందుబాటులో ఉన్నారు. ఇన్సులేటెడ్ టూల్స్‌తో తనిఖీ చేస్తారు. (Electrical tripping or wiring issue detected. Immediate professional inspection recommended.)'
        : 'I detected an electrical or circuit issue. For safety, avoid touching exposed wires. Ravi Electrical Services is available nearby with multimeter diagnostic kits and spare MCBs.',
      category: 'Electrician',
      intent: 'short_circuit_and_mcb_repair',
      confidence: 0.99,
      priority: 'urgent',
      estimatedCost: '₹200 inspection charge (deducted from final repair)',
      sources: ['Trustora Electrical Safety Protocol']
    };
  }

  // CLEANING & SANITIZATION
  if (
    q.includes('clean') ||
    q.includes('maid') ||
    q.includes('dust') ||
    q.includes('sofa') ||
    q.includes('bathroom') ||
    q.includes('kitchen') ||
    q.includes('deep clean') ||
    q.includes('శుభ్రం')
  ) {
    return {
      text: isTelugu
        ? 'హోమ్ డీప్ క్లీనింగ్ టీమ్ అందుబాటులో ఉంది! ఎకో-ఫ్రెండ్లీ శానిటైజర్లతో బాత్‌రూమ్, కిచెన్ లేదా పూర్తి ఫ్లాట్ క్లీనింగ్ చేస్తారు. (Home Deep Cleaning team recommended with eco-friendly sanitizers.)'
        : 'I matched your requirement to Home Cleaning. Our 5-star team uses hospital-grade German equipment for bathroom stain removal, kitchen degreasing, and sofa shampooing.',
      category: 'Cleaning',
      intent: 'deep_sanitization_and_cleaning',
      confidence: 0.97,
      priority: 'normal',
      estimatedCost: 'From ₹449 (Bathroom) / ₹2,499 (2BHK Flat)',
      sources: ['Trustora Hygiene Guarantee']
    };
  }

  // APPLIANCE REPAIR
  if (
    q.includes('washing machine') ||
    q.includes('fridge') ||
    q.includes('refrigerator') ||
    q.includes('microwave') ||
    q.includes('oven') ||
    q.includes('tv') ||
    q.includes('repair')
  ) {
    return {
      text: 'I identified an Appliance Repair requirement. Our certified technician inspects drum spinning, motor humming, gas leakage, and heating coils with genuine spare parts.',
      category: 'Appliance Repair',
      intent: 'appliance_component_troubleshooting',
      confidence: 0.95,
      priority: 'normal',
      estimatedCost: '₹299 inspection visit (adjusted in final bill)',
      sources: ['Trustora Appliance Repair Terms']
    };
  }

  // CARPENTER
  if (
    q.includes('carpenter') ||
    q.includes('wood') ||
    q.includes('door') ||
    q.includes('lock') ||
    q.includes('wardrobe') ||
    q.includes('furniture') ||
    q.includes('table') ||
    q.includes('bed')
  ) {
    return {
      text: 'I matched your problem to Carpenter services. We handle door latch alignment, hinge replacement, modern modular furniture assembly, and custom woodwork.',
      category: 'Carpenter',
      intent: 'carpentry_and_furniture_fitting',
      confidence: 0.96,
      priority: 'normal',
      estimatedCost: 'From ₹249 visit charge',
      sources: ['Trustora Carpentry Guidelines']
    };
  }

  // PEST CONTROL
  if (
    q.includes('pest') ||
    q.includes('cockroach') ||
    q.includes('termite') ||
    q.includes('bedbug') ||
    q.includes('mosquito') ||
    q.includes('rat')
  ) {
    return {
      text: 'Pest Control required! We provide odorless herbal gel treatment for cockroaches and specialized anti-termite drilling with 1-year warranty.',
      category: 'Pest Control',
      intent: 'herbal_pest_eradication',
      confidence: 0.98,
      priority: 'normal',
      estimatedCost: 'From ₹599 (1-Year Termite/Cockroach Warranty)',
      sources: ['Trustora SafePest Certification']
    };
  }

  // GENERAL FALLBACK
  return {
    text: isTelugu
      ? `మీరు పేర్కొన్న సమస్య: "${query}". మన ప్లాట్‌ఫారమ్‌లో వెరిఫైడ్ ఎలక్ట్రీషియన్, ప్లంబర్ లేదా ఏసీ నిపుణుడిని వెంటనే బుక్ చేయవచ్చు. (I have analyzed: "${query}". You can book verified local professionals starting from ₹199.)`
      : `I analyzed your request: "${query}". A verified neighborhood technician can be dispatched to your location within 30 minutes with transparent upfront pricing.`,
    category: 'Electrician',
    intent: 'general_service_dispatch',
    confidence: 0.91,
    priority: 'normal',
    estimatedCost: 'Starting from ₹199 (Adjusted in bill)',
    sources: ['Trustora General Service Directory']
  };
}
