export interface Product {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  subCategory: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  material: string;
  finish: string;
  dimensions: string;
  weight: string;
  warranty: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isDealOfDay?: boolean;
  colors?: string[];
  features: string[];
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  subCategories: string[];
  description: string;
}

export interface Studio {
  id: string;
  name: string;
  city: string;
  address: string;
  timing: string;
  phone: string;
  image: string;
  services: string[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minOrder: number;
  description: string;
}

// Local image references generated
export const ASSET_IMAGES = {
  heroLiving: '/src/assets/images/hero_furniture_living_1792475853328.jpg',
  sofasLounges: '/src/assets/images/category_sofas_lounges_1792475854188.jpg',
  diningSets: '/src/assets/images/category_dining_sets_1792475854356.jpg',
  bedroomSanctuary: '/src/assets/images/category_bedroom_sanctuary_1792475854287.jpg',
};

export const CATEGORIES: Category[] = [
  {
    id: 'sofas-seating',
    name: 'Sofas & Seating',
    slug: 'sofas-seating',
    image: ASSET_IMAGES.sofasLounges,
    itemCount: 420,
    subCategories: ['3 Seater Sofas', 'Sectional Sofas', 'Recliners', 'Lounge Chairs', 'Ottomans', 'Sofa Cum Beds'],
    description: 'Ergonomic plush seating, premium linen and top-grain leather collections designed for ultimate relaxation.',
  },
  {
    id: 'bedroom',
    name: 'Beds & Bedroom',
    slug: 'bedroom',
    image: ASSET_IMAGES.bedroomSanctuary,
    itemCount: 380,
    subCategories: ['King Size Beds', 'Queen Size Beds', 'Hydraulic Storage Beds', 'Bedside Tables', 'Dressers & Mirrors', 'Wardrobes'],
    description: 'Solid Sheesham and Teak wood beds with integrated acoustic headboards and intelligent concealed storage.',
  },
  {
    id: 'dining',
    name: 'Dining & Kitchen',
    slug: 'dining',
    image: ASSET_IMAGES.diningSets,
    itemCount: 290,
    subCategories: ['6 Seater Dining Sets', '4 Seater Dining Sets', 'Extendable Dining Tables', 'Dining Chairs', 'Bar Stools', 'Crockery Cabinets'],
    description: 'Gather around hand-finished artisanal dining tables built to endure generations of family celebrations.',
  },
  {
    id: 'living',
    name: 'Living Room',
    slug: 'living',
    image: ASSET_IMAGES.heroLiving,
    itemCount: 510,
    subCategories: ['Coffee Tables', 'TV Units', 'Bookshelves', 'Display Cabinets', 'Console Tables', 'Shoe Racks'],
    description: 'Thoughtful centerpiece tables, architectural TV units, and modular display shelves for modern homes.',
  },
  {
    id: 'study-office',
    name: 'Study & Work',
    slug: 'study-office',
    image: ASSET_IMAGES.heroLiving,
    itemCount: 185,
    subCategories: ['Ergonomic Desks', 'Executive Chairs', 'Bookcases', 'Corner Study Tables', 'Filing Cabinets'],
    description: 'Productivity-boosting ergonomic workstations, cable-managed solid wood desks, and high-back lumbar chairs.',
  },
  {
    id: 'decor-lighting',
    name: 'Decor & Lighting',
    slug: 'decor-lighting',
    image: ASSET_IMAGES.diningSets,
    itemCount: 640,
    subCategories: ['Pendant Lights', 'Floor Lamps', 'Wall Mirrors', 'Handwoven Rugs', 'Ceramic Vases', 'Wall Art'],
    description: 'Sculptural brass lighting, organic handwoven textiles, and gallery-worthy accents that finish your space.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'lm-sofa-01',
    name: 'Marlowe 3-Seater Reversible Sectional Sofa in Terracotta',
    category: 'sofas-seating',
    categoryName: 'Sofas & Seating',
    subCategory: 'Sectional Sofas',
    brand: 'LiverMount Studio',
    price: 34999,
    originalPrice: 58999,
    discount: 40,
    rating: 4.8,
    reviewsCount: 142,
    images: [
      ASSET_IMAGES.sofasLounges,
      ASSET_IMAGES.heroLiving,
      ASSET_IMAGES.diningSets,
    ],
    description: 'The Marlowe Sectional combines relaxed Scandinavian elegance with generous deep-seated proportion. Upholstered in high-tensile breathable terracotta textured fabric with resilient pocket spring core cushioning and solid oak tapered feet.',
    material: 'High-Density Foam, Pocket Springs & Kiln-Dried Pine Wood Frame',
    finish: 'Terracotta Woven Fabric / Light Oak Legs',
    dimensions: '88" W x 62" D x 34" H (223 cm x 157 cm x 86 cm)',
    weight: '68 kg',
    warranty: '5 Years Structural Warranty & 1 Year Foam Guarantee',
    inStock: true,
    isBestSeller: true,
    isDealOfDay: true,
    colors: ['Terracotta Orange', 'Charcoal Slate', 'Oatmeal Cream'],
    features: [
      'Reversible chaise fits both left & right corners',
      'High Martindale abrasion rating (>35,000 rubs)',
      'High-resilience pocket springs avoid sagging',
      'Removable and washable cushion slipcovers'
    ],
    sku: 'LM-SF-MARLOWE-TC',
  },
  {
    id: 'lm-bed-01',
    name: 'Aurelia King Size Platform Bed in Natural Honey Teak',
    category: 'bedroom',
    categoryName: 'Beds & Bedroom',
    subCategory: 'King Size Beds',
    brand: 'Nirvana Woodworks',
    price: 42999,
    originalPrice: 69999,
    discount: 38,
    rating: 4.9,
    reviewsCount: 96,
    images: [
      ASSET_IMAGES.bedroomSanctuary,
      ASSET_IMAGES.heroLiving,
      ASSET_IMAGES.sofasLounges,
    ],
    description: 'Crafted from sustainable Grade-A Teak wood, the Aurelia Bed boasts a floating visual silhouette with an upholstered organic linen headboard. Designed with reinforced noise-free central beam support and smooth rounded safety edges.',
    material: '100% Solid Kiln-Dried Teak Wood with Upholstered Belgian Linen Headboard',
    finish: 'Matte Natural Teak Polish with Water-Resistant Sealer',
    dimensions: '84" L x 76" W x 44" H (Fits mattress 78" x 72")',
    weight: '82 kg',
    warranty: '10 Years Warranty Against Termite and Wood Borer',
    inStock: true,
    isBestSeller: true,
    colors: ['Natural Teak', 'Provincial Walnut', 'Smoked Espresso'],
    features: [
      '100% Solid hardwood zero-noise slat construction',
      'Treated against moisture, borers, and termites',
      'Cushioned headboard inclined at optimal reading angle (105°)',
      'Free technician assembly at home included'
    ],
    sku: 'LM-BD-AURELIA-KG',
  },
  {
    id: 'lm-dining-01',
    name: 'Kavala 6-Seater Solid Sheesham Dining Table Set with Chairs',
    category: 'dining',
    categoryName: 'Dining & Kitchen',
    subCategory: '6 Seater Dining Sets',
    brand: 'LiverMount Artisan',
    price: 36499,
    originalPrice: 59999,
    discount: 39,
    rating: 4.7,
    reviewsCount: 88,
    images: [
      ASSET_IMAGES.diningSets,
      ASSET_IMAGES.heroLiving,
      ASSET_IMAGES.sofasLounges,
    ],
    description: 'An ode to Indian carpentry heritage, the Kavala dining ensemble features expressive natural Sheesham grain patterns. Comes with 6 ergonomically curved solid wood chairs with high-density oatmeal fabric seat pads.',
    material: 'Solid Indian Rosewood (Sheesham) & High-Density Cushions',
    finish: 'Warm Walnut Satin Luster Finish',
    dimensions: 'Table: 60" L x 36" W x 30" H; Chair: 18" W x 20" D x 37" H',
    weight: '94 kg (Combined)',
    warranty: '10 Years Structural Wood Warranty',
    inStock: true,
    isBestSeller: true,
    colors: ['Warm Walnut', 'Honey Oak', 'Rich Mahogany'],
    features: [
      'Naturally dense grain prevents warping and dings',
      'Soft curved corner radius for family and child safety',
      'Stain-resistant top coat easy to wipe with damp cloth',
      'Padded chairs with 45D high-density comfort foam'
    ],
    sku: 'LM-DN-KAVALA-6S',
  },
  {
    id: 'lm-sofa-02',
    name: 'Nordic Sven 3-Seater Fabric Sofa in Deep Charcoal',
    category: 'sofas-seating',
    categoryName: 'Sofas & Seating',
    subCategory: '3 Seater Sofas',
    brand: 'LiverMount Studio',
    price: 27999,
    originalPrice: 44999,
    discount: 37,
    rating: 4.6,
    reviewsCount: 110,
    images: [
      ASSET_IMAGES.sofasLounges,
      ASSET_IMAGES.heroLiving,
    ],
    description: 'Clean mid-century lines meet cozy modern craftsmanship. The Sven sofa features tufted back cushioning, generous track arms, and cylindrical bolster pillows that invite you to sink in after a long day.',
    material: 'Polyester-Linen Blend & Hardwood Internal Frame',
    finish: 'Charcoal Grey Textured Fabric / Dark Walnut Legs',
    dimensions: '82" W x 35" D x 34" H',
    weight: '52 kg',
    warranty: '5 Years Structural Warranty',
    inStock: true,
    features: [
      'Breathable anti-pilling textured fabric',
      'Reinforced corner-blocked kiln-dried wood frame',
      'Includes 2 matching cylindrical arm bolsters'
    ],
    sku: 'LM-SF-NORDIC-CH',
  },
  {
    id: 'lm-bed-02',
    name: 'Solano Queen Size Hydraulic Storage Bed in Walnut',
    category: 'bedroom',
    categoryName: 'Beds & Bedroom',
    subCategory: 'Hydraulic Storage Beds',
    brand: 'Amber Craft',
    price: 38999,
    originalPrice: 62999,
    discount: 38,
    rating: 4.8,
    reviewsCount: 74,
    images: [
      ASSET_IMAGES.bedroomSanctuary,
      ASSET_IMAGES.diningSets,
    ],
    description: 'Solve compact bedroom storage effortlessly with heavy-duty German gas-lift hydraulic pistons. Effortlessly lifts your mattress to reveal 850+ liters of dust-free compartmentalized storage underneath.',
    material: 'Engineered Wood with Solid Wood Internal Framework',
    finish: 'Melamine Walnut Grain Finish with Water Repellent Edge Bander',
    dimensions: '82" L x 64" W x 40" H (Fits mattress 78" x 60")',
    weight: '115 kg',
    warranty: '5 Years Hydraulic Mechanism & Frame Warranty',
    inStock: true,
    isDealOfDay: true,
    features: [
      'Heavy-duty 150kg rated pneumatic gas-lift pumps',
      '4 segregated storage chambers for quilts and suitcases',
      'Minimal effort lift mechanism tested for 10,000 cycles',
      'Solid headboard with soft recessed accent channel'
    ],
    sku: 'LM-BD-SOLANO-QN',
  },
  {
    id: 'lm-living-01',
    name: 'Kyoto Minimalist Solid Oak Coffee Table with Shelf',
    category: 'living',
    categoryName: 'Living Room',
    subCategory: 'Coffee Tables',
    brand: 'LiverMount Studio',
    price: 12499,
    originalPrice: 19999,
    discount: 37,
    rating: 4.9,
    reviewsCount: 63,
    images: [
      ASSET_IMAGES.heroLiving,
      ASSET_IMAGES.diningSets,
    ],
    description: 'A serene Japanese-inspired coffee table featuring clean beveled edges and a lower slotted slatted tier for coffee table books, tablets, and remote controls. Solid white oak structure with durable clear satin polyurethane seal.',
    material: '100% White Oak Solid Wood',
    finish: 'Natural Matte Oak Polish',
    dimensions: '44" L x 22" W x 16" H',
    weight: '22 kg',
    warranty: '5 Years Warranty',
    inStock: true,
    features: [
      'Slotted lower magazine and remote tray',
      'Sleek chamfered perimeter preventing sharp edges',
      'Felt-padded foot glides prevent floor scratching'
    ],
    sku: 'LM-LV-KYOTO-CF',
  },
  {
    id: 'lm-decor-01',
    name: 'Lumiere Arch Floor Lamp with Brushed Brass & Marble Base',
    category: 'decor-lighting',
    categoryName: 'Decor & Lighting',
    subCategory: 'Floor Lamps',
    brand: 'LiverMount Studio',
    price: 8999,
    originalPrice: 15999,
    discount: 43,
    rating: 4.9,
    reviewsCount: 52,
    images: [
      ASSET_IMAGES.heroLiving,
      ASSET_IMAGES.diningSets,
    ],
    description: 'Make a graceful architectural statement over your reading nook or sectional sofa. Features a heavy genuine White Carrara marble base that guarantees stability, brushed warm brass telescopic arch, and textured linen drum shade.',
    material: 'Natural Carrara Marble, Electroplated Brass & Linen Shade',
    finish: 'Brushed Brass Metal & Honed White Marble',
    dimensions: 'Overhead reach 48", Height 78", Shade Diameter 18"',
    weight: '16 kg',
    warranty: '2 Years Electrical & Structure Warranty',
    inStock: true,
    features: [
      'Weighted 12kg solid marble anchor prevents tipping',
      'Foot-step on/off cord switch for hands-free convenience',
      'Standard E27 fixture compatible with smart LED bulbs'
    ],
    sku: 'LM-DC-LUMIERE-FL',
  },
  {
    id: 'lm-study-01',
    name: 'Vanguard Solid Wood Executive Desk with Cable Management',
    category: 'study-office',
    categoryName: 'Study & Work',
    subCategory: 'Ergonomic Desks',
    brand: 'LiverMount Artisan',
    price: 21999,
    originalPrice: 34999,
    discount: 37,
    rating: 4.8,
    reviewsCount: 45,
    images: [
      ASSET_IMAGES.heroLiving,
      ASSET_IMAGES.bedroomSanctuary,
    ],
    description: 'Designed for discerning creators and remote professionals. Features a full-width concealable wire trench, smooth magnetic cord guides, two soft-close stationery drawers, and a built-in wireless charging pad cut-out.',
    material: 'Kiln-Dried Solid Teak & Powder-Coated Steel Chassis',
    finish: 'Warm Teak Wood Top / Matte Black Industrial Legs',
    dimensions: '56" W x 28" D x 30" H',
    weight: '38 kg',
    warranty: '7 Years Warranty',
    inStock: true,
    features: [
      'Integrated under-desk metal cable routing channel',
      'Dual soft-close drawers with brushed brass pull tabs',
      'Spacious ergonomic legroom accommodating all executive chairs'
    ],
    sku: 'LM-ST-VANGUARD-DK',
  },
  {
    id: 'lm-seating-03',
    name: 'Oslo Ergonomic Push-Back Recliner in Tan Vegan Leather',
    category: 'sofas-seating',
    categoryName: 'Sofas & Seating',
    subCategory: 'Recliners',
    brand: 'LiverMount Studio',
    price: 19999,
    originalPrice: 31999,
    discount: 37,
    rating: 4.7,
    reviewsCount: 89,
    images: [
      ASSET_IMAGES.sofasLounges,
      ASSET_IMAGES.heroLiving,
    ],
    description: 'The ultimate reading and binge-watching recliner. Smooth manual glide push-back mechanism locks into 3 comfortable positions (105°, 130°, and 160° nap mode) with padded lumbar wing support.',
    material: 'Breathable Microfiber Vegan Leather & Alloy Steel Reclining Gear',
    finish: 'Tan Saddle Brown Leatherette',
    dimensions: '33" W x 36" D x 40" H (Fully extended: 64" L)',
    weight: '39 kg',
    warranty: '3 Years Recliner Mechanism Warranty',
    inStock: true,
    isDealOfDay: true,
    features: [
      '3-position smooth push-back multi-stage recline',
      'High-resilience foam padding with high neck support',
      'Scratch-resistant, easy-to-clean breathable upholstery'
    ],
    sku: 'LM-SF-OSLO-REC',
  },
  {
    id: 'lm-dining-02',
    name: 'Canterbury 4-Seater Round Solid Wood Dining Table',
    category: 'dining',
    categoryName: 'Dining & Kitchen',
    subCategory: '4 Seater Dining Sets',
    brand: 'Amber Craft',
    price: 24999,
    originalPrice: 39999,
    discount: 37,
    rating: 4.8,
    reviewsCount: 42,
    images: [
      ASSET_IMAGES.diningSets,
      ASSET_IMAGES.heroLiving,
    ],
    description: 'Perfect for cozy dining nooks and modern apartments. The round silhouette encourages conversation without awkward corners, resting atop an architectural fluted pedestal base.',
    material: 'Solid Rubberwood & Natural Ash Veneer',
    finish: 'Warm Natural Ash Polish',
    dimensions: '42" Diameter x 30" H',
    weight: '34 kg',
    warranty: '5 Years Structural Warranty',
    inStock: true,
    features: [
      'Statement fluted pedestal base maximizing knee clearance',
      'Seats 4 comfortably, expands up to 5 with accent chairs',
      'Sealed against oil, curry, and water stains'
    ],
    sku: 'LM-DN-CANTERBURY-4R',
  },
  {
    id: 'lm-decor-02',
    name: 'Aura Grand Organic Asymmetric Floor Mirror with Solid Wood Frame',
    category: 'decor-lighting',
    categoryName: 'Decor & Lighting',
    subCategory: 'Wall Mirrors',
    brand: 'LiverMount Studio',
    price: 9499,
    originalPrice: 16999,
    discount: 44,
    rating: 4.9,
    reviewsCount: 38,
    images: [
      ASSET_IMAGES.bedroomSanctuary,
      ASSET_IMAGES.heroLiving,
    ],
    description: 'An organic wavy full-length statement mirror that bounces natural light across your dressing room or entryway. Features distortion-free 5mm silver backing encased in hand-carved solid pine frame.',
    material: '5mm HD Copper-Free Silver Mirror & Solid Pine Frame',
    finish: 'Natural Honey Pine Wax Finish',
    dimensions: '68" H x 30" W x 1.5" D',
    weight: '14 kg',
    warranty: '2 Years Mirror Backing Warranty',
    inStock: true,
    features: [
      'Shatter-proof explosion-protected film backing',
      'Dual mounting: freestanding floor lean or wall-hung brackets',
      'Sculptural organic curve contour'
    ],
    sku: 'LM-DC-AURA-MIRROR',
  },
  {
    id: 'lm-living-02',
    name: 'Meridian Solid Wood 6-Tier Open Display Bookshelf',
    category: 'living',
    categoryName: 'Living Room',
    subCategory: 'Bookshelves',
    brand: 'Nirvana Woodworks',
    price: 18499,
    originalPrice: 29999,
    discount: 38,
    rating: 4.7,
    reviewsCount: 57,
    images: [
      ASSET_IMAGES.heroLiving,
      ASSET_IMAGES.diningSets,
    ],
    description: 'Display your prized book collection, indoor ceramics, and travel curios on staggered architectural shelves. Solid Sheesham wood construction tested to hold up to 25kg per tier without deflection.',
    material: '100% Solid Sheesham Hardwood',
    finish: 'Provincial Teak Luster',
    dimensions: '36" W x 14" D x 72" H',
    weight: '44 kg',
    warranty: '10 Years Structural Warranty',
    inStock: true,
    features: [
      'Staggered asymmetric tier depths for varied objects',
      'Includes safety anti-tip wall anchoring hardware',
      'Hand-waxed grain bringing out authentic timber depth'
    ],
    sku: 'LM-LV-MERIDIAN-BK',
  }
];

export const STUDIOS: Studio[] = [
  {
    id: 'mumbai-bandra',
    name: 'LiverMount Studio - Bandra West',
    city: 'Mumbai',
    address: 'Ground Floor, Turner Road, Near National College, Bandra West, Mumbai 400050',
    timing: '10:30 AM – 9:00 PM (Open 7 Days)',
    phone: '+91 22 4196 6601',
    image: ASSET_IMAGES.heroLiving,
    services: ['Free 3D Room Design', 'Fabric & Finish Touch-Bar', 'Interior Consultant on site', 'Complimentary Artisan Coffee'],
  },
  {
    id: 'bengaluru-indiranagar',
    name: 'LiverMount Studio - Indiranagar 100ft Rd',
    city: 'Bengaluru',
    address: 'Plot 742, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    timing: '10:30 AM – 9:00 PM (Open 7 Days)',
    phone: '+91 80 4196 6602',
    image: ASSET_IMAGES.sofasLounges,
    services: ['Free 3D Room Design', 'Fabric & Finish Touch-Bar', 'Bespoke Sizing Desk', 'Express Home Delivery Booking'],
  },
  {
    id: 'delhi-south-ex',
    name: 'LiverMount Studio - South Extension II',
    city: 'Delhi NCR',
    address: 'E-14, Main Ring Road, South Extension Part II, New Delhi 110049',
    timing: '11:00 AM – 9:00 PM (Open 7 Days)',
    phone: '+91 11 4196 6603',
    image: ASSET_IMAGES.diningSets,
    services: ['Free 3D Room Design', 'Material Sample Swatch Kits', 'Modular Kitchen & Wardrobe Zone', 'Dedicated Valet Parking'],
  },
  {
    id: 'pune-koregaon-park',
    name: 'LiverMount Studio - Koregaon Park',
    city: 'Pune',
    address: 'Lane 7, Above Blue Tokai, Koregaon Park, Pune 411001',
    timing: '10:30 AM – 8:30 PM (Open 7 Days)',
    phone: '+91 20 4196 6604',
    image: ASSET_IMAGES.bedroomSanctuary,
    services: ['Free 3D Room Design', 'Fabric & Finish Touch-Bar', 'Architect & Designer Discount Desk'],
  },
  {
    id: 'hyderabad-jubilee-hills',
    name: 'LiverMount Studio - Jubilee Hills Rd 36',
    city: 'Hyderabad',
    address: 'Road No. 36, Opposite Metro Pillar 1682, Jubilee Hills, Hyderabad 500033',
    timing: '10:30 AM – 9:00 PM (Open 7 Days)',
    phone: '+91 40 4196 6605',
    image: ASSET_IMAGES.heroLiving,
    services: ['Free 3D Room Design', 'Solid Wood Acoustic Lab', 'Mattress Testing Zone'],
  },
  {
    id: 'chennai-nungambakkam',
    name: 'LiverMount Studio - Nungambakkam',
    city: 'Chennai',
    address: 'Khadar Nawaz Khan Road, Nungambakkam, Chennai 600006',
    timing: '10:30 AM – 8:30 PM (Open 7 Days)',
    phone: '+91 44 4196 6606',
    image: ASSET_IMAGES.diningSets,
    services: ['Free 3D Room Design', 'Fabric & Finish Touch-Bar', 'Personalized Home Styling'],
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'LIVERMOUNT10',
    discountPercent: 10,
    maxDiscount: 3500,
    minOrder: 15000,
    description: '10% Instant discount on orders above ₹15,000 (Max ₹3,500)',
  },
  {
    code: 'FESTIVE25',
    discountPercent: 15,
    maxDiscount: 5000,
    minOrder: 25000,
    description: '15% Festive Celebration discount up to ₹5,000',
  },
  {
    code: 'FIRSTHOME',
    discountPercent: 12,
    maxDiscount: 2000,
    minOrder: 9999,
    description: 'Welcome perk: Flat 12% off for your new home',
  },
];

export const FAQS = [
  {
    category: 'Ordering & Payment',
    question: 'How do I place an order on LiverMount?',
    answer: 'Select your preferred furniture pieces, choose custom wood finish or upholstery color if applicable, and click "Add to Cart" or "Buy Now". You can checkout seamlessly using Credit/Debit cards, UPI, Net Banking, EMI, or Cash on Delivery.',
  },
  {
    category: 'Ordering & Payment',
    question: 'Are there Zero Cost EMI options available?',
    answer: 'Yes! We partner with leading banks (HDFC, ICICI, SBI, Axis, and Kotak) to offer 3, 6, and 9-month No Cost EMI tenures on purchases above ₹10,000.',
  },
  {
    category: 'Delivery & Shipping',
    question: 'Is delivery and assembly free?',
    answer: 'Yes, 100% free! All furniture orders include white-glove doorstep delivery and free technician installation by our certified assembly crew within 24-48 hours of product delivery in over 300+ cities.',
  },
  {
    category: 'Delivery & Shipping',
    question: 'How long does shipping take to my pincode?',
    answer: 'Metros & Tier 1 cities typically receive delivery within 3 to 5 business days. Customized or made-to-order solid wood items may take 7 to 10 days. You can check exact pincode estimates directly on every product page.',
  },
  {
    category: 'Warranty & Craftsmanship',
    question: 'What does the LiverMount 10-Year Warranty cover?',
    answer: 'Our solid wood furniture is backed by a 10-year warranty covering any wood borer, structural joint separation, or termite infestation under normal residential use.',
  },
  {
    category: 'Returns & Cancellations',
    question: 'What is your return policy if the piece does not fit my room?',
    answer: 'We offer an easy 7-Day Hassle-Free Return Policy. If a product arrives damaged, defective, or noticeably different from the listing, our logistics team picks it up free of charge for an instant replacement or 100% refund.',
  },
  {
    category: 'LiverMount Studios',
    question: 'Can I visit an offline LiverMount Studio to experience the furniture in person?',
    answer: 'Absolutely! We have 100+ Experience Studios across India (Mumbai, Bengaluru, Delhi NCR, Pune, Hyderabad, Chennai, etc.) where you can touch solid wood finishes, sit on sofas, test mattresses, and get free 3D interior design advice from our architects.',
  },
];

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Priya Narayanan',
    city: 'Bengaluru',
    rating: 5,
    date: '12 Oct 2026',
    product: 'Marlowe Sectional Sofa',
    verified: true,
    title: 'Transformed our entire living room!',
    content: 'The terracotta shade is even richer in person than on screen. Delivery was on time, and the assembly team set up the chaise seamlessly. Super comfortable for weekend movie marathons!',
  },
  {
    id: 'rev-2',
    author: 'Rohan Deshmukh',
    city: 'Mumbai',
    rating: 5,
    date: '28 Sep 2026',
    product: 'Aurelia Teak King Bed',
    verified: true,
    title: 'Solid wood excellence — zero creaks',
    content: 'Very impressed with the timber weight and natural teak finish. The upholstered headboard feels like a 5-star hotel room. Outstanding customer service from LiverMount!',
  },
  {
    id: 'rev-3',
    author: 'Ananya Sharma',
    city: 'Gurugram',
    rating: 5,
    date: '04 Oct 2026',
    product: 'Kavala 6-Seater Dining Set',
    verified: true,
    title: 'Stunning craftsmanship and heavy solid wood',
    content: 'We hosted Diwali dinner for 10 people and everyone complimented the Sheesham wood grain. The chairs have firm yet plush cushioning. Worth every single rupee.',
  },
];
