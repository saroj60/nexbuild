// ============================================================
// ADMIN CONFIGURATION — Change the password before going live!
// ============================================================
export const ADMIN_CONFIG = {
  password: 'nexbuild@@2026',
  username: 'nexbuild44@gmail.com',
};

// ============================================================
// company CONFIGURATION — Replace these values easily
// ============================================================
export const COMPANY = {
  name: 'Nexbuild Architects',
  legalName: 'Nexbuild Architects And Construction Pvt. Ltd.',
  tagline: 'Designing Spaces. Building Futures.',
  description: 'Nexbuild Architects And Construction Pvt. Ltd. is a Nepal-based engineering and construction company. The company delivers building construction, infrastructure development, land development, and technical consulting services for public and private sector clients. Operating from its registered head office in Kathmandu, Nexbuild maintains professional coordination with affiliated entities in Chitwan and Pokhara for the execution of regional projects.',
  mission: 'To provide reliable, high-quality engineering and construction services that meet client specifications, comply with regulatory standards, and promote sustainable development.',
  vision: 'To be recognized as the leading engineering and construction firm in Nepal, delivering projects that exemplify technical excellence and integrity.',
  coreCompetencies: [
    'Design-Build execution for residential, commercial, and infrastructure projects',
    'Structural design, civil works, and architectural coordination',
    'Land development, site planning, and drainage network implementation',
    'Project management, scheduling, and cost control',
    'Technical consulting and feasibility studies',
  ],
  regionalOffices: 'Head Office: Kathmandu | Affiliated Operations: Chitwan & Pokhara',
  phone: '+977 9843604439',
  email: 'nexbuild44@gmail.com',
  whatsapp: '9843604439',
  contactPerson: 'Nexbuild Team',
  address: 'Babarmahal, Rajesh Marg, Kathmandu, Nepal',
  registeredOffice: 'Babarmahal, Rajesh Marg, Kathmandu, Nepal',
  companyRegNo: '391105/82/83',
  vatNo: '623604209',
  addressShort: 'Kathmandu, Nepal (Operations in Chitwan & Pokhara)',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.99!2d85.328!3d27.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199658b1f5c3%3A0xe54e66601b0f5b33!2sRosebud%20School!5e0!3m2!1sen!2snp!4v1724000000000!5m2!1sen!2snp',
  businessHours: {
    weekdays: 'Sunday – Friday: 8:00 AM – 6:00 PM',
    saturday: 'Saturday: 9:00 AM – 3:00 PM',
    closed: 'Closed on Public Holidays',
  },
  social: {
    facebook: 'https://www.facebook.com/people/Nexbuild-Architects-Pvtltd/61591192785814/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    linkedin: 'https://linkedin.com/',
  },
  stats: {
    projectsCompleted: '150+',
    yearsExperience: '3+',
    happyClients: '120+',
    professionals: '25+',
  },
  foundedYear: 2023,
  license: 'Nepal Engineers Association (NEA) Member',
  heroBgImage: "/hero-home-construction.jpg",
  heroImages: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=1920&q=80"
  ]
};

// ============================================================
// services DATA
// ============================================================
export const SERVICES = [
  {
    id: 'residential-construction',
    title: 'Residential Construction',
    shortDesc:
      'From cozy family homes to luxury villas, we build residences that stand the test of time using quality materials and expert craftsmanship.',
    fullDesc:
      'We specialize in constructing a wide range of residential properties across Kathmandu and surrounding areas — bungalows, multi-storey homes, villas, and row houses. Our team ensures earthquake-resistant RCC construction following Nepal National Building Code (NBC) standards.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    features: ['NBC Compliant', 'Earthquake Resistant', 'Custom Designs', 'Quality Materials'],
  },
  {
    id: 'commercial-construction',
    title: 'Commercial Construction',
    shortDesc:
      'We build commercial spaces that inspire productivity — offices, retail centers, hotels, banks, and mixed-use developments.',
    fullDesc:
      'Our commercial construction expertise spans office buildings, shopping complexes, hotels, resorts, and institutional buildings across Kathmandu and Bagmati Province. We handle projects from foundation to finishing with professional project management.',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    features: ['Large-Scale Projects', 'Professional PM', 'MEP Integration', 'Modern Design'],
  },
  {
    id: 'building-design-planning',
    title: 'Building Design & Planning',
    shortDesc:
      'Our in-house architects and engineers create functional, beautiful designs tailored to your vision, budget, and the Kathmandu landscape.',
    fullDesc:
      'We provide comprehensive architectural and structural design services including 2D floor plans, 3D visualization, structural drawings, and permit-ready documentation for submission to Kathmandu Metropolitan City Office.',
    icon: 'PenTool',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    features: ['3D Visualization', 'Structural Design', 'Permit Documentation', 'Site Analysis'],
  },
  {
    id: 'renovation-remodeling',
    title: 'Renovation & Remodeling',
    shortDesc:
      'Transform your existing space with our expert renovation services — modernize, expand, or restore your property to its full potential.',
    fullDesc:
      'We handle complete and partial renovation projects for homes, offices, and commercial buildings in Kathmandu. Whether you need a kitchen remodel, bathroom upgrade, façade makeover, or full interior renovation, our team delivers quality results.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
    features: ['Full Renovation', 'Partial Remodel', 'Façade Works', 'Interior Upgrade'],
  },
  {
    id: 'structural-construction',
    title: 'Structural Construction',
    shortDesc:
      'Expert RCC framework, pile foundation, retaining walls, and structural reinforcement for safe and durable buildings.',
    fullDesc:
      'Our structural construction services are carried out by licensed civil engineers with deep expertise in earthquake-prone regions. We use M20–M40 grade concrete, Fe500 TMT bars, and modern formwork systems to ensure structural integrity.',
    icon: 'Columns',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    features: ['RCC Framework', 'Deep Foundation', 'Retaining Walls', 'Seismic Design'],
  },
  {
    id: 'interior-exterior-works',
    title: 'Interior & Exterior Works',
    shortDesc:
      'Finish your space to perfection with our interior and exterior finishing services — flooring, plastering, painting, tiles, and cladding.',
    fullDesc:
      'We provide complete interior and exterior finishing works including marble and granite flooring, gypsum ceiling, modular kitchen, paint finishing, exterior cladding, facade works, landscaping, and compound wall construction.',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    features: ['Luxury Flooring', 'Gypsum Ceiling', 'Paint & Texture', 'Exterior Cladding'],
  },
  {
    id: 'construction-consultancy',
    title: 'Construction Consultancy',
    shortDesc:
      'Get expert advice on construction planning, material selection, cost optimization, and regulatory compliance in Nepal.',
    fullDesc:
      'Our licensed engineers and architects offer professional consultancy services for individuals, businesses, and government bodies. We provide DPR preparation, structural audits, NBC compliance checks, and construction supervision services.',
    icon: 'ClipboardList',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    features: ['DPR Preparation', 'Structural Audit', 'NBC Compliance', 'Cost Advisory'],
  },
  {
    id: 'project-management',
    title: 'Project Management',
    shortDesc:
      'End-to-end project management ensuring your construction is delivered on time, within budget, and to the highest standards.',
    fullDesc:
      'From permit acquisition to project closeout, our project managers coordinate every aspect of construction — scheduling, procurement, quality control, safety management, and stakeholder communication — so your project runs smoothly.',
    icon: 'BarChart2',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    features: ['Scheduling', 'Budget Control', 'Quality Assurance', 'Safety Management'],
  },
];

// ============================================================
// DEFAULT PROJECTS DATA (used as seed — admin can add more)
// ============================================================
export const DEFAULT_PROJECTS = [
  {
    id: 'lakeside-luxury-villa',
    title: 'Babarmahal Luxury Villa',
    location: 'Babarmahal, Kathmandu',
    category: 'Residential',
    status: 'Completed',
    year: 2023,
    client: 'Private Client',
    area: '4,200 sq. ft.',
    duration: '18 months',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
    ],
    description: 'A stunning 4-bedroom luxury villa overlooking Kathmandu Valley. This project showcases our ability to blend modern architecture with the natural beauty of Kathmandu, featuring panoramic lake views, premium Italian marble flooring, and a rooftop infinity pool.',
    highlights: [
      'Panoramic Kathmandu Valley views from all major rooms',
      'Infinity pool and rooftop terrace',
      'Premium Italian marble and granite finishes',
      'Smart home automation system',
      'Earthquake-resistant RCC frame structure',
    ],
    specifications: {
      'Built-up Area': '4,200 sq. ft.',
      Structure: 'RCC Frame, G+3',
      Bedrooms: '4 BHK + 1 Guest Room',
      Completion: 'June 2023',
    },
    featured: true,
  },
  {
    id: 'kathmandu-business-center',
    title: 'Kathmandu Business Center',
    location: 'Baneshwor, Kathmandu',
    category: 'Commercial',
    status: 'Completed',
    year: 2022,
    client: 'ABC Holdings Pvt. Ltd.',
    area: '18,500 sq. ft.',
    duration: '24 months',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    ],
    description: 'A modern 6-storey commercial complex in the heart of Kathmandu city, housing offices, retail spaces, and a food court.',
    highlights: [
      'Grade A office space with central air conditioning',
      'High-speed passenger elevators',
      '100 KVA backup generator system',
    ],
    specifications: {
      'Built-up Area': '18,500 sq. ft.',
      Floors: 'G+5 (6 Storeys)',
      Completion: 'March 2022',
    },
    featured: true,
  },
  {
    id: 'himalaya-resort-hotel',
    title: 'Himalaya View Resort & Hotel',
    location: 'Budhanilkantha, Kathmandu',
    category: 'Commercial',
    status: 'Completed',
    year: 2023,
    client: 'Himalayan Hospitality Group',
    area: '22,000 sq. ft.',
    duration: '30 months',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
    ],
    description: 'A boutique resort hotel on Budhanilkantha with breathtaking Himalaya and Kathmandu Valley views. The 28-room property features a restaurant, spa, infinity pool, and conference facilities.',
    highlights: [
      'Panoramic Himalayan views',
      '28 deluxe rooms and suites',
      'Infinity pool overlooking Kathmandu Valley',
    ],
    specifications: {
      'Built-up Area': '22,000 sq. ft.',
      Floors: 'G+4',
      Rooms: '28 deluxe rooms & suites',
      Completion: 'November 2023',
    },
    featured: true,
  },
  {
    id: 'machhapuchhre-hotel-renovation',
    title: 'Himalayas Hotel Renovation',
    location: 'Babarmahal-6, Kathmandu',
    category: 'Renovation',
    status: 'Completed',
    year: 2024,
    client: 'Himalayas Hotel Group',
    area: '8,200 sq. ft.',
    duration: '8 months',
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1621293954908-907159247fc8?w=1200&q=80'],
    description: 'Complete interior and exterior renovation of a 30-room hotel in Babarmahal, transforming a dated property into a modern boutique hotel.',
    highlights: ['Complete interior and exterior overhaul', 'New MEP systems', '30 rooms redesigned'],
    specifications: { 'Renovated Area': '8,200 sq. ft.', Rooms: '30', Completion: 'September 2024' },
    featured: false,
  },
  {
    id: 'gandaki-tech-park',
    title: 'Bagmati IT Park Office Tower',
    location: 'New Road, Kathmandu',
    category: 'Commercial',
    status: 'Ongoing',
    year: 2025,
    client: 'Bagmati Province Government',
    area: '35,000 sq. ft.',
    duration: '36 months',
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&q=80'],
    description: 'A landmark 10-storey IT and commercial tower commissioned by Bagmati Province, currently under construction.',
    highlights: ['10-storey landmark commercial tower', 'Dedicated IT company floors', 'Underground parking for 120 vehicles'],
    specifications: { 'Built-up Area': '35,000 sq. ft.', Floors: 'G+9', 'Expected Completion': 'December 2026', Status: '45% Complete' },
    featured: true,
  },
];

// ============================================================
// testimonials DATA
// ============================================================
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ramesh Shrestha',
    designation: 'Homeowner',
    location: 'Babarmahal, Kathmandu',
    rating: 5,
    text: 'Nexbuild Architects built our dream home exceeding every expectation. Their team was professional, transparent with costs, and completed the project on time. The quality of materials and workmanship is outstanding.',
    avatar: 'RS',
  },
  {
    id: 2,
    name: 'Sunita Gurung',
    designation: 'Managing Director',
    location: 'ABC Holdings Pvt. Ltd., Kathmandu',
    rating: 5,
    text: 'We hired Nexbuild Architects for our commercial complex at Baneshwor. They handled the entire project with remarkable efficiency. Their project management is top-class.',
    avatar: 'SG',
  },
  {
    id: 3,
    name: 'Bishnu Paudel',
    designation: 'Hotel Owner',
    location: 'Budhanilkantha, Kathmandu',
    rating: 5,
    text: 'The team at Nexbuild Architects transformed our resort vision into reality. Their attention to detail in the finishing work is exceptional.',
    avatar: 'BP',
  },
  {
    id: 4,
    name: 'Dr. Anita Karki',
    designation: 'Homeowner',
    location: 'Baluwatar, Kathmandu',
    rating: 5,
    text: 'From our first consultation to handover, Nexbuild Architects was communicative, honest, and skilled. Our bungalow is beautifully built with high-quality materials.',
    avatar: 'AK',
  },
  {
    id: 5,
    name: 'Narayan Thapa',
    designation: 'School Principal',
    location: 'Lalitpur, Kathmandu',
    rating: 5,
    text: 'Nexbuild Architects handled our school expansion project professionally. The earthquake-resistant construction gave us confidence in our students\' safety.',
    avatar: 'NT',
  },
];

// ============================================================
// TEAM DATA
// ============================================================
export const TEAM = [
  { id: 1, name: 'Er. Nexbuild Engineer', designation: 'Chief Executive Officer & Managing Director', qualification: 'B.E. Civil Engineering, NEA Member', experience: '20+ years', avatar: 'CE', color: '#1e40af' },
  { id: 2, name: 'Ar. Nexbuild Architect', designation: 'Chief Architect & Design Director', qualification: 'B.Arch, SONA Member', experience: '15+ years', avatar: 'AD', color: '#f97316' },
  { id: 3, name: 'Er. Nexbuild Engineer', designation: 'Head of Structural Engineering', qualification: 'M.E. Structural Engineering, NEA Member', experience: '12+ years', avatar: 'SE', color: '#1e40af' },
  { id: 4, name: 'Er. Ramesh Thapa', designation: 'Project Manager', qualification: 'B.E. Civil Engineering, PMP Certified', experience: '10+ years', avatar: 'PM', color: '#f97316' },
];

// ============================================================
// PROCESS STEPS
// ============================================================
export const PROCESS_STEPS = [
  { step: '01', title: 'Initial Consultation', description: 'We begin with a free consultation to understand your vision, requirements, budget, and timeline.', icon: 'MessageSquare', color: '#1e40af' },
  { step: '02', title: 'Site Visit & Survey', description: 'Our engineers visit the site for a thorough assessment — soil testing, topography, access evaluation, and local regulation review.', icon: 'MapPin', color: '#f97316' },
  { step: '03', title: 'Design & Planning', description: 'Our architects create detailed architectural and structural drawings, 3D visualizations, and permit-ready documents.', icon: 'PenTool', color: '#1e40af' },
  { step: '04', title: 'Cost Estimation', description: 'We provide a detailed, itemized Bill of Quantities (BOQ) with transparent pricing. No hidden costs.', icon: 'Calculator', color: '#f97316' },
  { step: '05', title: 'Construction', description: 'Our experienced construction team executes the project with strict quality control, daily progress tracking, and regular client updates.', icon: 'HardHat', color: '#1e40af' },
  { step: '06', title: 'Handover & Support', description: 'After final inspection and snag resolution, we hand over your completed property with full documentation and warranties.', icon: 'Key', color: '#f97316' },
];

// ============================================================
// DEFAULT CONSTRUCTION PROCESS VIDEO
// ============================================================
export const DEFAULT_PROCESS_VIDEO = {
  title: 'See How We Build in Kathmandu',
  subtitle: 'From foundation excavation and RCC framing to luxury interior finishing',
  youtubeUrl: 'https://www.youtube.com/watch?v=wnuiJNXbfYM',
  thumbnail: 'https://img.youtube.com/vi/wnuiJNXbfYM/hqdefault.jpg',
  badge: 'Live On-Site Process'
};

// ============================================================
// WHY CHOOSE US
// ============================================================
export const WHY_CHOOSE_US = [
  { icon: 'Shield', title: 'Quality Materials', description: 'We source only certified materials from trusted suppliers — Shree Cement, Hulas Steel, ACC tiles, and other top brands available in Nepal.' },
  { icon: 'Users', title: 'Experienced Professionals', description: 'Our team of 80+ includes licensed civil engineers, architects, site supervisors, and skilled tradespeople with decades of combined experience.' },
  { icon: 'DollarSign', title: 'Transparent Pricing', description: 'No hidden costs. We provide detailed BOQ with fixed pricing agreements. What we quote is what you pay.' },
  { icon: 'Clock', title: 'Timely Completion', description: 'We maintain strict project schedules with milestone-based tracking. 95% of our projects have been delivered on time or ahead of schedule.' },
  { icon: 'Eye', title: 'Professional Supervision', description: 'Every project has a dedicated site engineer and project manager providing daily oversight.' },
  { icon: 'HardHat', title: 'Safety First', description: 'Worker safety and site safety are non-negotiable. We follow Nepal\'s labor safety guidelines.' },
  { icon: 'Star', title: 'Attention to Detail', description: 'From structural foundations to finishing touches, our obsession with detail shows in every corner of every project.' },
  { icon: 'Heart', title: 'Client Satisfaction', description: 'We measure success by client satisfaction. Our 200+ happy clients and strong referral rate speak to our commitment.' },
];

// ============================================================
// DEFAULT VLOGS / BLOGS DATA (seed data for the Vlog page)
// ============================================================
export const DEFAULT_VLOGS = [
  {
    id: 'earthquake-resistant-construction-nepal',
    title: 'How to Build Earthquake-Resistant Homes in Nepal',
    description: 'A deep dive into structural standards, seismic zones, and soil tests required for building safe homes in Kathmandu and Bagmati province.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    date: 'August 10, 2026',
    author: 'Er. Nexbuild Team',
    category: 'Engineering',
    content: 'Building an earthquake-resistant house in Nepal is not just a preference; it is a vital safety requirement in a region prone to seismic activities. Following the Nepal National Building Code (NBC) standards ensures structural stability under high tension. Key factors include executing proper soil testing, building load-bearing columns (minimum 12" x 12" sizes), and selecting high-grade steel rebars. In this video vlog, we walk you through a live construction site in Kathmandu to demonstrate foundation reinforcement, plinth beam setups, and structural casting rules.',
  },
  {
    id: 'modern-house-design-trends-kathmandu',
    title: 'Modern Residential Architecture Trends in Kathmandu',
    description: 'Explore the shifting design aesthetics in Kathmandu, merging traditional Nepali elements with modern open-concept spaces and eco-friendly features.',
    videoUrl: '', // No video, text-only blog/vlog
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    date: 'July 28, 2026',
    author: 'Nexbuild Architect',
    category: 'Architecture',
    content: 'Residential architecture in Kathmandu has transformed significantly over the last decade. Homeowners are increasingly choosing open floor plans, larger glass windows that frame the beautiful Himalayan range, and smart home automation systems. We look at popular materials like local stone cladding, composite wood panels, and double-glazed windows that help keep structures cool during summers and warm in winter.',
  }
];

// ============================================================
// DEFAULT HOUSE DESIGNS
// ============================================================
export const DEFAULT_HOUSE_DESIGNS = [
  {
    id: "modern-3-storey-villa",
    title: "Modern 3-Storey Villa",
    area: "3,200 sq. ft.",
    bedrooms: 5,
    bathrooms: 4,
    floors: 3,
    dimensions: "30' x 45'",
    style: "Modern",
    price: "18000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80"
    ],
    description: "A gorgeous 3-storey villa designed for urban living. The design features open floor plans, a private terrace, extensive glass walls maximizing natural light, and an integrated garage. Excellent for modern families seeking a balance of luxury and efficiency.",
    features: [
      "Open-concept living and dining area",
      "Spacious master bedroom with walk-in closet",
      "Separate home theater / lounge room",
      "Modern rooftop terrace with BBQ space",
      "Single-car garage and front lawn area"
    ]
  },
  {
    id: "contemporary-minimalist-home",
    title: "Contemporary Minimalist Home",
    area: "2,600 sq. ft.",
    bedrooms: 4,
    bathrooms: 3,
    floors: 2.5,
    dimensions: "35' x 40'",
    style: "Minimalist",
    price: "15000",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"
    ],
    description: "Emphasizing clean lines, functional spaces, and raw material finishes, this contemporary minimalist home is perfect for modern families. Includes a double-height ceiling in the main living space and solar panel integration.",
    features: [
      "Double-height living room ceiling",
      "Energy-efficient passive solar layout",
      "Polished concrete floor finishes",
      "Minimalist kitchen with island counter",
      "Rooftop laundry and storage room"
    ]
  },
  {
    id: "traditional-nepalese-fusion-residence",
    title: "Traditional Nepalese Fusion Residence",
    area: "2,800 sq. ft.",
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    dimensions: "40' x 40'",
    style: "Fusion",
    price: "22000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80"
    ],
    description: "Designed for comfort and cultural heritage, this fusion home blends traditional Nepalese brickwork and wood carvings with contemporary seismic RCC structural frame standards. Beautiful wooden balconies wrap the front facade.",
    features: [
      "Traditional red-brick exterior cladding",
      "Custom hand-carved wooden columns",
      "Wraparound front wooden balconies",
      "Spacious prayer / meditation room",
      "Earthquake resistant RCC framework"
    ]
  }
];

