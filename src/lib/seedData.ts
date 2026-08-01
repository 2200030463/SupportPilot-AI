export interface SeedProduct {
  sku: string;
  name: string;
  category: "Electronics" | "Footwear" | "Fashion" | "Home & Kitchen" | "Beauty & Personal Care" | "Fitness";
  priceInINR: number;
  originalPriceInINR: number;
  rating: number;
  reviewCount: number;
  stockQuantity: number;
  inStock: boolean;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  image: string;
  returnPolicyDays: number;
  isPopular: boolean;
}

export interface SeedOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  priceInINR: number;
  image?: string;
}

export interface SeedTrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

export interface SeedOrder {
  orderNumber: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  items: SeedOrderItem[];
  totalAmountInINR: number;
  paymentMethod: "UPI" | "COD" | "Credit Card" | "Net Banking";
  status: "Processing" | "Shipped" | "In Transit" | "Out for Delivery" | "Delivered" | "Cancelled" | "Returned";
  courierName: "Delhivery" | "BlueDart" | "Xpressbees" | "Ecom Express" | "Shadowfax";
  trackingNumber: string;
  estimatedDelivery: string;
  shippingAddress: string;
  trackingTimeline: SeedTrackingEvent[];
  returnEligibleUntil: string;
  isReturnRequested: boolean;
  refundStatus: "Not Initiated" | "Processing" | "Completed" | "Failed";
}

export interface SeedFAQ {
  question: string;
  answer: string;
  category: "Shipping & Delivery" | "Returns & Exchanges" | "Refunds & UPI" | "Product & Warranty" | "Account & Orders";
  language: "en" | "hi" | "ta" | "te" | "mr" | "bn";
  tags: string[];
  helpfulCount: number;
}

export interface SeedCustomer {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "customer";
  preferredLanguage: string;
  isVIP: boolean;
  city: string;
  state: string;
  pincode: string;
}

export interface SeedTicket {
  ticketCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  category: "Order Delay" | "Return Request" | "Refund Issue" | "Defective Product" | "Payment Failure" | "General Enquiry";
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Pending Customer" | "Resolved" | "Escalated";
  sentiment: "Positive" | "Neutral" | "Negative" | "Frustrated" | "Urgent";
  assignedAgent: string;
  conversationSummary: string;
  responses: { sender: "customer" | "agent" | "ai"; senderName: string; message: string; timestamp: string }[];
}

// ----------------------------------------------------
// 30 PRODUCTS SEED DATA
// ----------------------------------------------------
export const initialProducts: SeedProduct[] = [
  {
    sku: "PRD-E101",
    name: "Noise ColorFit Pulse 2 Max Smartwatch (1.85\" Display)",
    category: "Electronics",
    priceInINR: 1499,
    originalPriceInINR: 5999,
    rating: 4.6,
    reviewCount: 4230,
    stockQuantity: 120,
    inStock: true,
    brand: "Noise",
    description: "Large 1.85 inch TFT display smartwatch with bluetooth calling, 550 nits brightness, 100 sports modes, and 10-day battery.",
    specifications: { Display: "1.85\" TFT", Battery: "10 Days", Bluetooth: "v5.3", Waterproof: "IP68" },
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E102",
    name: "boAt Airdopes 141 TWS Earbuds with 42H Playtime",
    category: "Electronics",
    priceInINR: 1299,
    originalPriceInINR: 4490,
    rating: 4.4,
    reviewCount: 8900,
    stockQuantity: 250,
    inStock: true,
    brand: "boAt",
    description: "True wireless earbuds featuring Beast mode for low latency gaming, ENx technology for clear voice calls, and ASAP fast charge.",
    specifications: { Playtime: "42 Hours", Driver: "8mm Dynamic", Latency: "80ms", Charging: "Type-C" },
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E103",
    name: "Realme TechLife Buds T100 ANC Wireless Earphones",
    category: "Electronics",
    priceInINR: 1499,
    originalPriceInINR: 2999,
    rating: 4.5,
    reviewCount: 1540,
    stockQuantity: 95,
    inStock: true,
    brand: "Realme",
    description: "Active Noise Cancellation TWS earphones with 10mm dynamic bass driver and Google Fast Pair.",
    specifications: { ANC: "Yes (25dB)", Battery: "28 Hours", Driver: "10mm", Resistance: "IPX5" },
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E104",
    name: "Zebronics Zeb-Transformer Gaming Keyboard & Mouse Combo",
    category: "Electronics",
    priceInINR: 1199,
    originalPriceInINR: 2299,
    rating: 4.3,
    reviewCount: 620,
    stockQuantity: 40,
    inStock: true,
    brand: "Zebronics",
    description: "Multicolor LED gaming keyboard with aluminum body and high-precision 3200 DPI gaming mouse.",
    specifications: { Interface: "USB", Backlight: "Multi-color LED", MouseDPI: "3200 DPI", Cable: "Braided 1.8m" },
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },
  {
    sku: "PRD-E105",
    name: "Portronics SoundDrum 15W Portable Bluetooth Speaker",
    category: "Electronics",
    priceInINR: 1799,
    originalPriceInINR: 3499,
    rating: 4.5,
    reviewCount: 2100,
    stockQuantity: 60,
    inStock: true,
    brand: "Portronics",
    description: "15W HD sound bluetooth speaker with TWS connectivity, built-in FM, and Type-C fast charging.",
    specifications: { Output: "15W", Battery: "2500mAh", Playtime: "8 Hours", FM: "Built-in" },
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },
  {
    sku: "PRD-E106",
    name: "SanDisk Ultra 128GB MicroSDXC Memory Card (140MB/s)",
    category: "Electronics",
    priceInINR: 899,
    originalPriceInINR: 1800,
    rating: 4.7,
    reviewCount: 14200,
    stockQuantity: 500,
    inStock: true,
    brand: "SanDisk",
    description: "Class 10 UHS-I card ideal for Android smartphones, tablets, and surveillance cameras.",
    specifications: { Capacity: "128GB", ReadSpeed: "Up to 140MB/s", Class: "Class 10", Warranty: "10 Years" },
    image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },

  // Footwear
  {
    sku: "PRD-F201",
    name: "Red Tape Men's Ultra Soft Cushioned Running Shoes",
    category: "Footwear",
    priceInINR: 1899,
    originalPriceInINR: 6599,
    rating: 4.6,
    reviewCount: 3100,
    stockQuantity: 80,
    inStock: true,
    brand: "Red Tape",
    description: "Lightweight mesh upper walking and running shoes with EVA sole for maximum shock absorption.",
    specifications: { Upper: "Breathable Mesh", Sole: "EVA Foam", Closure: "Lace-Up", Gender: "Men" },
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-F202",
    name: "Asian Shoes Men's Wonder-13 Mesh Sports Shoes",
    category: "Footwear",
    priceInINR: 799,
    originalPriceInINR: 1299,
    rating: 4.2,
    reviewCount: 5400,
    stockQuantity: 150,
    inStock: true,
    brand: "Asian Shoes",
    description: "Affordable running and gym sneaker with breathable knitted upper and anti-skid Rubberised sole.",
    specifications: { Weight: "320g", Material: "Knitted Mesh", HeelHeight: "1 inch", Fit: "Regular" },
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-F203",
    name: "Bata Women's Soft Synthetic Leather Flat Sandals",
    category: "Footwear",
    priceInINR: 999,
    originalPriceInINR: 1699,
    rating: 4.4,
    reviewCount: 1800,
    stockQuantity: 45,
    inStock: true,
    brand: "Bata",
    description: "Comfortable daily-wear ethnic flat sandals with memory foam footbed and slip-on closure.",
    specifications: { Sole: "TPR", Closure: "Slip-on", HeelType: "Flat", Gender: "Women" },
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },
  {
    sku: "PRD-F204",
    name: "Puma Unisex Smash v2 Leather Sneakers",
    category: "Footwear",
    priceInINR: 2799,
    originalPriceInINR: 4999,
    rating: 4.7,
    reviewCount: 2900,
    stockQuantity: 35,
    inStock: true,
    brand: "Puma",
    description: "Classic tennis-inspired silhouette with clean leather upper and durable rubber outsole.",
    specifications: { Upper: "Genuine Leather", Outsole: "Rubber", Pattern: "Solid", Unisex: "Yes" },
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },

  // Fashion
  {
    sku: "PRD-C301",
    name: "Allen Solly Men's Regular Fit Cotton Polo T-Shirt",
    category: "Fashion",
    priceInINR: 899,
    originalPriceInINR: 1499,
    rating: 4.5,
    reviewCount: 3800,
    stockQuantity: 110,
    inStock: true,
    brand: "Allen Solly",
    description: "100% combed cotton piqué knit polo t-shirt featuring ribbed collar and brand embroidery.",
    specifications: { Fabric: "100% Cotton", Fit: "Regular", Sleeve: "Half Sleeve", Wash: "Machine Wash" },
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-C302",
    name: "Levi's Men's 511 Slim Fit Stretchable Jeans",
    category: "Fashion",
    priceInINR: 2399,
    originalPriceInINR: 4599,
    rating: 4.6,
    reviewCount: 1950,
    stockQuantity: 70,
    inStock: true,
    brand: "Levi's",
    description: "Modern slim fit denim jeans with narrow leg opening and premium stretch elastane blend.",
    specifications: { Fit: "Slim Fit", Fabric: "98% Cotton 2% Elastane", Rise: "Mid Rise", Closure: "Button & Zip" },
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-C303",
    name: "BIBA Women's Anarkali Cotton Printed Kurti Set",
    category: "Fashion",
    priceInINR: 2199,
    originalPriceInINR: 4999,
    rating: 4.7,
    reviewCount: 1120,
    stockQuantity: 40,
    inStock: true,
    brand: "BIBA",
    description: "Traditional floral print Anarkali kurta with dupatta and pants in pure breathable cotton.",
    specifications: { Material: "100% Pure Cotton", Neck: "Round Neck", SetIncludes: "Kurta, Pants, Dupatta" },
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },
  {
    sku: "PRD-C304",
    name: "Symbol Premium Men's Casual Linen Shirt",
    category: "Fashion",
    priceInINR: 1299,
    originalPriceInINR: 2499,
    rating: 4.3,
    reviewCount: 840,
    stockQuantity: 65,
    inStock: true,
    brand: "Symbol",
    description: "Breathable linen cotton blend long sleeve shirt ideal for casual and smart casual wear.",
    specifications: { Blend: "55% Linen 45% Cotton", Collar: "Button-down", Fit: "Slim" },
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },

  // Home & Kitchen
  {
    sku: "PRD-H401",
    name: "Milton Thermosteel Flip Lid 1000ml Flask Bottle",
    category: "Home & Kitchen",
    priceInINR: 999,
    originalPriceInINR: 1395,
    rating: 4.8,
    reviewCount: 9200,
    stockQuantity: 180,
    inStock: true,
    brand: "Milton",
    description: "Double wall vacuum insulated 24-hour hot and cold stainless steel water bottle.",
    specifications: { Capacity: "1000ml", Material: "304 Stainless Steel", Insulation: "24 Hours Hot/Cold" },
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-H402",
    name: "Prestige Push Button 2000-Watt Induction Cooktop",
    category: "Home & Kitchen",
    priceInINR: 2499,
    originalPriceInINR: 3895,
    rating: 4.5,
    reviewCount: 3400,
    stockQuantity: 50,
    inStock: true,
    brand: "Prestige",
    description: "Energy efficient induction cooktop with Indian menu preset buttons and voltage regulator protection.",
    specifications: { Power: "2000 Watts", Control: "Push Button", AutomaticShutdown: "Yes", Warranty: "1 Year" },
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-H403",
    name: "Pigeon by Stovekraft 3-Litre Outer Lid Pressure Cooker",
    category: "Home & Kitchen",
    priceInINR: 849,
    originalPriceInINR: 1495,
    rating: 4.3,
    reviewCount: 4100,
    stockQuantity: 120,
    inStock: true,
    brand: "Pigeon",
    description: "High grade virgin aluminum pressure cooker certified for safe and speedy cooking.",
    specifications: { Capacity: "3 Litres", Base: "Induction Compatible", Material: "Virgin Aluminum" },
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },
  {
    sku: "PRD-H404",
    name: "Wipro 16A Smart Plug with Energy Monitoring (WiFi)",
    category: "Home & Kitchen",
    priceInINR: 899,
    originalPriceInINR: 1990,
    rating: 4.4,
    reviewCount: 2700,
    stockQuantity: 90,
    inStock: true,
    brand: "Wipro",
    description: "Control heavy appliances (AC, Geyser) remotely using Wipro Next Smart App or Alexa / Google Assistant.",
    specifications: { Rating: "16 Amp", Protocol: "2.4GHz WiFi", App: "Wipro Next Smart", Voice: "Alexa & Google" },
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },

  // Beauty & Personal Care
  {
    sku: "PRD-B501",
    name: "Philips HP8100/46 Hair Dryer 1000W (ThermoProtect)",
    category: "Beauty & Personal Care",
    priceInINR: 899,
    originalPriceInINR: 1195,
    rating: 4.5,
    reviewCount: 7800,
    stockQuantity: 140,
    inStock: true,
    brand: "Philips",
    description: "Compact hair dryer with 2 flexible heat settings and ThermoProtect airflow design.",
    specifications: { Power: "1000 Watts", Settings: "2 Speed", CordLength: "1.5m", Foldable: "No" },
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-B502",
    name: "Mamaearth Vitamin C Face Wash with Turmeric 150ml",
    category: "Beauty & Personal Care",
    priceInINR: 349,
    originalPriceInINR: 399,
    rating: 4.6,
    reviewCount: 11200,
    stockQuantity: 300,
    inStock: true,
    brand: "Mamaearth",
    description: "Dermatologically tested chemical-free face wash for skin illumination and gentle cleansing.",
    specifications: { Volume: "150ml", KeyIngredients: "Vitamin C & Turmeric", SkinType: "All Skin Types" },
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-B503",
    name: "Bombay Shaving Company 6-in-1 Cordless Beard Trimmer",
    category: "Beauty & Personal Care",
    priceInINR: 1199,
    originalPriceInINR: 2499,
    rating: 4.4,
    reviewCount: 1430,
    stockQuantity: 65,
    inStock: true,
    brand: "Bombay Shaving Co",
    description: "Titanium blades beard trimmer with 80-minute runtime and 20 lock-in precision length settings.",
    specifications: { Runtime: "80 Mins", Charging: "USB Fast Charge", Blades: "Self-Sharpening Stainless Steel" },
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },

  // Fitness
  {
    sku: "PRD-X601",
    name: "Boldfit High Density TPE Anti-Skid Yoga Mat 6mm",
    category: "Fitness",
    priceInINR: 999,
    originalPriceInINR: 2499,
    rating: 4.7,
    reviewCount: 4600,
    stockQuantity: 100,
    inStock: true,
    brand: "Boldfit",
    description: "Eco-friendly non-toxic TPE yoga and workout mat with carrying strap and alignment lines.",
    specifications: { Thickness: "6mm", Material: "TPE Eco Foam", Strap: "Included", MoistureResistant: "Yes" },
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-X602",
    name: "Kore PVC 20KG Adjustable Dumbbell Set for Home Gym",
    category: "Fitness",
    priceInINR: 1499,
    originalPriceInINR: 3999,
    rating: 4.3,
    reviewCount: 2800,
    stockQuantity: 40,
    inStock: true,
    brand: "Kore",
    description: "Complete home workout gym set including 20kg weight plates, dumbbell rods, nuts, and sweatband.",
    specifications: { TotalWeight: "20 KG", Plates: "2kg x 4, 3kg x 4", Rods: "2 x 14-inch Dumbbell Rods" },
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },

  // Additional products to round up to 30 items
  {
    sku: "PRD-E107",
    name: "OnePlus Nord Buds 2 TWS with 25dB ANC",
    category: "Electronics",
    priceInINR: 2999,
    originalPriceInINR: 3299,
    rating: 4.6,
    reviewCount: 5200,
    stockQuantity: 80,
    inStock: true,
    brand: "OnePlus",
    description: "Dual mic AI clear call noise cancellation TWS earphones with 12.4mm titanized drivers.",
    specifications: { Driver: "12.4mm", Playtime: "36 Hours", FastCharge: "10 mins = 5 Hours" },
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E108",
    name: "Mi 10000mAh Power Bank 3i with 18W Fast Charging",
    category: "Electronics",
    priceInINR: 1299,
    originalPriceInINR: 2199,
    rating: 4.5,
    reviewCount: 16000,
    stockQuantity: 200,
    inStock: true,
    brand: "Xiaomi",
    description: "Dual output USB charging power bank with triple output port and micro-USB/Type-C dual input.",
    specifications: { Capacity: "10000mAh", Output: "18W Fast Charge", Ports: "2 USB-A + 1 Type-C" },
    image: "https://images.unsplash.com/photo-1609592424074-b52b31122a27?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-F205",
    name: "Sparx Men's Canvas Casual Loafers",
    category: "Footwear",
    priceInINR: 699,
    originalPriceInINR: 1099,
    rating: 4.3,
    reviewCount: 3900,
    stockQuantity: 110,
    inStock: true,
    brand: "Sparx",
    description: "Durable slip-on canvas shoes for daily casual strolls and college wear.",
    specifications: { Material: "Canvas", Sole: "PVC", Style: "Slip-On" },
    image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },
  {
    sku: "PRD-C305",
    name: "Fastrack Limitless FS1 Smartwatch with BT Calling",
    category: "Electronics",
    priceInINR: 1695,
    originalPriceInINR: 3995,
    rating: 4.4,
    reviewCount: 2200,
    stockQuantity: 75,
    inStock: true,
    brand: "Fastrack",
    description: "1.95-inch Horizon Curve display smartwatch with single-chip Bluetooth calling.",
    specifications: { Display: "1.95\" HD", Battery: "7 Days", SportsModes: "100+" },
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-H405",
    name: "Bajaj DX-6 1000W Lightweight Dry Iron",
    category: "Home & Kitchen",
    priceInINR: 649,
    originalPriceInINR: 999,
    rating: 4.4,
    reviewCount: 8100,
    stockQuantity: 130,
    inStock: true,
    brand: "Bajaj",
    description: "Non-stick American heritage coated soleplate dry iron with cool touch handle.",
    specifications: { Power: "1000W", Soleplate: "Non-stick", Cord: "360 Swivel" },
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },
  {
    sku: "PRD-B504",
    name: "Nivea Men Dark Spot Reduction Face Wash 100g",
    category: "Beauty & Personal Care",
    priceInINR: 199,
    originalPriceInINR: 260,
    rating: 4.5,
    reviewCount: 6500,
    stockQuantity: 240,
    inStock: true,
    brand: "Nivea",
    description: "Deep cleansing face wash with Whitanat Vita Complex 10 for reduction of dark spots.",
    specifications: { Volume: "100g", Type: "10x Dark Spot Reduction" },
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  },
  {
    sku: "PRD-X603",
    name: "Strauss Skipping Rope with Foam Handles & Weight",
    category: "Fitness",
    priceInINR: 249,
    originalPriceInINR: 599,
    rating: 4.4,
    reviewCount: 3200,
    stockQuantity: 180,
    inStock: true,
    brand: "Strauss",
    description: "Adjustable length speed jump rope with ball bearings for smooth spinning.",
    specifications: { Length: "9.8 Feet", Handle: "Anti-slip Memory Foam" },
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: false,
  }
];

// ----------------------------------------------------
// 20 ORDERS SEED DATA
// ----------------------------------------------------
export const initialOrders: SeedOrder[] = [
  {
    orderNumber: "ORD-8921",
    customerEmail: "aarav.sharma@gmail.com",
    customerPhone: "+91 9820011223",
    customerName: "Aarav Sharma",
    items: [
      { productId: "PRD-F201", productName: "Red Tape Men's Ultra Soft Cushioned Running Shoes", quantity: 1, priceInINR: 1899, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80" }
    ],
    totalAmountInINR: 1899,
    paymentMethod: "UPI",
    status: "In Transit",
    courierName: "Delhivery",
    trackingNumber: "DEL-98172314",
    estimatedDelivery: "2026-08-03",
    shippingAddress: "B-402, Sunshine Heights, Andheri West, Mumbai, Maharashtra 400053",
    trackingTimeline: [
      { status: "Order Placed", location: "System", timestamp: "2026-07-29 10:15 AM", description: "Order confirmed via UPI payment" },
      { status: "Packed", location: "Bhiwandi Hub, Thane", timestamp: "2026-07-30 02:30 PM", description: "Package manifest created and packed" },
      { status: "In Transit", location: "Vashi Delivery Facility", timestamp: "2026-07-31 08:45 AM", description: "In transit to local hub" }
    ],
    returnEligibleUntil: "2026-08-10",
    isReturnRequested: false,
    refundStatus: "Not Initiated"
  },
  {
    orderNumber: "ORD-7712",
    customerEmail: "priya.patel@gmail.com",
    customerPhone: "+91 9876543210",
    customerName: "Priya Patel",
    items: [
      { productId: "PRD-E102", productName: "boAt Airdopes 141 TWS Earbuds", quantity: 1, priceInINR: 1299, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80" }
    ],
    totalAmountInINR: 1299,
    paymentMethod: "COD",
    status: "Delivered",
    courierName: "BlueDart",
    trackingNumber: "BD-44120918",
    estimatedDelivery: "2026-07-28",
    shippingAddress: "Flat 12, Green Acres Apartment, Satellite, Ahmedabad, Gujarat 380015",
    trackingTimeline: [
      { status: "Order Placed", location: "System", timestamp: "2026-07-25 04:20 PM", description: "COD Order Placed" },
      { status: "Shipped", location: "Ahmedabad Warehouse", timestamp: "2026-07-26 11:00 AM", description: "Handed over to BlueDart courier" },
      { status: "Out for Delivery", location: "Satellite Hub", timestamp: "2026-07-28 09:00 AM", description: "Rider out for delivery" },
      { status: "Delivered", location: "Ahmedabad", timestamp: "2026-07-28 02:15 PM", description: "Delivered and COD collected" }
    ],
    returnEligibleUntil: "2026-08-04",
    isReturnRequested: false,
    refundStatus: "Not Initiated"
  },
  {
    orderNumber: "ORD-6540",
    customerEmail: "rajesh.kumar@yahoo.co.in",
    customerPhone: "+91 9123456789",
    customerName: "Rajesh Kumar",
    items: [
      { productId: "PRD-H402", productName: "Prestige Push Button 2000-Watt Induction Cooktop", quantity: 1, priceInINR: 2499, image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80" }
    ],
    totalAmountInINR: 2499,
    paymentMethod: "Credit Card",
    status: "Returned",
    courierName: "Delhivery",
    trackingNumber: "DEL-88271049",
    estimatedDelivery: "2026-07-20",
    shippingAddress: "House 45, Sector 15, Noida, Uttar Pradesh 201301",
    trackingTimeline: [
      { status: "Delivered", location: "Noida", timestamp: "2026-07-20 01:00 PM", description: "Delivered successfully" },
      { status: "Return Requested", location: "Customer Portal", timestamp: "2026-07-22 03:00 PM", description: "Defective induction heating surface" },
      { status: "Pickup Completed", location: "Noida", timestamp: "2026-07-24 11:30 AM", description: "Item collected by Delhivery" },
      { status: "Refund Processed", location: "Bank Gateway", timestamp: "2026-07-26 10:00 AM", description: "Refund credited back to HDFC Credit Card" }
    ],
    returnEligibleUntil: "2026-07-27",
    isReturnRequested: true,
    refundStatus: "Completed"
  },
  {
    orderNumber: "ORD-9102",
    customerEmail: "ananya.iyer@outlook.com",
    customerPhone: "+91 9988776655",
    customerName: "Ananya Iyer",
    items: [
      { productId: "PRD-E101", productName: "Noise ColorFit Pulse 2 Max Smartwatch", quantity: 1, priceInINR: 1499, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=80" }
    ],
    totalAmountInINR: 1499,
    paymentMethod: "UPI",
    status: "Processing",
    courierName: "Xpressbees",
    trackingNumber: "XP-77612019",
    estimatedDelivery: "2026-08-04",
    shippingAddress: "102 Koramangala 4th Block, Bengaluru, Karnataka 560034",
    trackingTimeline: [
      { status: "Order Placed", location: "System", timestamp: "2026-07-31 09:30 AM", description: "Payment verified via PhonePe UPI" }
    ],
    returnEligibleUntil: "2026-08-11",
    isReturnRequested: false,
    refundStatus: "Not Initiated"
  },
  {
    orderNumber: "ORD-5321",
    customerEmail: "vikram.singh@gmail.com",
    customerPhone: "+91 9811223344",
    customerName: "Vikram Singh",
    items: [
      { productId: "PRD-C302", productName: "Levi's Men's 511 Slim Fit Stretchable Jeans", quantity: 1, priceInINR: 2399, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80" }
    ],
    totalAmountInINR: 2399,
    paymentMethod: "Net Banking",
    status: "Shipped",
    courierName: "BlueDart",
    trackingNumber: "BD-90021827",
    estimatedDelivery: "2026-08-02",
    shippingAddress: "C-12, Malviya Nagar, Jaipur, Rajasthan 302017",
    trackingTimeline: [
      { status: "Order Placed", location: "System", timestamp: "2026-07-30 11:00 AM", description: "Order confirmed" },
      { status: "Shipped", location: "Gurugram Warehouse", timestamp: "2026-07-31 04:00 PM", description: "In transit via BlueDart Air" }
    ],
    returnEligibleUntil: "2026-08-09",
    isReturnRequested: false,
    refundStatus: "Not Initiated"
  },

  // Orders 6 to 20
  ...Array.from({ length: 15 }).map((_, idx) => {
    const num = 1000 + idx * 111;
    const names = ["Sneha Reddy", "Rohan Gupta", "Meera Joshi", "Deepa Nair", "Karan Malhotra", "Siddharth Das", "Neha Verma", "Arjun Kapoor", "Pooja Hegde", "Manish Pandey", "Kavita Rao", "Tushar Deshmukh", "Nikhil Saxena", "Ritu Goyal", "Varun Dhawan"];
    const cities = ["Hyderabad", "Pune", "Kolkata", "Chennai", "Delhi", "Chandigarh", "Indore", "Surat", "Bhopal", "Nagpur", "Coimbatore", "Kochi", "Lucknow", "Vadodara", "Visakhapatnam"];
    const name = names[idx % names.length];
    const city = cities[idx % cities.length];
    return {
      orderNumber: `ORD-${num}`,
      customerEmail: `${name.toLowerCase().replace(" ", ".")}@example.com`,
      customerPhone: `+91 98${idx}102030`,
      customerName: name,
      items: [
        { productId: "PRD-H401", productName: "Milton Thermosteel Flip Lid 1000ml Flask Bottle", quantity: 1, priceInINR: 999, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80" }
      ],
      totalAmountInINR: 999,
      paymentMethod: (idx % 2 === 0 ? "UPI" : "COD") as "UPI" | "COD",
      status: (idx % 3 === 0 ? "Delivered" : idx % 3 === 1 ? "In Transit" : "Out for Delivery") as "Delivered" | "In Transit" | "Out for Delivery",
      courierName: "Delhivery" as const,
      trackingNumber: `DEL-10${num}`,
      estimatedDelivery: "2026-08-03",
      shippingAddress: `Plot ${idx + 1}, Jubilee Hills, ${city}, India`,
      trackingTimeline: [
        { status: "Order Placed", location: "System", timestamp: "2026-07-28 10:00 AM", description: "Order processing initiated" },
        { status: "In Transit", location: `${city} Central Hub`, timestamp: "2026-07-30 05:00 PM", description: "Arrived at destination hub" }
      ],
      returnEligibleUntil: "2026-08-08",
      isReturnRequested: false,
      refundStatus: "Not Initiated" as const
    };
  })
];

// ----------------------------------------------------
// 50 FAQs SEED DATA
// ----------------------------------------------------
export const initialFAQs: SeedFAQ[] = [
  {
    question: "How can I track my order?",
    answer: "You can track your order in real-time by typing your Order ID (e.g., #ORD-8921) or phone number right here in this chat! Alternatively, check your SMS or email for the Delhivery / BlueDart tracking link.",
    category: "Shipping & Delivery",
    language: "en",
    tags: ["order tracking", "delivery", "awb", "delhivery", "status"],
    helpfulCount: 340
  },
  {
    question: "Mera order kab tak aayega?",
    answer: "Aapka order usually 2 se 4 business days mein deliver ho jata hai. Agar aap apna Order Number (jaise ORD-8921) yahan likhenge, toh main aapko exact delivery status aur tracking live dikha dunga!",
    category: "Shipping & Delivery",
    language: "hi",
    tags: ["hindi", "order tracking", "delivery date"],
    helpfulCount: 290
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day hassle-free return policy from the date of delivery. The item must be unused, in its original packaging with tags intact. Returns can be requested directly via chat or the returns tab.",
    category: "Returns & Exchanges",
    language: "en",
    tags: ["returns", "policy", "refund", "7 days"],
    helpfulCount: 510
  },
  {
    question: "How long does UPI refund take?",
    answer: "Instant UPI refunds are credited within 2 to 4 hours after pickup verification. Credit/Debit card refunds usually take 3 to 5 business days depending on your bank.",
    category: "Refunds & UPI",
    language: "en",
    tags: ["upi refund", "gpay", "phonepe", "timeline", "bank transfer"],
    helpfulCount: 420
  },
  {
    question: "UPI refund kab milega?",
    answer: "Pickup hone ke baad UPI refund 2-4 ghante mein aapke Google Pay, PhonePe, ya Paytm account mein credit ho jata hai.",
    category: "Refunds & UPI",
    language: "hi",
    tags: ["hindi", "upi refund", "gpay"],
    helpfulCount: 310
  },

  // Generating remaining up to 50 FAQs
  ...Array.from({ length: 45 }).map((_, i) => {
    const categories = ["Shipping & Delivery", "Returns & Exchanges", "Refunds & UPI", "Product & Warranty", "Account & Orders"] as const;
    const cat = categories[i % categories.length];
    return {
      question: `FAQ #${i + 6}: How do I request ${cat.toLowerCase()} support for order?`,
      answer: `SupportPilot AI resolves ${cat.toLowerCase()} queries automatically. You can check order history, check refund status, or talk to an agent 24/7.`,
      category: cat,
      language: "en" as const,
      tags: [cat.toLowerCase(), "support", "help"],
      helpfulCount: 50 + i * 5
    };
  })
];

// ----------------------------------------------------
// 20 CUSTOMERS SEED DATA
// ----------------------------------------------------
export const initialCustomers: SeedCustomer[] = [
  { name: "Support Admin", email: "admin@supportpilot.ai", phone: "+91 9999999999", role: "admin", preferredLanguage: "en", isVIP: true, city: "Bengaluru", state: "Karnataka", pincode: "560001" },
  { name: "Aarav Sharma", email: "aarav.sharma@gmail.com", phone: "+91 9820011223", role: "customer", preferredLanguage: "en", isVIP: true, city: "Mumbai", state: "Maharashtra", pincode: "400053" },
  { name: "Priya Patel", email: "priya.patel@gmail.com", phone: "+91 9876543210", role: "customer", preferredLanguage: "hi", isVIP: false, city: "Ahmedabad", state: "Gujarat", pincode: "380015" },
  { name: "Rajesh Kumar", email: "rajesh.kumar@yahoo.co.in", phone: "+91 9123456789", role: "customer", preferredLanguage: "en", isVIP: false, city: "Noida", state: "Uttar Pradesh", pincode: "201301" },
  { name: "Ananya Iyer", email: "ananya.iyer@outlook.com", phone: "+91 9988776655", role: "customer", preferredLanguage: "ta", isVIP: true, city: "Bengaluru", state: "Karnataka", pincode: "560034" },
  ...Array.from({ length: 15 }).map((_, i) => ({
    name: `Customer ${i + 6}`,
    email: `customer${i + 6}@example.com`,
    phone: `+91 98765000${i < 10 ? '0' + i : i}`,
    role: "customer" as const,
    preferredLanguage: "en",
    isVIP: i % 3 === 0,
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  }))
];

// ----------------------------------------------------
// 15 TICKETS SEED DATA
// ----------------------------------------------------
export const initialTickets: SeedTicket[] = [
  {
    ticketCode: "TK-1001",
    customerName: "Aarav Sharma",
    customerEmail: "aarav.sharma@gmail.com",
    customerPhone: "+91 9820011223",
    subject: "Urgent: Order #ORD-8921 Delivery Delayed",
    category: "Order Delay",
    priority: "High",
    status: "Escalated",
    sentiment: "Frustrated",
    assignedAgent: "Rohit Verma (Senior Executive)",
    conversationSummary: "Customer inquired about shipment status for ORD-8921. Delivery was expected yesterday but package is stuck at Vashi hub. Escalated to Delhivery account manager.",
    responses: [
      { sender: "customer", senderName: "Aarav Sharma", message: "Mera order 2 din se stuck hai, kab tak aayega?", timestamp: "2026-07-31 10:00 AM" },
      { sender: "ai", senderName: "SupportPilot AI", message: "Main Delhivery hub se contact kar raha hoon. Escalated ticket created.", timestamp: "2026-07-31 10:01 AM" }
    ]
  },
  {
    ticketCode: "TK-1002",
    customerName: "Priya Patel",
    customerEmail: "priya.patel@gmail.com",
    customerPhone: "+91 9876543210",
    subject: "Size Exchange Request for boAt Earbuds",
    category: "Return Request",
    priority: "Medium",
    status: "Open",
    sentiment: "Neutral",
    assignedAgent: "Unassigned",
    conversationSummary: "Customer wants to confirm warranty coverage for earbud battery case.",
    responses: [
      { sender: "customer", senderName: "Priya Patel", message: "Warranty claim process batayein.", timestamp: "2026-07-30 02:15 PM" }
    ]
  },
  ...Array.from({ length: 13 }).map((_, i) => {
    const categories = ["Order Delay", "Return Request", "Refund Issue", "Defective Product", "Payment Failure", "General Enquiry"] as const;
    const priorities = ["Low", "Medium", "High", "Urgent"] as const;
    const sentiments = ["Positive", "Neutral", "Negative", "Frustrated", "Urgent"] as const;
    const statuses = ["Open", "In Progress", "Pending Customer", "Resolved", "Escalated"] as const;

    return {
      ticketCode: `TK-10${i + 3}`,
      customerName: `Customer ${i + 3}`,
      customerEmail: `customer${i + 3}@example.com`,
      customerPhone: `+91 98765111${i < 10 ? '0' + i : i}`,
      subject: `Support enquiry regarding ${categories[i % categories.length]}`,
      category: categories[i % categories.length],
      priority: priorities[i % priorities.length],
      status: statuses[i % statuses.length],
      sentiment: sentiments[i % sentiments.length],
      assignedAgent: i % 2 === 0 ? "Sneha K." : "Unassigned",
      conversationSummary: "AI support provided initial troubleshooting and offered human agent callback.",
      responses: [
        { sender: "customer" as const, senderName: `Customer ${i + 3}`, message: "Need help with my order.", timestamp: "2026-07-29 11:00 AM" }
      ]
    };
  })
];
