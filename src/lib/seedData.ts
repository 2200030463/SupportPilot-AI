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
// BHARAT RICH PRODUCT CATALOGUE (Top Indian & Global Brands)
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
    description: "Low latency ENx technology, 42 hours total battery playback, IPX4 sweat resistance, and instant IWP pairing.",
    specifications: { Playtime: "42 Hours", Drivers: "8mm Dynamic", Waterproof: "IPX4", Charging: "ASAP Fast Charge" },
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E103",
    name: "OnePlus Nord Buds 2 TWS Bluetooth Earphones (Active Noise Cancellation)",
    category: "Electronics",
    priceInINR: 2799,
    originalPriceInINR: 3299,
    rating: 4.7,
    reviewCount: 6120,
    stockQuantity: 180,
    inStock: true,
    brand: "OnePlus",
    description: "25dB Active Noise Cancellation, 12.4mm Extra Large Dynamic Drivers, BassWave Enhancement, and 36 hours total listening time.",
    specifications: { ANC: "25dB Active Noise Cancellation", Drivers: "12.4mm Titanium", Battery: "36 Hours", FastCharge: "10 min = 5 hrs" },
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E104",
    name: "JBL Wave 200TWS True Wireless Earbuds with Deep Bass",
    category: "Electronics",
    priceInINR: 2999,
    originalPriceInINR: 4999,
    rating: 4.5,
    reviewCount: 3450,
    stockQuantity: 95,
    inStock: true,
    brand: "JBL",
    description: "JBL Deep Bass Sound, 20 hours combined playback, dual connect technology, and ergonomic comfort fit for daily music & calls.",
    specifications: { Sound: "JBL Deep Bass", Playtime: "20 Hours", DualConnect: "Yes", Driver: "8mm" },
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E105",
    name: "CMF by Nothing Buds with 42dB Active Noise Cancellation",
    category: "Electronics",
    priceInINR: 2499,
    originalPriceInINR: 3499,
    rating: 4.6,
    reviewCount: 1890,
    stockQuantity: 140,
    inStock: true,
    brand: "CMF",
    description: "42dB Active Noise Cancellation, Ultra Bass Technology, 12.4mm Bio-fibre drivers, and Dirac Opteo tuning.",
    specifications: { ANC: "42dB", Tuning: "Dirac Opteo", Drivers: "12.4mm", Battery: "35.5 Hours" },
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E106",
    name: "Realme Buds T300 TWS Earphones with 30dB ANC",
    category: "Electronics",
    priceInINR: 2299,
    originalPriceInINR: 3999,
    rating: 4.5,
    reviewCount: 5210,
    stockQuantity: 210,
    inStock: true,
    brand: "Realme",
    description: "30dB Active Noise Cancellation, 360 Spatial Audio Effect, 12.4mm Dynamic Bass Boost Drivers, and 40 hours total battery life.",
    specifications: { ANC: "30dB", Audio: "360 Spatial", Playtime: "40 Hours", Latency: "50ms Gaming" },
    image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E107",
    name: "Boult Audio Z40 TWS Earbuds with 60H Playtime",
    category: "Electronics",
    priceInINR: 1199,
    originalPriceInINR: 4999,
    rating: 4.3,
    reviewCount: 7600,
    stockQuantity: 300,
    inStock: true,
    brand: "Boult",
    description: "Zen Quad Mic ENC clear calling, 60 hours massive battery life, low latency gaming mode, and Type-C fast charging.",
    specifications: { Playtime: "60 Hours", Calling: "Zen Quad Mic ENC", Drivers: "10mm BoomX", FastCharge: "10 min = 100 min" },
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E108",
    name: "Sony WH-CH520 Wireless On-Ear Bluetooth Headphones",
    category: "Electronics",
    priceInINR: 4490,
    originalPriceInINR: 5990,
    rating: 4.8,
    reviewCount: 4100,
    stockQuantity: 70,
    inStock: true,
    brand: "Sony",
    description: "50 hours extended battery life, DSEE Digital Sound Enhancement, multipoint connection, and crystal clear hands-free calling.",
    specifications: { Battery: "50 Hours", DSEE: "Supported", Connection: "Multipoint Pair", Weight: "147g" },
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E109",
    name: "Samsung Galaxy Buds FE TWS ANC Earbuds",
    category: "Electronics",
    priceInINR: 6999,
    originalPriceInINR: 12999,
    rating: 4.7,
    reviewCount: 2900,
    stockQuantity: 60,
    inStock: true,
    brand: "Samsung",
    description: "Powerful Active Noise Canceling, ergonomic wingtip comfort fit, seamless Galaxy ecosystem connection, and deep bass punch.",
    specifications: { ANC: "Active", Ecosystem: "Samsung Seamless", Battery: "30 Hours", Microphones: "3-Mic Array" },
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E110",
    name: "Apple iPhone 15 5G (Black, 128GB Storage)",
    category: "Electronics",
    priceInINR: 71900,
    originalPriceInINR: 79900,
    rating: 4.9,
    reviewCount: 9400,
    stockQuantity: 40,
    inStock: true,
    brand: "Apple",
    description: "Dynamic Island, 48MP Main camera with 2x Telephoto, A16 Bionic chip, and USB-C connectivity with aluminum design.",
    specifications: { Display: "6.1\" Super Retina XDR", Processor: "A16 Bionic", Camera: "48MP Dual", Storage: "128GB" },
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E111",
    name: "Nothing Phone (2a) 5G (White, 8GB RAM, 128GB Storage)",
    category: "Electronics",
    priceInINR: 23999,
    originalPriceInINR: 25999,
    rating: 4.6,
    reviewCount: 3890,
    stockQuantity: 90,
    inStock: true,
    brand: "Nothing",
    description: "Unique Glyph Interface, Dimensity 7200 Pro Processor, 50MP Dual OIS Rear Camera, and 120Hz Flexible AMOLED Display.",
    specifications: { Processor: "MediaTek 7200 Pro", Camera: "50MP OIS Dual", Display: "120Hz AMOLED", Battery: "5000mAh" },
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E112",
    name: "HP Pavilion 15 Intel Core i5 13th Gen Thin & Light Laptop",
    category: "Electronics",
    priceInINR: 58990,
    originalPriceInINR: 72000,
    rating: 4.5,
    reviewCount: 1980,
    stockQuantity: 35,
    inStock: true,
    brand: "HP",
    description: "Intel Core i5-1335U Processor, 16GB DDR4 RAM, 512GB NVMe SSD, FHD IPS Display, B&O Audio, and Backlit Keyboard.",
    specifications: { Processor: "Intel i5-1335U", RAM: "16GB", Storage: "512GB SSD", Audio: "Bang & Olufsen" },
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E113",
    name: "Dell Inspiron 3520 Intel Core i3 12th Gen Laptop",
    category: "Electronics",
    priceInINR: 38990,
    originalPriceInINR: 48000,
    rating: 4.3,
    reviewCount: 2410,
    stockQuantity: 50,
    inStock: true,
    brand: "Dell",
    description: "Intel Core i3-1215U, 8GB RAM, 512GB SSD, 120Hz 15.6\" FHD Display, Windows 11 + MS Office 2021 pre-installed.",
    specifications: { Processor: "Intel i3-1215U", RAM: "8GB", Storage: "512GB SSD", Display: "120Hz FHD" },
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E114",
    name: "Lenovo IdeaPad Slim 3 Intel Core i5 12th Gen Laptop",
    category: "Electronics",
    priceInINR: 49990,
    originalPriceInINR: 65000,
    rating: 4.4,
    reviewCount: 3100,
    stockQuantity: 45,
    inStock: true,
    brand: "Lenovo",
    description: "Intel Core i5-12450H, 16GB RAM, 512GB SSD, 15.6\" FHD Anti-Glare Display, Rapid Charge, and Privacy Shutter Webcam.",
    specifications: { Processor: "Intel i5-12450H", RAM: "16GB", Storage: "512GB SSD", Weight: "1.63kg" },
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E115",
    name: "ASUS TUF Gaming F15 Intel Core i5 RTX 3050 Gaming Laptop",
    category: "Electronics",
    priceInINR: 54990,
    originalPriceInINR: 74990,
    rating: 4.7,
    reviewCount: 4520,
    stockQuantity: 30,
    inStock: true,
    brand: "ASUS",
    description: "Intel Core i5-11400H, NVIDIA GeForce RTX 3050 4GB GPU, 144Hz 15.6\" FHD Display, 16GB RAM, 512GB SSD, and RGB Backlit Keyboard.",
    specifications: { GPU: "NVIDIA RTX 3050 4GB", Display: "144Hz FHD", RAM: "16GB", Storage: "512GB SSD" },
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
  {
    sku: "PRD-E116",
    name: "Logitech G304 Lightspeed Wireless Gaming Mouse",
    category: "Electronics",
    priceInINR: 2995,
    originalPriceInINR: 3795,
    rating: 4.6,
    reviewCount: 7800,
    stockQuantity: 110,
    inStock: true,
    brand: "Logitech",
    description: "HERO 12K DPI Optical Sensor, 1ms Lightspeed wireless response, 250 hours battery life on single AA, and 6 programmable buttons.",
    specifications: { Sensor: "HERO 12,000 DPI", Connection: "Lightspeed Wireless 1ms", Weight: "99g", Buttons: "6 Programmable" },
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80",
    returnPolicyDays: 7,
    isPopular: true,
  },
];

// ----------------------------------------------------
// ORDERS SEED DATA
// ----------------------------------------------------
export const initialOrders: SeedOrder[] = [
  {
    orderNumber: "ORD-1001",
    customerEmail: "aarav.sharma@gmail.com",
    customerPhone: "9820011223",
    customerName: "Aarav Sharma",
    items: [
      {
        productId: "PRD-E102",
        productName: "boAt Airdopes 141 TWS Earbuds",
        quantity: 1,
        priceInINR: 1299,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
      },
    ],
    totalAmountInINR: 1299,
    paymentMethod: "UPI",
    status: "In Transit",
    courierName: "Delhivery",
    trackingNumber: "DLH-99218201",
    estimatedDelivery: "2026-08-03",
    shippingAddress: "Flat 402, Green Valley Apartments, Indiranagar, Bengaluru, Karnataka 560038",
    trackingTimeline: [
      { status: "Order Placed", location: "Bengaluru Hub", timestamp: "2026-07-30T10:00:00Z", description: "Order confirmed via Google Pay UPI" },
      { status: "Shipped", location: "Warehouse North", timestamp: "2026-07-31T08:30:00Z", description: "Handed over to Delhivery Express courier" },
      { status: "In Transit", location: "Delhivery Regional Sorting Facility", timestamp: "2026-08-01T04:15:00Z", description: "Package in transit to delivery station" },
    ],
    returnEligibleUntil: "2026-08-10",
    isReturnRequested: false,
    refundStatus: "Not Initiated",
  },
  {
    orderNumber: "ORD-1002",
    customerEmail: "priya.patel@yahoo.com",
    customerPhone: "9876543210",
    customerName: "Priya Patel",
    items: [
      {
        productId: "PRD-E103",
        productName: "OnePlus Nord Buds 2 TWS",
        quantity: 1,
        priceInINR: 2799,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=80",
      },
    ],
    totalAmountInINR: 2799,
    paymentMethod: "UPI",
    status: "Delivered",
    courierName: "BlueDart",
    trackingNumber: "BLU-88219012",
    estimatedDelivery: "2026-07-29",
    shippingAddress: "B-12, Sector 62, Noida, Uttar Pradesh 201301",
    trackingTimeline: [
      { status: "Order Placed", location: "Noida", timestamp: "2026-07-26T12:00:00Z", description: "Order placed" },
      { status: "Delivered", location: "Noida Doorstep", timestamp: "2026-07-29T14:30:00Z", description: "Package delivered successfully" },
    ],
    returnEligibleUntil: "2026-08-05",
    isReturnRequested: false,
    refundStatus: "Not Initiated",
  },
  {
    orderNumber: "ORD-6540",
    customerEmail: "rohit.verma@gmail.com",
    customerPhone: "9910022334",
    customerName: "Rohit Verma",
    items: [
      {
        productId: "PRD-E104",
        productName: "JBL Wave 200TWS True Wireless Earbuds",
        quantity: 1,
        priceInINR: 2999,
        image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&auto=format&fit=crop&q=80",
      },
    ],
    totalAmountInINR: 2999,
    paymentMethod: "UPI",
    status: "Returned",
    courierName: "Delhivery",
    trackingNumber: "DLH-77129033",
    estimatedDelivery: "2026-07-25",
    shippingAddress: "C-45, Malviya Nagar, Jaipur, Rajasthan 302017",
    trackingTimeline: [
      { status: "Return Processed", location: "Jaipur Hub", timestamp: "2026-07-28T09:00:00Z", description: "Returned item inspected and passed quality check" },
    ],
    returnEligibleUntil: "2026-08-01",
    isReturnRequested: true,
    refundStatus: "Completed",
  },
];

// ----------------------------------------------------
// FAQS SEED DATA
// ----------------------------------------------------
export const initialFAQs: SeedFAQ[] = [
  {
    question: "What is your return & exchange policy?",
    answer: "SupportPilot AI partner merchants offer a 7-day hassle-free replacement or return policy from the delivery date. Items must have original box, invoice, and tags intact.",
    category: "Returns & Exchanges",
    language: "en",
    tags: ["return", "exchange", "policy", "7 days"],
    helpfulCount: 342,
  },
  {
    question: "How long does UPI or Card refund processing take?",
    answer: "Instant UPI refunds are credited within 2-4 hours after doorstep pickup completion. Credit Card & Net Banking refunds take 3-5 business days depending on bank clearing.",
    category: "Refunds & UPI",
    language: "en",
    tags: ["refund", "upi", "credit card", "processing time"],
    helpfulCount: 290,
  },
];

// ----------------------------------------------------
// CUSTOMERS SEED DATA
// ----------------------------------------------------
export const initialCustomers: SeedCustomer[] = [
  {
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "9820011223",
    role: "customer",
    preferredLanguage: "English",
    isVIP: true,
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
  },
];

// ----------------------------------------------------
// TICKETS SEED DATA
// ----------------------------------------------------
export const initialTickets: SeedTicket[] = [
  {
    ticketCode: "TCK-9001",
    customerName: "Aarav Sharma",
    customerEmail: "aarav.sharma@gmail.com",
    customerPhone: "9820011223",
    subject: "Delivery timeline check for ORD-1001",
    category: "Order Delay",
    priority: "Medium",
    status: "In Progress",
    sentiment: "Neutral",
    assignedAgent: "Rohit Verma",
    conversationSummary: "Customer inquired about delivery status of boAt earbuds.",
    responses: [
      {
        sender: "customer",
        senderName: "Aarav Sharma",
        message: "Where is my parcel ORD-1001?",
        timestamp: "2026-08-01T06:00:00Z",
      },
    ],
  },
];
