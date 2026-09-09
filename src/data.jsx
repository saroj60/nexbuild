// ============================================================
// ADMIN CONFIGURATION — Change the password before going live!
// ============================================================
export const ADMIN_CONFIG = {
  password: 'nexbuild@@2026',
  username: 'nexbuild@gmail.com',
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
    projectsCompleted: '15+',
    yearsExperience: '6+',
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
    image: '/projects/raniban-1.png',
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
    image: '/projects/maitidevi-1.png',
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
    image: '/projects/chitwan-1.png',
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
    image: '/projects/nayabazar-1.png',
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
    image: '/projects/radhe-radhe-3.png',
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
    image: '/projects/budhanilkantha-2.png',
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
    image: '/projects/tinchuli-2.png',
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
    image: '/projects/dhapakhel-2.png',
    features: ['Scheduling', 'Budget Control', 'Quality Assurance', 'Safety Management'],
  },
];

// ============================================================
// DEFAULT PROJECTS DATA (Real Ongoing & Completed Projects)
// ============================================================
export const DEFAULT_PROJECTS = [
  // ── ONGOING PROJECTS ─────────────────────────────────────
  {
    id: 'maitidevi-commercial-building',
    title: 'Maitidevi Commercial Building',
    location: 'Maitidevi, Kathmandu (~100m from Seto Pul)',
    category: 'Commercial',
    status: 'Ongoing',
    year: 2026,
    client: 'Private Commercial Client',
    area: '16,500 sq. ft.',
    contractValue: 'NPR 13 Crore',
    duration: '24 months',
    image: '/projects/maitidevi-1.png',
    gallery: [
      '/projects/maitidevi-1.png',
      '/projects/maitidevi-2.png',
      '/projects/maitidevi-3.png',
      '/projects/maitidevi-4.png',
      '/projects/maitidevi-5.png'
    ],
    description: 'Construction of a multi-storey commercial building at Maitidevi, located approximately 100 meters from Seto Pul. The project features one basement level and a robust reinforced-concrete (RCC) structural frame system.',
    highlights: [
      'Contract Value: NPR 13 Crore',
      'One basement level for dedicated parking & utility',
      'Reinforced-concrete (RCC) structural frame system',
      'Located 100m from Seto Pul, Maitidevi'
    ],
    specifications: {
      'Contract Value': 'NPR 13 Crore',
      'Basement Levels': '1 Basement',
      Structure: 'Reinforced Concrete (RCC) Frame',
      Status: 'Ongoing Construction'
    },
    featured: true,
  },
  {
    id: 'radhe-radhe-commercial-building',
    title: 'Radhe Radhe Commercial Building',
    location: 'Radhe Radhe Chowk, Bhaktapur (Near Bhatbhateni)',
    category: 'Commercial',
    status: 'Ongoing',
    year: 2026,
    client: 'Commercial Complex Client',
    area: '24,000 sq. ft.',
    contractValue: 'NPR 16 Crore',
    duration: '28 months',
    image: '/projects/radhe-radhe-1.png',
    gallery: [
      '/projects/radhe-radhe-1.png',
      '/projects/radhe-radhe-2.png',
      '/projects/radhe-radhe-3.png',
      '/projects/radhe-radhe-4.png'
    ],
    description: 'A major commercial complex situated at Radhe Radhe Chowk, Bhaktapur near Bhatbhateni. Features two basement levels and mezzanine flooring, requiring deep excavation and specialized structural engineering coordination.',
    highlights: [
      'Contract Value: NPR 16 Crore',
      'Two basement levels for underground parking',
      'Mezzanine flooring & high-capacity structural design',
      'Deep excavation & RCC structural engineering'
    ],
    specifications: {
      'Contract Value': 'NPR 16 Crore',
      'Basement Levels': '2 Basements + Mezzanine',
      Location: 'Near Bhatbhateni, Radhe Radhe Chowk',
      Status: 'Ongoing Construction'
    },
    featured: true,
  },
  {
    id: 'dhapakhel-residence-phase-1-2',
    title: 'Dhapakhel Residence — Phase 1 & 2',
    location: 'Dhapakhel, Kathmandu Valley',
    category: 'Residential',
    status: 'Ongoing',
    year: 2026,
    client: 'Private Homeowners',
    area: '6,800 sq. ft.',
    duration: '18 months',
    image: '/projects/dhapakhel-1.png',
    gallery: [
      '/projects/dhapakhel-1.png',
      '/projects/dhapakhel-2.png',
      '/projects/dhapakhel-3.png'
    ],
    description: 'Multi-phase residential building construction project located in Dhapakhel, Kathmandu Valley. Currently carrying out structural frame casting and initial finishing works across Phase 1 & 2.',
    highlights: [
      'Multi-phase residential development (Phase 1 & 2)',
      'Seismic-resistant RCC structural design',
      'Modern open-concept architectural floor plan'
    ],
    specifications: {
      Phases: 'Phase 1 & Phase 2',
      Type: 'Residential Building',
      Status: 'Ongoing Construction'
    },
    featured: true,
  },
  {
    id: 'lolang-residence-phase-1-2-3',
    title: 'Lolang Residence — Phase 1, 2 & 3',
    location: 'Lolang, Kathmandu Valley',
    category: 'Residential',
    status: 'Ongoing',
    year: 2026,
    client: 'Residential Community Clients',
    area: '9,500 sq. ft.',
    duration: '24 months',
    image: '/projects/lolang-1.png',
    gallery: [
      '/projects/lolang-1.png',
      '/projects/lolang-2.png',
      '/projects/lolang-3.png',
      '/projects/lolang-4.png',
      '/projects/lolang-5.png'
    ],
    description: 'Comprehensive residential building construction spanning three distinct phases (Phase 1, Phase 2, & Phase 3) in Lolang, Kathmandu Valley.',
    highlights: [
      '3-Phase comprehensive residential construction',
      'Quality RCC foundation & structural framing',
      'Custom interior and layout options'
    ],
    specifications: {
      Phases: 'Phase 1, 2 & 3',
      Type: 'Residential Building Project',
      Status: 'Ongoing Construction'
    },
    featured: false,
  },
  {
    id: 'budhanilkantha-residence',
    title: 'Budhanilkantha Residence',
    location: 'Budhanilkantha, Kathmandu Valley',
    category: 'Residential',
    status: 'Ongoing',
    year: 2026,
    client: 'Private Client',
    area: '4,500 sq. ft.',
    duration: '16 months',
    image: '/projects/budhanilkantha-1.png',
    gallery: [
      '/projects/budhanilkantha-1.png',
      '/projects/budhanilkantha-2.png',
      '/projects/budhanilkantha-3.png',
      '/projects/budhanilkantha-4.png'
    ],
    description: 'Premium modern residential building construction in the serene foothills of Budhanilkantha, featuring elegant architectural elevation and earthquake-resistant structural engineering.',
    highlights: [
      'High-end residential building construction',
      'Panoramic Kathmandu Valley orientation',
      'NBC 105:2020 earthquake-resistant design'
    ],
    specifications: {
      Location: 'Budhanilkantha, Kathmandu',
      Type: 'Residential Villa',
      Status: 'Ongoing Construction'
    },
    featured: true,
  },
  {
    id: 'nayabazar-semi-commercial-building',
    title: 'Nayabazar Semi-Commercial Building',
    location: 'Nayabazar, Kathmandu Valley',
    category: 'Mixed-use',
    status: 'Ongoing',
    year: 2026,
    client: 'Commercial & Private Developer',
    area: '7,200 sq. ft.',
    duration: '18 months',
    image: '/projects/nayabazar-1.png',
    gallery: [
      '/projects/nayabazar-1.png',
      '/projects/nayabazar-2.png',
      '/projects/nayabazar-3.png'
    ],
    description: 'Mixed-use semi-commercial building construction in Nayabazar, combining ground-floor retail/office spaces with upper residential apartments.',
    highlights: [
      'Mixed-use semi-commercial layout',
      'Ground floor commercial retail & office space',
      'Seismic RCC frame construction'
    ],
    specifications: {
      Category: 'Mixed-use / Semi-commercial',
      Location: 'Nayabazar, Kathmandu',
      Status: 'Ongoing Construction'
    },
    featured: false,
  },
  {
    id: 'jorpati-semi-commercial-building',
    title: 'Jorpati Semi-Commercial Building',
    location: 'Jorpati, Kathmandu Valley',
    category: 'Mixed-use',
    status: 'Ongoing',
    year: 2026,
    client: 'Local Business Client',
    area: '8,000 sq. ft.',
    duration: '18 months',
    image: '/projects/jorpati-1.png',
    gallery: [
      '/projects/jorpati-1.png',
      '/projects/jorpati-2.png',
      '/projects/jorpati-3.png',
      '/projects/jorpati-4.png'
    ],
    description: 'Ongoing mixed-use semi-commercial building project in Jorpati, featuring ground floor commercial shutters and upper-level apartments.',
    highlights: [
      'Mixed-use semi-commercial project',
      'Commercial ground floor + residential floors',
      'RCC frame & quality brickwork'
    ],
    specifications: {
      Category: 'Mixed-use / Semi-commercial',
      Location: 'Jorpati, Kathmandu',
      Status: 'Ongoing Construction'
    },
    featured: false,
  },
  {
    id: 'kalanki-residence',
    title: 'Kalanki Residence',
    location: 'Kalanki, Kathmandu Valley',
    category: 'Residential',
    status: 'Ongoing',
    year: 2026,
    client: 'Private Client',
    area: '3,800 sq. ft.',
    duration: '14 months',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'],
    description: 'Contemporary multi-storey residential building under construction at Kalanki, Kathmandu Valley.',
    highlights: [
      'Modern residential family home',
      'Earthquake-resistant RCC construction',
      'Custom floor planning & site supervision'
    ],
    specifications: {
      Location: 'Kalanki, Kathmandu',
      Type: 'Residential Home',
      Status: 'Ongoing Construction'
    },
    featured: false,
  },

  // ── COMPLETED PROJECTS ───────────────────────────────────
  {
    id: 'chitwan-residence',
    title: 'Chitwan Residence',
    location: 'Bharatpur, Chitwan, Nepal',
    category: 'Residential',
    status: 'Completed',
    year: 2025,
    client: 'Private Residence Client',
    area: '5,200 sq. ft.',
    duration: '18 months',
    image: '/projects/chitwan-1.png',
    gallery: [
      '/projects/chitwan-1.png',
      '/projects/chitwan-2.png',
      '/projects/chitwan-3.png',
      '/projects/chitwan-4.png',
      '/projects/chitwan-5.png'
    ],
    description: 'Luxury neo-classical private villa constructed in Chitwan through Nexbuild’s regional coordination branch. Features grand double-height entrance columns, classical arches, custom wooden carved doors, and high-end exterior finishing.',
    highlights: [
      'Grand neo-classical architectural elevation & pillars',
      'Custom hand-carved wooden main door & classical mouldings',
      'Seismic RCC frame design following NBC standards',
      'Executed under Nexbuild Chitwan regional operations'
    ],
    specifications: {
      Location: 'Bharatpur, Chitwan, Nepal',
      Type: 'Neo-Classical Luxury Villa',
      Status: 'Completed',
      Structure: 'Seismic RCC Frame'
    },
    featured: true,
  },
  {
    id: 'tinchuli-commercial-building',
    title: 'Tinchuli Commercial Building',
    location: 'Tinchuli, Kathmandu',
    category: 'Commercial',
    status: 'Completed',
    year: 2025,
    client: 'Commercial Property Owner',
    area: '14,000 sq. ft.',
    duration: '20 months',
    image: '/projects/tinchuli-1.png',
    gallery: [
      '/projects/tinchuli-1.png',
      '/projects/tinchuli-2.png',
      '/projects/tinchuli-3.png',
      '/projects/tinchuli-4.png',
      '/projects/tinchuli-5.png'
    ],
    description: 'Reinforced-concrete (RCC) commercial structure located in Tinchuli, Kathmandu, featuring full basement parking facilities and modern commercial spaces.',
    highlights: [
      'Reinforced-concrete commercial structure',
      'Underground basement parking & utility',
      'Completed on schedule with NBC compliance'
    ],
    specifications: {
      Structure: 'RCC Frame with Basement',
      Category: 'Commercial Complex',
      Completion: '2025'
    },
    featured: true,
  },
  {
    id: 'naikap-residential-building',
    title: 'Naikap Residential Building',
    location: 'Naikap, Kathmandu Valley',
    category: 'Residential',
    status: 'Completed',
    year: 2024,
    client: 'Private Client',
    area: '4,200 sq. ft.',
    duration: '14 months',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80'],
    description: 'Multi-story residential building construction in Naikap featuring modern architectural design, spacious interiors, and seismic RCC structural framing.',
    highlights: [
      'Multi-story residential construction',
      'Modern architectural elevation & interiors',
      'Fully handed over to satisfied homeowner'
    ],
    specifications: {
      Location: 'Naikap, Kathmandu',
      Type: 'Residential Residence',
      Completion: '2024'
    },
    featured: false,
  },
  {
    id: 'temple-suits-hotel-thamel',
    title: 'Temple Suits Hotel, Thamel',
    location: 'Thamel, Kathmandu',
    category: 'Hospitality',
    status: 'Completed',
    year: 2024,
    client: 'Temple Hospitality Group',
    area: '12,500 sq. ft.',
    duration: '22 months',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'],
    description: 'A 3-star hospitality hotel project located in prime Thamel, Kathmandu, featuring luxury guest suites, welcoming reception lobby, and dining facilities.',
    highlights: [
      '3-Star hospitality hotel suites & facilities',
      'Prime tourist hub location in Thamel',
      'Complete structural and interior fit-out'
    ],
    specifications: {
      Category: 'Hospitality / 3-Star Hotel',
      Location: 'Thamel, Kathmandu',
      Completion: '2024'
    },
    featured: true,
  },
  {
    id: 'thamel-boutique-hotel',
    title: 'Thamel Boutique Hotel',
    location: 'Thamel, Kathmandu',
    category: 'Hospitality',
    status: 'Completed',
    year: 2024,
    client: 'Boutique Hotel Developer',
    area: '11,000 sq. ft.',
    duration: '18 months',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80'],
    description: 'Elegant boutique hotel project in Thamel, Kathmandu, constructed with premium interior finishes, guest amenities, and soundproof acoustics.',
    highlights: [
      'Boutique hotel with premium interior finishes',
      'Modern guest amenities & dining area',
      'Quality MEP and structural engineering'
    ],
    specifications: {
      Category: 'Hospitality / Boutique Hotel',
      Location: 'Thamel, Kathmandu',
      Completion: '2024'
    },
    featured: true,
  },
  {
    id: 'airport-office-interior-works',
    title: 'Airport Office Interior Works',
    location: 'Kathmandu Valley',
    category: 'Commercial',
    status: 'Completed',
    year: 2025,
    client: 'Biman Bangladesh & Air India',
    area: '5,500 sq. ft.',
    duration: '6 months',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80'],
    description: 'Corporate office interior fit-out project at Tribhuvan Airport area for international airline clients Biman Bangladesh and Air India. Included custom furniture, modular glass partitions, acoustic ceilings, and electrical/data cabling works.',
    highlights: [
      'Clients: Biman Bangladesh & Air India',
      'Corporate office interior fit-out & partitions',
      'Custom furniture, electrical, and data works'
    ],
    specifications: {
      Clients: 'Biman Bangladesh & Air India',
      Category: 'Corporate Interior Fit-out',
      Completion: '2025'
    },
    featured: true,
  },
  {
    id: 'temple-himalayan-hotel-spa-pokhara',
    title: 'Temple Himalayan Hotel & Spa',
    location: 'Pokhara',
    category: 'Hospitality',
    status: 'Completed',
    year: 2023,
    client: 'Temple Group Pokhara',
    area: '26,000 sq. ft.',
    duration: '32 months',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80'],
    description: 'A landmark 4-star hospitality resort project in Pokhara featuring luxury suites, rejuvenating spa center, fine dining restaurants, and swimming pool facilities.',
    highlights: [
      '4-Star hotel and spa complex in Pokhara',
      'Luxury guest suites & wellness spa',
      'Landscaped gardens & swimming pool'
    ],
    specifications: {
      Category: '4-Star Hospitality & Spa',
      Location: 'Pokhara',
      Completion: '2023'
    },
    featured: true,
  },
  {
    id: 'raniban-neo-classical-residence',
    title: 'Raniban Neo-Classical Residential Building',
    location: 'Raniban, Kathmandu',
    category: 'Residential',
    status: 'Completed',
    year: 2024,
    client: 'Private Client',
    area: '4,800 sq. ft.',
    duration: '16 months',
    image: '/projects/raniban-1.png',
    gallery: [
      '/projects/raniban-1.png',
      '/projects/raniban-2.png'
    ],
    description: 'Multi-story residential building featuring magnificent neo-classical architectural facade, custom mouldings, and modern RCC structural integrity.',
    highlights: [
      'Classic neo-classical architectural elevation',
      'Multi-story residential construction',
      'Premium exterior plaster mouldings & finishes'
    ],
    specifications: {
      Style: 'Neo-Classical Architecture',
      Location: 'Raniban, Kathmandu',
      Completion: '2024'
    },
    featured: true,
  }
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
  {
    id: 1,
    name: 'Er. Karun Pandey',
    designation: 'Executive Civil Engineer & Managing Director',
    qualification: 'Bachelor’s Degree in Civil Engineering, TU (2073 B.S.)',
    experience: 'TU Graduate (2073 B.S.)',
    phone: '9843604439',
    permanentAddress: 'Kakani-07, Nuwakot, Nepal',
    temporaryAddress: 'Tarkeshwor-07, Kathmandu, Nepal',
    image: '/karun-pandey.png',
    avatar: 'KP',
    color: '#1e40af',
    featuredKeyPerson: true,
  },
  {
    id: 2,
    name: 'Er. Rajesh Yadav',
    designation: 'Chief Structural Engineer & Technical Director',
    qualification: 'Master’s Degree in Structural Engineering, TU (2079 B.S.) | B.E. Civil (2072 B.S.)',
    experience: 'M.E. Structural (TU 2079 B.S.)',
    phone: '9843456230',
    permanentAddress: 'Gadhimai-04, Rautahat, Nepal',
    temporaryAddress: 'Tikathali, Kathmandu, Nepal',
    image: '/rajesh-yadav.png',
    avatar: 'RY',
    color: '#f97316',
    featuredKeyPerson: true,
  },
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

