# GoStuds Chat Application – Frontend Assignment

A modern, responsive chat UI built with **Next.js 14 (App Router)**, **React**, and **Tailwind CSS**. This application implements all core features requested in the assignment, including voice recording, file attachments, emoji support, and conversation management.

## 🚀 Live Demo
*(Placeholder for Vercel/Netlify link)*

## ✨ Key Features
- **Modern Chat Layout**: Responsive sidebar and main chat area with a sleek, premium design.
- **Emoji Support**: Integrated emoji picker (`emoji-picker-react`) for expressive messaging. Emojis render natively in chat bubbles.
- **Voice Recording**: Built using the **MediaRecorder API**. Users can record, stop, and send voice notes which appear as interactive audio bubbles.
- **File Attachments**: Support for uploading images, PDFs, and other files. Displays file icons, names, and sizes.
- **Dynamic Interactions**: Smooth switching between conversations, real-time message state (simulated), and auto-scrolling history.
- **Bonus Features**:
  - **Dark Mode**: Support for light/dark themes using `next-themes`.
  - **Responsive Design**: Full mobile support with a slide-in/out navigation pattern.
  - **Hydration Safety**: Custom `FormattedDate` component prevents SSR timestamp mismatches.
  - **Premium UI Extensions**: Glassmorphism effects, custom scrollbars, and modern typography (Inter).

## 🛠️ Project Structure
```text
src/
├── app/                  # Next.js App Router (Layouts, Pages, Globals)
├── components/           # UI Components
│   ├── chat/             # Chat-specific components (Input, List, Area)
│   ├── layout/           # Global layout components (Sidebar)
│   └── ThemeProvider.tsx # Dark mode provider
├── context/              # Global State (ChatContext)
├── data/                 # Static JSON Mock Data
├── lib/                  # Utilities (Tailwind merge)
└── types/                # TypeScript definitions for Chat models
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd chatApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧠 Approach & Thinking
- **State Management**: Used **React Context API** to manage the global state of conversations, messages, and the active chat. This allows for clean data flow without prop drilling.
- **UX First**: Prioritized a "mobile-first" approach. On small screens, the UI switches between the list view and chat view for maximum legibility.
- **Native APIs**: Leveraged standard browser APIs (MediaDevices, File) for media handling to keep the implementation lightweight and standards-compliant.
- **Design System**: Implemented a flexible design system using Tailwind HSL variables, allowing for consistent colors across light and dark modes.

## 🔮 Future Improvements (Backend)
- **WebSockets**: Replace the local state with Socket.io for real-time bidirectional messaging.
- **Database**: Integrate MongoDB or PostgreSQL to persist messages and user profiles.
- **Cloud Storage**: Use AWS S3 or Cloudinary for permanent hosting of audio and file attachments.
- **Auth**: Implement NextAuth.js for secure user sessions.
- **Read Receipts**: Sophisticated status tracking (delivered vs. read) synced across devices.

---
**Developed by:** [Your Name]
**Email:** gostudsofficial@gmail.com
