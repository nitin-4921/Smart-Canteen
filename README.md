# 🍽️ SmartCanteen — Smart Campus Food Ordering & Rush-Hour Management

**Skip the Queue. Save Your Break. Eat Smarter.**

SmartCanteen is an end-to-end campus dining pre-ordering and rush-hour orchestration platform designed to eliminate long canteen queues, reduce food wastage, and streamline kitchen operations through real-time order management and intelligent pickup scheduling.

---

## 🚀 The Problem

During peak lunch hours, college canteens serve approximately **400 students within a short break window**, resulting in:

- ⏳ Long queues exceeding 25 minutes.
- 🍱 Wasted break time and poor student experience.
- 📉 Stockouts of popular food items.
- ♻️ Food wastage due to inaccurate demand estimation.
- 🍳 Difficulty managing kitchen workload during rush hours.

## 💡 The Solution

SmartCanteen transforms traditional campus dining into a smart, digitally managed experience.

Students can:
- Browse the menu and place orders in just 3 taps.
- Reserve a convenient 15-minute pickup slot.
- Receive a digital order token and QR pickup pass.
- Track their order status in real time.
- Collect food without waiting in traditional queues.

Meanwhile, kitchen staff and administrators can manage orders, control rush-hour capacity, monitor demand, and optimize food preparation through dedicated dashboards.

---

## ✨ Key Features

### 1. 🛒 Student Food Ordering

- Curated menu featuring 6 vegetarian dishes:
  - Crispy Masala Dosa
  - Paneer Tikka Roll
  - Veg Sandwich
  - Samosa
  - Cold Coffee
  - Mini Thali
- Quick search with `Ctrl + K` / `⌘ + K` keyboard shortcuts.
- Category-based browsing and quick filters:
  - Under ₹60
  - Ready in 5 min
  - Pure Veg
  - Chef's Special
- Custom add-ons and kitchen preparation notes.
- Automatic **₹15 student subsidy** on orders of ₹40 or above.

### 2. ⏰ Smart 15-Minute Pickup Slots

- Dynamically generated pickup slots based on the current clock.
- Automatic capacity tracking for every slot.
- Each new order reduces the selected slot's available capacity.
- Fully booked slots automatically become **BLOCKED**.
- Automatically selects the next available slot when capacity is exhausted.

### 3. 📦 My Orders & Live Tracking

- Digital order tokens (e.g., `#TK-142`).
- Three-stage order tracking:
  - Confirmed
  - Kitchen Preparing
  - Ready for Pickup
- Estimated food preparation and pickup time.
- Digital QR pickup pass modal.
- One-click reorder functionality for previous orders.

### 4. 👨‍🍳 Kitchen Management Dashboard (KDS)

A dedicated Kitchen Display System with a 3-column Kanban workflow:

- **New Orders:** Incoming student orders.
- **Preparing Now:** Active orders with live timers and delayed-order alerts.
- **Ready for Pickup:** Completed orders awaiting collection.

Additional capabilities:
- Printable counter receipts.
- Web Audio API notification chimes.
- Live order simulation for demonstrations.
- Cook-Ahead Batch Helper for efficient preparation.

**Rush Control System:**

| Mode | Functionality |
|---|---|
| 🟢 OPEN | Normal checkout with approximately 6-minute preparation estimate |
| 🟡 BUSY | Adds a 5-minute preparation buffer and alerts students about peak rush |
| 🔴 PAUSED | Temporarily blocks new checkouts while allowing active orders to finish |

### 5. 📊 Admin Analytics Dashboard

Provides operational insights through interactive analytics:

- Time-range filters: Today, 7 Days, 30 Days, Custom.
- Four executive KPIs:
  - Daily Orders
  - Gross Revenue
  - Waste Prevented
  - Queue Wait Reduction
- Interactive peak 15-minute slot bar chart.
- Slot occupancy heatmap.
- Top 5 food items.
- Cook-Ahead Forecast Insights.
- One-click dispatch of forecast recommendations to the Kitchen Batch Helper.

### 6. 📺 Live Queue & Token Display

A dedicated dining hall TV kiosk interface featuring:

- Real-time clock.
- Live canteen status: OPEN / BUSY / PAUSED.
- Live queue wait-time comparison.
- Large Ready for Pickup token cards.
- Upcoming and Preparing order queues.
- Real-time pickup slot availability.
- Rotating announcements.

**Demonstration metric:** Approximately 2.5-minute smart pickup wait compared with a traditional 25-minute queue.

### 7. 🔐 Login & Role Switching

Seamlessly switch between three user personas:

- Student
- Kitchen Staff
- Admin

Role switching is available through both the login page and the top navigation header, allowing the complete system workflow to be demonstrated in one session.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Frontend UI development |
| TypeScript | Type-safe development |
| Vite 8 | Development server and build tooling |
| Tailwind CSS v4 | Responsive UI styling |
| Lucide React | Icons and visual elements |
| Motion | Animation capabilities |
| Web Audio API | Kitchen notification sounds |
| React State | Real-time client-side application state |

**Typography:** Plus Jakarta Sans, with tabular numerals for consistent display of timers, prices, and order tokens.

---

## 🏗️ Architecture & Backend Status

SmartCanteen currently operates using a **100% client-side architecture**.

All major application functionalities are managed through real-time React state, including:

- Food ordering and cart management.
- Pickup slot capacity tracking.
- Kitchen Kanban workflow.
- Live queue and token updates.
- Rush-hour mode management.
- Administrative analytics.

### API Keys & Dependencies

- No external API keys are currently required.
- No active third-party API integrations.
- No exposed API credentials.
- All core demonstration workflows function without an external backend.

### 🔮 Future Scope — Phase 2

The project is designed to support future backend integration.

Existing project dependencies and configuration include:

- `@google/genai` for potential Gemini-powered intelligence.
- `express` for backend server development.
- `dotenv` for environment configuration.
- `GEMINI_API_KEY` and `APP_URL` placeholders in `.env.example`.

Planned enhancements:

- Backend integration using Node.js and Express.
- Database integration for persistent orders and user accounts.
- Gemini-powered demand forecasting.
- Intelligent food preparation recommendations.
- Historical sales and food wastage analysis.
- Real-time synchronization across multiple devices.

---

## 🎯 Expected Impact

SmartCanteen aims to transform the campus dining experience through:

- Reduced waiting time during peak lunch hours.
- Better utilization of students' limited break time.
- Improved kitchen workload distribution.
- Reduced food wastage through demand forecasting.
- Better inventory and food preparation planning.
- A smoother, more transparent ordering experience.

---

## 💻 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS recommended)
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/SmartCanteen.git
```

**2. Navigate to the project directory**

```bash
cd SmartCanteen
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

---

## 📁 Project Structure

```text
SmartCanteen/
│
├── public/             # Static assets
├── src/                # Application source code
│   ├── components/     # Reusable UI components
│   ├── assets/         # Images and other assets
│   └── ...             # Application modules
│
├── .env.example        # Environment variable template
├── index.html          # Application entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md           # Project documentation
```


---

## 🌟 Why SmartCanteen?

SmartCanteen is more than a food ordering application. It connects students, kitchen staff, and administrators through one integrated platform.

By combining pre-ordering, dynamic pickup scheduling, live kitchen management, and demand analytics, it addresses the operational challenges of traditional college canteens.

**Less waiting. Smarter kitchens. Better campus dining.**

---

## 👩‍💻 Contributors

Developed as a smart campus dining solution.

**Project:** SmartCanteen  
**Category:** Smart Campus / FoodTech / Web Development  
**Focus:** Digital Transformation | Real-Time Order Management | Operational Analytics

---

⭐ If you find this project interesting, consider giving the repository a star!
