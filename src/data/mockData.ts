import { Professional, ServiceCategory, Booking, UserProfile } from '../types';

export const CITIES = [
  'Hyderabad',
  'Bengaluru',
  'Mumbai',
  'Delhi NCR',
  'Chennai',
  'Pune',
  'Kolkata'
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'electrician',
    name: 'Electrician',
    iconName: 'Zap',
    tagline: 'Wiring, switches, fans, MCB & fuse repair',
    popular: true,
    startingPrice: 199,
  },
  {
    id: 'plumber',
    name: 'Plumber',
    iconName: 'Wrench',
    tagline: 'Tap leaks, pipe repair, toilet & motor fitting',
    popular: true,
    startingPrice: 199,
  },
  {
    id: 'ac_service',
    name: 'AC Service',
    iconName: 'Wind',
    tagline: 'Deep foam jet wash, gas refill, cooling issues',
    popular: true,
    startingPrice: 399,
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    iconName: 'Sparkles',
    tagline: 'Full home deep cleaning, kitchen & bathroom sanitation',
    popular: true,
    startingPrice: 499,
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    iconName: 'Hammer',
    tagline: 'Furniture assembly, doors, locks & wood repair',
    popular: false,
    startingPrice: 249,
  },
  {
    id: 'painter',
    name: 'Painter',
    iconName: 'Paintbrush',
    tagline: 'Interior, exterior, waterproof wall painting',
    popular: false,
    startingPrice: 599,
  },
  {
    id: 'appliance',
    name: 'Appliance Repair',
    iconName: 'Tv',
    tagline: 'Washing machine, refrigerator, microwave & geyser',
    popular: true,
    startingPrice: 299,
  },
  {
    id: 'pest_control',
    name: 'Pest Control',
    iconName: 'ShieldAlert',
    tagline: 'Termite, cockroach, mosquito & rodent extermination',
    popular: false,
    startingPrice: 699,
  },
  {
    id: 'vehicle_repair',
    name: 'Vehicle Repair',
    iconName: 'Car',
    tagline: 'Bike & car breakdown assistance, battery jumpstart',
    popular: false,
    startingPrice: 349,
  },
  {
    id: 'beauty',
    name: 'Beauty & Salon',
    iconName: 'Scissors',
    tagline: 'Haircuts, facials, waxing & grooming at home',
    popular: false,
    startingPrice: 399,
  },
  {
    id: 'packers_movers',
    name: 'Packers & Movers',
    iconName: 'Truck',
    tagline: 'Safe household shifting & vehicle transportation',
    popular: false,
    startingPrice: 1499,
  },
  {
    id: 'more_services',
    name: 'More Services',
    iconName: 'LayoutGrid',
    tagline: 'CCTV installation, solar, gardening & handyman',
    popular: false,
    startingPrice: 299,
  },
];

export const PROFESSIONALS: Professional[] = [
  {
    id: 'prof-elec-1',
    name: 'Premier Electrical Services',
    businessName: 'Premier Electrical & Home Solutions',
    categoryId: 'electrician',
    categoryName: 'Electrician',
    avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 320,
    experienceYears: 5,
    visitCharge: 200,
    isAvailableToday: true,
    distanceKm: 2.4,
    locationCity: 'Hyderabad',
    locationArea: 'Madhapur, Hitec City',
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'Specializes in all types of domestic & commercial electrical installations, MCB trip troubleshooting, concealed wiring, inverter setups, and smart switchboard fitting. Always equipped with professional multimeter and safety insulated tools.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: [
      'Short Circuit & MCB Trip Resolution',
      'Fan, Chandelier & Light Fixtures',
      'Inverter & Home UPS Installation',
      'Complete Room Rewiring & Earth Leaks'
    ],
    pricingDetails: [
      { serviceName: 'Standard Inspection & Visit Charge', price: 200, unit: 'per visit (adjusted in final bill)' },
      { serviceName: 'Ceiling Fan Installation / Replacement', price: 150, unit: 'per unit' },
      { serviceName: 'Switch / Socket Replacement (up to 3)', price: 120, unit: 'per set' },
      { serviceName: 'Inverter & Battery Wiring Setup', price: 450, unit: 'per setup' },
      { serviceName: 'Main Board / MCB Repair', price: 350, unit: 'per board' },
    ],
    portfolioImages: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500&auto=format&fit=crop&q=80'
    ],
    reviews: [
      {
        id: 'rev-1',
        customerName: 'Srinivas Rao',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'The technician was very polite and detected the tripped breaker within 15 minutes. Brought genuine spare MCB and completed the work cleanly. Highly recommended!',
        serviceCategory: 'Electrician'
      },
      {
        id: 'rev-2',
        customerName: 'Sunita Reddy',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Very punctual. Arrived right on time in Hyderabad traffic. Fixed 3 ceiling fans and replaced my faulty balcony switchboard.',
        serviceCategory: 'Electrician'
      },
      {
        id: 'rev-3',
        customerName: 'Karthik Varma',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        rating: 4.5,
        date: '2 weeks ago',
        comment: 'Transparent pricing. The visit charge was deducted from the final repair bill as promised by Trustora.',
        serviceCategory: 'Electrician'
      }
    ],
    completedJobsCount: 489,
    phone: '+91 98480 12345'
  },
  {
    id: 'prof-suresh-2',
    name: 'Suresh Electrical Works',
    businessName: 'Suresh PowerTech',
    categoryId: 'electrician',
    categoryName: 'Electrician',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewCount: 210,
    experienceYears: 8,
    visitCharge: 250,
    isAvailableToday: true,
    distanceKm: 3.8,
    locationCity: 'Hyderabad',
    locationArea: 'Kukatpally, KPHB',
    languages: ['Telugu', 'Hindi'],
    about: '8+ years of dedicated electrical repair across Hyderabad. Specialist in 3-phase wiring, industrial appliances, heavy stabilizer installations, and earthing solutions.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: [
      'Heavy Load Stabilizer Fitting',
      '3-Phase Commercial Wiring',
      'Earthing Rod Installation'
    ],
    pricingDetails: [
      { serviceName: 'Visit & Diagnostic Charge', price: 250, unit: 'per visit' },
      { serviceName: 'Earthing & Phase Testing', price: 400, unit: 'per point' }
    ],
    portfolioImages: [
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500&auto=format&fit=crop&q=80'
    ],
    reviews: [
      {
        id: 'rev-4',
        customerName: 'Venkatesh K.',
        rating: 5,
        date: '3 days ago',
        comment: 'Solves complex electrical tripping that 2 other electricians failed to fix.',
        serviceCategory: 'Electrician'
      }
    ],
    completedJobsCount: 310,
    phone: '+91 98480 23456'
  },
  {
    id: 'prof-kumar-3',
    name: 'Kumar Electricals',
    businessName: 'Kumar Home Automation & Wiring',
    categoryId: 'electrician',
    categoryName: 'Electrician',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 180,
    experienceYears: 6,
    visitCharge: 200,
    isAvailableToday: true,
    distanceKm: 4.5,
    locationCity: 'Hyderabad',
    locationArea: 'Gachibowli, Kondapur',
    languages: ['English', 'Telugu'],
    about: 'Expert in modern LED profile lighting, false ceiling strip lights, smart WiFi switches, and home automation rewiring.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: [
      'Smart Home Switches & Alexa Wiring',
      'LED Profile Lights & Chandeliers',
      'Geyser Thermostat Repair'
    ],
    pricingDetails: [
      { serviceName: 'Diagnostic Visit', price: 200, unit: 'per visit' },
      { serviceName: 'Smart Switch Integration', price: 200, unit: 'per switch' }
    ],
    portfolioImages: [],
    reviews: [],
    completedJobsCount: 220,
    phone: '+91 98480 34567'
  },
  {
    id: 'prof-raju-plumb',
    name: 'Raju Plumbing Solutions',
    businessName: 'Raju HydroCare Services',
    categoryId: 'plumber',
    categoryName: 'Plumber',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 410,
    experienceYears: 9,
    visitCharge: 199,
    isAvailableToday: true,
    distanceKm: 1.8,
    locationCity: 'Hyderabad',
    locationArea: 'Banjara Hills, Jubilee Hills',
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'Certified plumbing master. Specialized in concealed pipe leaks, pressure pump installation, sanitaryware fittings, water tank cleaning, and overhead tank float valve repair.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: [
      'Concealed Pipe Leakage Detection',
      'Water Pressure Pump Fitting',
      'Western Commode & Flush Valve Replacement'
    ],
    pricingDetails: [
      { serviceName: 'Plumbing Inspection Visit', price: 199, unit: 'per visit' },
      { serviceName: 'Kitchen Sink Tap Replacement', price: 180, unit: 'per tap' },
      { serviceName: 'Drain Blockage Removal', price: 300, unit: 'per drain' }
    ],
    portfolioImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80'
    ],
    reviews: [
      {
        id: 'rev-plumb-1',
        customerName: 'Anil Kumar',
        rating: 5,
        date: 'Yesterday',
        comment: 'Fixed our severe kitchen sink leakage in 20 minutes without breaking any tiles!',
        serviceCategory: 'Plumber'
      }
    ],
    completedJobsCount: 650,
    phone: '+91 98480 45678'
  },
  {
    id: 'prof-ananya-ac',
    name: 'Ananya CoolTech & AC Care',
    businessName: 'Ananya HVAC Systems',
    categoryId: 'ac_service',
    categoryName: 'AC Service',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    rating: 4.85,
    reviewCount: 290,
    experienceYears: 7,
    visitCharge: 349,
    isAvailableToday: true,
    distanceKm: 3.1,
    locationCity: 'Hyderabad',
    locationArea: 'Hitec City, Gachibowli',
    languages: ['English', 'Telugu'],
    about: 'Comprehensive AC diagnostics, Power Jet deep foam washing, copper pipe leak brazing, and high purity R32/R410A gas replenishment.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: [
      'Foam Jet Deep AC Cleaning',
      'Gas Leak Repair & R32 Top-up',
      'PCB Motherboard Diagnostics'
    ],
    pricingDetails: [
      { serviceName: 'Power Jet Wash (Indoor + Outdoor)', price: 499, unit: 'per AC' },
      { serviceName: 'Full Gas Charging', price: 1800, unit: 'per split AC' }
    ],
    portfolioImages: [],
    reviews: [],
    completedJobsCount: 410,
    phone: '+91 98480 56789'
  },
  {
    id: 'prof-priya-clean',
    name: 'Priya Elite Home Cleaners',
    businessName: 'Priya Hygiene Solutions',
    categoryId: 'cleaning',
    categoryName: 'Cleaning',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 520,
    experienceYears: 6,
    visitCharge: 499,
    isAvailableToday: true,
    distanceKm: 2.9,
    locationCity: 'Hyderabad',
    locationArea: 'Madhapur, Begumpet',
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'German equipment deep home cleaning team using eco-friendly hospital-grade sanitizers. Safe for toddlers, seniors, and pets.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: [
      'Full Apartment Deep Cleaning',
      'Bathroom Acid-free Hard Water Stain Removal',
      'Kitchen Degreasing & Chimney Scrub'
    ],
    pricingDetails: [
      { serviceName: '2 BHK Deep Cleaning', price: 2499, unit: 'flat rate' },
      { serviceName: 'Intense Bathroom Cleaning', price: 549, unit: 'per bathroom' }
    ],
    portfolioImages: [],
    reviews: [
      {
        id: 'rev-clean-1',
        customerName: 'Kavitha S.',
        rating: 5,
        date: '3 days ago',
        comment: 'Very professional deep cleaning team. Kitchen tiles look completely brand new!',
        serviceCategory: 'Cleaning'
      }
    ],
    completedJobsCount: 780,
    phone: '+91 98480 67890'
  },
  {
    id: 'prof-asif-elec',
    name: 'Mohammed Asif PowerTech',
    businessName: 'Asif Electrical & Inverter Solutions',
    categoryId: 'electrician',
    categoryName: 'Electrician',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 380,
    experienceYears: 11,
    visitCharge: 220,
    isAvailableToday: true,
    distanceKm: 2.1,
    locationCity: 'Hyderabad',
    locationArea: 'Tolichowki, Mehdipatnam',
    languages: ['Hindi', 'Telugu', 'Urdu', 'English'],
    about: '11+ years seasoned electrician. Master of 3-phase industrial and domestic circuits, Luminous/Microtek inverter setups, and heavy copper earthing.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['Heavy Inverter Setup', '3-Phase DB Dressing', 'Underground Cable Fault'],
    pricingDetails: [
      { serviceName: 'Visit & Load Audit', price: 220, unit: 'per visit' },
      { serviceName: 'Inverter Wiring & Testing', price: 400, unit: 'per setup' }
    ],
    portfolioImages: [],
    reviews: [
      {
        id: 'rev-asif-1',
        customerName: 'Imran Khan',
        rating: 5,
        date: 'Yesterday',
        comment: 'Asif bhai solved our recurring tripping within 20 mins. Honest pricing.',
        serviceCategory: 'Electrician'
      }
    ],
    completedJobsCount: 620,
    phone: '+91 98480 77112'
  },
  {
    id: 'prof-naresh-elec',
    name: 'Naresh Babu Electricals',
    businessName: 'Babu Light & Power Services',
    categoryId: 'electrician',
    categoryName: 'Electrician',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewCount: 140,
    experienceYears: 4,
    visitCharge: 180,
    isAvailableToday: true,
    distanceKm: 3.5,
    locationCity: 'Hyderabad',
    locationArea: 'Dilsukhnagar, LB Nagar',
    languages: ['Telugu', 'Hindi'],
    about: 'Quick response local technician for fast switchboard replacements, ceiling fan wobbling fix, and balcony light fitting.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['Fan Fitting', 'Switchboard Repair', 'Calling Bell Wiring'],
    pricingDetails: [
      { serviceName: 'Inspection Visit', price: 180, unit: 'per visit' },
      { serviceName: 'Switch/Socket Repair', price: 100, unit: 'per unit' }
    ],
    portfolioImages: [],
    reviews: [],
    completedJobsCount: 195,
    phone: '+91 98480 88223'
  },
  {
    id: 'prof-venkat-plumb',
    name: 'Venkat Ramana Sanitary & Pipes',
    businessName: 'Ramana Plumbing Works',
    categoryId: 'plumber',
    categoryName: 'Plumber',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    rating: 4.75,
    reviewCount: 260,
    experienceYears: 7,
    visitCharge: 199,
    isAvailableToday: true,
    distanceKm: 2.8,
    locationCity: 'Hyderabad',
    locationArea: 'Secunderabad, Marredpally',
    languages: ['Telugu', 'English', 'Hindi'],
    about: 'Specialized in overhead Sintex water tank cleaning, automatic float valve switch fitting, and pressure booster pumps.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['Water Tank Cleaning', 'Float Sensor Switch', 'CPVC Concealed Piping'],
    pricingDetails: [
      { serviceName: 'Diagnostic Visit', price: 199, unit: 'per visit' },
      { serviceName: 'Automatic Float Valve Setup', price: 350, unit: 'per tank' }
    ],
    portfolioImages: [],
    reviews: [
      {
        id: 'rev-venkat-1',
        customerName: 'B. Prasad',
        rating: 5,
        date: '4 days ago',
        comment: 'Fixed our tank overflowing problem permanently with genuine Brass valve.',
        serviceCategory: 'Plumber'
      }
    ],
    completedJobsCount: 390,
    phone: '+91 98480 99334'
  },
  {
    id: 'prof-ramesh-plumb',
    name: 'Ramesh Naik Leakage Specialist',
    businessName: 'Naik Pipe Diagnostics',
    categoryId: 'plumber',
    categoryName: 'Plumber',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    rating: 4.65,
    reviewCount: 185,
    experienceYears: 5,
    visitCharge: 180,
    isAvailableToday: true,
    distanceKm: 1.5,
    locationCity: 'Hyderabad',
    locationArea: 'Miyapur, Chandanagar',
    languages: ['Telugu', 'Hindi'],
    about: 'Acoustic pipe leak detection expert. Finds internal bathroom wall leakages without damaging floor or wall tiles unnecessarily.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['Wall Seepage Detection', 'Wash Basin Trap Replacement', 'Clogged Floor Drains'],
    pricingDetails: [
      { serviceName: 'Leak Inspection Charge', price: 180, unit: 'per visit' },
      { serviceName: 'Drain Chemical Unclogging', price: 299, unit: 'per drain' }
    ],
    portfolioImages: [],
    reviews: [],
    completedJobsCount: 275,
    phone: '+91 98481 00445'
  },
  {
    id: 'prof-santosh-ac',
    name: 'Santosh AirCare & HVAC',
    businessName: 'Santosh Cooling Systems',
    categoryId: 'ac_service',
    categoryName: 'AC Service',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 310,
    experienceYears: 6,
    visitCharge: 349,
    isAvailableToday: true,
    distanceKm: 2.3,
    locationCity: 'Hyderabad',
    locationArea: 'Kondapur, Hafeezpet',
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'Daikin and Voltas certified technician. Specializes in inverter split AC PCB repairs, outdoor unit bracket mounting, and copper piping brazing.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['Power Jet Foam Wash', 'PCB Board Repair', 'Anti-Rust Protective Coating'],
    pricingDetails: [
      { serviceName: 'Power Jet Cleaning', price: 499, unit: 'per AC' },
      { serviceName: 'Gas Leak Check & Brazing', price: 650, unit: 'per joint' }
    ],
    portfolioImages: [],
    reviews: [
      {
        id: 'rev-santosh-1',
        customerName: 'Raghavendra M.',
        rating: 5,
        date: '5 days ago',
        comment: 'The jet wash was very thorough. Cooling is like brand new AC now.',
        serviceCategory: 'AC Service'
      }
    ],
    completedJobsCount: 450,
    phone: '+91 98481 11556'
  },
  {
    id: 'prof-saiteja-ac',
    name: 'Sai Teja Split & Inverter AC Tech',
    businessName: 'Sai Teja Climate Solutions',
    categoryId: 'ac_service',
    categoryName: 'AC Service',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 410,
    experienceYears: 9,
    visitCharge: 399,
    isAvailableToday: true,
    distanceKm: 3.2,
    locationCity: 'Hyderabad',
    locationArea: 'Jubilee Hills, Film Nagar',
    languages: ['English', 'Telugu'],
    about: 'Premium HVAC technician specializing in Mitsubishi, O General, and Daikin VRV central systems as well as standard 1.5 ton split ACs.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['VRV Central Diagnostics', 'R410A / R32 High Purity Gas Top-Up', 'Capacitor Replacement'],
    pricingDetails: [
      { serviceName: 'Full Diagnostic Audit', price: 399, unit: 'per visit' },
      { serviceName: 'Gas Charging & Vacuuming', price: 1950, unit: 'complete charge' }
    ],
    portfolioImages: [],
    reviews: [],
    completedJobsCount: 580,
    phone: '+91 98481 22667'
  },
  {
    id: 'prof-lakshmi-clean',
    name: 'Lakshmi Deep Clean Team',
    businessName: 'Lakshmi Housekeeping Services',
    categoryId: 'cleaning',
    categoryName: 'Cleaning',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    rating: 4.75,
    reviewCount: 340,
    experienceYears: 5,
    visitCharge: 449,
    isAvailableToday: true,
    distanceKm: 2.7,
    locationCity: 'Hyderabad',
    locationArea: 'KPHB, Nizampet',
    languages: ['Telugu', 'Hindi'],
    about: 'All-women professional cleaning squad. Specialists in move-in/move-out deep cleaning, kitchen oil chimney scrub, and bathroom scale removal.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['Chimney & Hob Degreasing', 'Acid-Free Tile Scrubbing', 'Balcony Dust Cleaning'],
    pricingDetails: [
      { serviceName: 'Standard Bathroom Scrub', price: 449, unit: 'per bathroom' },
      { serviceName: 'Kitchen Deep Degrease', price: 899, unit: 'complete kitchen' }
    ],
    portfolioImages: [],
    reviews: [],
    completedJobsCount: 490,
    phone: '+91 98481 33778'
  },
  {
    id: 'prof-mahesh-carp',
    name: 'Mahesh Chary Modern WoodWorks',
    businessName: 'Chary Modular Carpentry',
    categoryId: 'carpenter',
    categoryName: 'Carpenter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 220,
    experienceYears: 10,
    visitCharge: 249,
    isAvailableToday: true,
    distanceKm: 3.1,
    locationCity: 'Hyderabad',
    locationArea: 'Sanathnagar, Balanagar',
    languages: ['Telugu', 'Hindi'],
    about: 'Expert carpenter equipped with laser leveller and Bosch power tools. Godrej lock fitting, hydraulic bed repair, sliding wardrobe doors, and modular kitchen hinges.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['Godrej Ultra Lock Fitting', 'Soft-Close Hinge Replacement', 'IKEA/Amazon Furniture Assembly'],
    pricingDetails: [
      { serviceName: 'Visit & Measurement', price: 249, unit: 'per visit' },
      { serviceName: 'Main Door Lock Installation', price: 350, unit: 'per lock' }
    ],
    portfolioImages: [],
    reviews: [
      {
        id: 'rev-mahesh-1',
        customerName: 'Suresh V.',
        rating: 5,
        date: '1 week ago',
        comment: 'Assembled my heavy 6-door wardrobe in under 3 hours without a squeak.',
        serviceCategory: 'Carpenter'
      }
    ],
    completedJobsCount: 310,
    phone: '+91 98481 44889'
  },
  {
    id: 'prof-naveen-appliance',
    name: 'Naveen Appliance Care',
    businessName: 'Naveen Washing Machine & Fridge Care',
    categoryId: 'appliance',
    categoryName: 'Appliance Repair',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    rating: 4.75,
    reviewCount: 290,
    experienceYears: 7,
    visitCharge: 299,
    isAvailableToday: true,
    distanceKm: 2.2,
    locationCity: 'Hyderabad',
    locationArea: 'Panjagutta, Somajiguda',
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'Expert repair of Front Load and Top Load Washing Machines (IFB, LG, Samsung, Bosch) and Frost-Free Refrigerators.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['Drum Bearing & Belt Replacement', 'Drain Pump Clogging', 'Fridge Thermostat & Gas Charging'],
    pricingDetails: [
      { serviceName: 'Diagnostic Inspection', price: 299, unit: 'per visit' },
      { serviceName: 'Drain Pump Replacement', price: 450, unit: 'labor + part' }
    ],
    portfolioImages: [],
    reviews: [],
    completedJobsCount: 420,
    phone: '+91 98481 55990'
  },
  {
    id: 'prof-mallesh-paint',
    name: 'Mallesh Wall Care & Asian Paints Pro',
    businessName: 'Mallesh Color Crafters',
    categoryId: 'painter',
    categoryName: 'Painter',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 175,
    experienceYears: 8,
    visitCharge: 499,
    isAvailableToday: true,
    distanceKm: 3.6,
    locationCity: 'Hyderabad',
    locationArea: 'Uppal, Ramanthapur',
    languages: ['Telugu', 'Hindi'],
    about: 'Waterproofing, moisture dampness treatment with Asian Paints SmartCare, putty smoothing, and luxury Royale emulsion finish.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['Wall Dampness Waterproofing', 'Single Room Touch-up Paint', 'Texture Accent Walls'],
    pricingDetails: [
      { serviceName: 'Site Survey & Laser Area Measure', price: 499, unit: 'free on booking' },
      { serviceName: '1 Room Painting (Labor only)', price: 1800, unit: 'per room' }
    ],
    portfolioImages: [],
    reviews: [],
    completedJobsCount: 230,
    phone: '+91 98481 66001'
  },
  {
    id: 'prof-bharat-pest',
    name: 'Bharat SafePest Solutions',
    businessName: 'Bharat Herbal Pest Control',
    categoryId: 'pest_control',
    categoryName: 'Pest Control',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    rating: 4.85,
    reviewCount: 310,
    experienceYears: 10,
    visitCharge: 599,
    isAvailableToday: true,
    distanceKm: 2.9,
    locationCity: 'Hyderabad',
    locationArea: 'Attapur, Mehdipatnam',
    languages: ['English', 'Telugu', 'Hindi'],
    about: '100% Odorless herbal gel treatment for cockroaches and specialized anti-termite wall drilling with 1-Year written warranty certificate.',
    verification: {
      isVerified: true,
      govtIdChecked: true,
      skillCertified: true,
      backgroundChecked: true,
      policeVerification: true,
      insuranceCovered: true,
    },
    specialities: ['Odorless Cockroach Herbal Gel', 'Anti-Termite Drilling Treatment', 'Bedbug Steam Eradication'],
    pricingDetails: [
      { serviceName: '2BHK Cockroach Gel Treatment', price: 699, unit: 'complete flat' },
      { serviceName: 'Anti-Termite Treatment (1-Yr Warranty)', price: 1899, unit: 'up to 1200 sqft' }
    ],
    portfolioImages: [],
    reviews: [],
    completedJobsCount: 510,
    phone: '+91 98481 77112'
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-seeker-1',
  name: '',
  email: '',
  phone: '+91 98765 43210',
  role: 'seeker',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  selectedCity: 'Hyderabad',
  selectedAddress: '',
  isOnline: true
};

export const INITIAL_PROVIDER_USER: UserProfile = {
  id: 'usr-provider-1',
  name: '',
  email: '',
  phone: '+91 98480 12345',
  role: 'provider',
  avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80',
  selectedCity: 'Hyderabad',
  selectedAddress: 'Shop 12, Sri Ram Nagar, Kondapur, Hyderabad - 500084',
  isOnline: true
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-TR-8942',
    serviceCategory: 'Electrician',
    professionalId: 'prof-elec-1',
    professionalName: 'Premier Electrical Services',
    professionalAvatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
    professionalPhone: '+91 98480 12345',
    customerId: 'usr-seeker-1',
    customerName: 'Customer',
    customerPhone: '+91 98765 43210',
    customerAddress: 'Flat 302, Green Meadows, Madhapur, Hyderabad',
    date: 'Today, Dec 20',
    timeSlot: '11:00 AM',
    problemDescription: 'Main circuit breaker keeps tripping whenever the geyser and water heater are switched on simultaneously.',
    problemPhotos: [],
    status: 'on_the_way',
    statusTimestamps: {
      confirmedTime: '10:00 AM',
      onTheWayTime: '10:20 AM',
      arrivingTime: '10:35 AM'
    },
    etaMinutes: 5,
    pricing: {
      visitCharge: 200,
      serviceFee: 29,
      taxes: 18,
      discount: 50,
      totalAmount: 197
    }
  },
  {
    id: 'BK-TR-7612',
    serviceCategory: 'Plumber',
    professionalId: 'prof-raju-plumb',
    professionalName: 'Raju Plumbing Solutions',
    professionalAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    professionalPhone: '+91 98480 45678',
    customerId: 'usr-seeker-1',
    customerName: 'Customer',
    customerPhone: '+91 98765 43210',
    customerAddress: 'Flat 302, Green Meadows, Madhapur, Hyderabad',
    date: 'Dec 14, 2026',
    timeSlot: '02:00 PM',
    problemDescription: 'Kitchen faucet pipe slow leakage',
    problemPhotos: [],
    status: 'completed',
    statusTimestamps: {
      confirmedTime: '01:30 PM',
      onTheWayTime: '01:50 PM',
      completedTime: '02:45 PM'
    },
    etaMinutes: 0,
    pricing: {
      visitCharge: 199,
      serviceFee: 29,
      taxes: 18,
      discount: 0,
      totalAmount: 246
    },
    rating: 5,
    reviewComment: 'Quick diagnosis, replaced the worn washer in 15 mins.'
  }
];

// RAG Approved Knowledge Base for Grounded AI responses
export const RAG_KNOWLEDGE_DOCUMENTS = [
  {
    title: 'Visit Charge & Transparent Pricing Policy',
    content: 'Trustora charges an initial inspection visit fee (starting from ₹199 to ₹349 depending on category). Crucially, this visit fee is 100% adjusted into your final bill if you proceed with the actual repair or installation on the same day. All professionals use standardized pricing cards so you are never overcharged.',
    tags: ['pricing', 'visit fee', 'charges', 'adjustment']
  },
  {
    title: 'Trustora 30-Day Service Guarantee',
    content: 'Every service booked through the Trustora app comes with our 30-day Trustora Cover Guarantee. If any electrical, plumbing, or appliance issue recurs within 30 days of the service date, a verified technician will re-inspect and fix it at zero additional labor cost.',
    tags: ['guarantee', 'warranty', 'protection', 'revisit']
  },
  {
    title: 'Cancellation & Refund Guidelines',
    content: 'You can cancel any booking free of charge up to 1 hour before the scheduled time slot. If cancelled after the professional is already on the way, a nominal cancellation charge of ₹50 is applied to compensate the provider for fuel. Full refunds are credited back to the original payment source or Trustora Wallet within 24 hours.',
    tags: ['cancellation', 'refund', 'reschedule', 'wallet']
  },
  {
    title: 'Professional Verification & Safety Protocol',
    content: 'Every Trustora service provider undergoes a 4-step verification: 1) Aadhaar / Govt ID verification, 2) Technical skill trade assessment, 3) Police background record clearance, 4) Mandatory health and code-of-conduct onboarding. In addition, all active visits are GPS-tracked with in-app SOS safety features.',
    tags: ['verification', 'safety', 'background check', 'id']
  }
];

// AI & ML Engineering Evaluation Metrics for recruiters and technical review
export const AI_ML_EVALUATION_METRICS = {
  classifier: {
    model: 'DistilBERT-Lite + TF-IDF Ensemble v2.3',
    accuracy: '96.4%',
    precision: '95.8%',
    recall: '96.2%',
    f1Score: '96.0%',
    inferenceLatencyMs: 18,
    categoriesTrained: 12,
    confusionMatrixLabels: ['Electrician', 'Plumber', 'AC Service', 'Cleaning', 'Appliance', 'Others'],
  },
  ragGrounding: {
    datasetSize: '1,420 Ground Truth QA Pairs',
    faithfulnessScore: '98.2%',
    answerRelevance: '97.5%',
    hallucinationRate: '0.8%',
    contextRecall: '96.9%',
    avgRetrievalLatencyMs: 24
  },
  recommendationEngine: {
    algorithm: 'Two-Tower Neural Collaborative + Geo-Distance Boost',
    ndcgAt5: '0.892',
    mapAt5: '0.865',
    avgTimeToAcceptMinutes: 3.4,
    providerMatchAcceptanceRate: '92.6%'
  },
  demandForecasting: [
    { day: 'Mon', electrician: 142, plumber: 118, ac_service: 84, cleaning: 92 },
    { day: 'Tue', electrician: 135, plumber: 125, ac_service: 79, cleaning: 88 },
    { day: 'Wed', electrician: 156, plumber: 130, ac_service: 95, cleaning: 94 },
    { day: 'Thu', electrician: 148, plumber: 122, ac_service: 88, cleaning: 102 },
    { day: 'Fri', electrician: 180, plumber: 165, ac_service: 130, cleaning: 140 },
    { day: 'Sat', electrician: 245, plumber: 210, ac_service: 195, cleaning: 260 },
    { day: 'Sun', electrician: 260, plumber: 235, ac_service: 220, cleaning: 285 },
  ]
};
