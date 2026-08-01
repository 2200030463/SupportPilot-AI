# SupportPilot AI 🤖🇮🇳

> **AI-Powered Multilingual Customer Support Agent for Indian Businesses**  
> *Built for the ChatGPT Codex India Hackathon 2026 — Track: AI Agents for Bharat's Businesses*

---

## 🌟 Overview

**SupportPilot AI** is an enterprise-grade, production-ready AI Customer Support platform specifically designed for Indian e-commerce brands and SaaS businesses. 

Unlike generic chatbots, SupportPilot AI behaves like a real Indian support employee:
- **Understands natural human language**: Supports English, Hindi, Hinglish, Tamil, Telugu, Marathi, and Bengali.
- **Autonomous Tool Execution**: Automatically selects internal tools to track shipments via **Delhivery/BlueDart**, check 7-day return eligibility, verify **UPI/Card refunds**, and suggest products in Indian Rupees (**₹**).
- **Voice Intelligence**: Includes browser Web Speech Speech-to-Text (STT) and Text-to-Speech (TTS) with Indian accents.
- **Human Escalation Queue**: Detects frustrated customer sentiment and routes tickets instantly to live human agent desks.
- **Executive CSAT Dashboard**: Real-time analytics measuring CSAT scores, sentiment breakdown, language distribution, and resolution volume using **Recharts**.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions, API Routes)
- **UI & Styling**: React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React
- **Analytics Charts**: Recharts
- **AI Agent Intelligence**: OpenAI SDK (GPT-4o / GPT-4o-mini tool calling with intelligent heuristic fallback)
- **Database Layer**: MongoDB with Mongoose (Schemas: User, Order, Product, Ticket, FAQ, Review, Conversation)
- **Authentication**: NextAuth.js (Credentials Strategy)
- **Validation**: Zod + React Hook Form
- **Testing**: Vitest

---

## 🧰 Autonomous Agent Tools (10 Tools)

1. `search_orders`: Search order details by Order ID (e.g. #ORD-8921), email, or phone.
2. `track_shipment`: Real-time tracking timeline for Delhivery, BlueDart, Xpressbees, and Ecom Express.
3. `search_products`: Search catalog by category, specs, or max price budget in INR (₹).
4. `search_faq`: Vector RAG search across 50+ knowledge base questions.
5. `return_eligibility`: 7-day return policy verification and doorstep pickup scheduling.
6. `refund_status`: Bank transaction reference and UPI refund timeline checker.
7. `customer_profile_lookup`: Customer spending history, VIP loyalty status, and location.
8. `create_support_ticket`: Escalation ticket generation (#TK-1082) with priority and category.
9. `recommend_products`: Top 3 product comparison with explicit justification.
10. `human_escalation`: Instant handoff to senior live executive desk when user requests human support or is frustrated.

---

## 📁 Folder Structure

```
SupportPilot-AI/
├── public/                  # Static assets & icons
├── scripts/
│   └── seed.ts              # Database seeding script (30 Products, 20 Orders, 50 FAQs, etc.)
├── src/
│   ├── app/
│   │   ├── admin/           # Executive Admin Dashboard Pages (Analytics, Tickets, Orders, Products, FAQs)
│   │   ├── api/             # Next.js 15 API Routes (/api/chat, /api/orders, /api/tickets, /api/analytics)
│   │   ├── chat/            # Full-screen Customer Support Portal
│   │   ├── login/           # Admin Login Screen with pre-filled demo button
│   │   ├── globals.css      # Dark Mode Glassmorphism CSS design system
│   │   ├── layout.tsx       # Root Layout
│   │   └── page.tsx         # Modern SaaS Landing Page
│   ├── components/
│   │   ├── AdminSidebar.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── OrderTimelineWidget.tsx
│   │   ├── ProductRecommendationWidget.tsx
│   │   └── VoiceController.tsx
│   ├── lib/
│   │   ├── agent/
│   │   │   ├── nlp.ts          # Multilingual parser & sentiment analyzer
│   │   │   ├── orchestrator.ts # Multi-turn tool execution loop
│   │   │   └── tools.ts        # 10 Internal Agent Tools implementation
│   │   ├── authOptions.ts   # NextAuth config
│   │   ├── db.ts            # Mongoose DB manager with fallback
│   │   └── seedData.ts      # Comprehensive seed dataset
│   └── models/              # Mongoose Data Models (Order, Product, Ticket, User, FAQ, etc.)
├── tests/
│   └── agent-tools.test.ts  # Vitest unit tests
├── .env.example
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Start & Installation

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Optional: Add `OPENAI_API_KEY` and `MONGODB_URI`. The app includes built-in mock memory fallback to run 100% offline).*

### 3. Seed Database
```bash
npm run seed
```

### 4. Run Unit Tests
```bash
npm run test
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Build

To verify code quality and TypeScript compilation:
```bash
npm run lint
npm run build
```

---

## 🏆 Hackathon Submission Details

- **Hackathon**: ChatGPT Codex India Hackathon 2026
- **Track**: AI Agents for Bharat's Businesses
- **Tagline**: AI-Powered Multilingual Customer Support Agent for Indian Businesses
- **Vercel Deployable**: Yes (Zero external dependency failures)
