**ReaCheck**
A cross platform game based app that tests and trains users to detect AI generated content. The app presents headlines, images, quotes, reviews and even text messages - some real, some AI generated and users have to guess which is which. Behind the scenes, we use LLMs (like GPT or open source models) to generate fake but convincing content. The app adjusts difficulty by analyzing the user’s accuracy using lightweight NLP scoring models. Age based modes make it accessible for kids, teens, adults and even elderly users. The project aims to boost AI literacy through gamified learning and can scale into educational and enterprise versions. Bonus features: streaks, leaderboards and community challenges.

*This project was built under the theme "AI for Humanity"*

**Features**
1. Real vs AI Detection: From quotes to images - can you spot the fake?
2. LLM Generated Challenges: GPT/Open Source models generate believable AI content
3. Smart Scoring: Your accuracy determines difficulty using lightweight NLP models
4. Age Based Modes: Tailored experience for kids, teens, adults and seniors
5. Gamification: Leaderboards, streaks and community challenges to keep it fun
6. Educational Ready: Can scale for schools and training institutions

**How It Works**
1. Choose the input mode: Text, File Upload, or URL.
2. Submit your content.
3. ReaCheck runs simulated AI-detection steps like:
   - Pattern and structure analysis
   - Metadata inspection
   - Confidence scoring
4. Results are displayed with reasoning, indicators, and metadata.
5. Users can retry or start a new analysis.

**Theme Alignment**
1. Helps users build AI content detection skills in a gamified and educational format.
2. Promotes critical thinking about media authenticity.
3. Encourages responsible tech usage especially among students and first time users of generative AI.
   
**Tech Stack**
1. Next.js & TypeScript
2. TailwindCSS
3. OmniDimension Voice Widget
4. LLMs (like GPT/Open Source)
5. Lightweight NLP Models

**OmniDimension Integration**
Voice agent integration is achieved using OmniDimension’s widget:
```html
<script
  id="omnidimension-web-widget"
  async
  src="https://backend.omnidim.io/web_widget.js?secret_key=YOUR_SECRET_KEY"
></script>
```

**Getting Started**
```
git clone https://github.com/mansiruhil/reacheck-omni-ts.git
```
```
cd reacheck-omni-ts
```
```
npm install
```
```
npm run dev
```

*Visit http://localhost:3000 to explore*

**Folder Structure**
```
reacheck-omni-ts/
│
├── app/                      # Next.js App Router Pages & Layout
│   ├── layout.tsx            # Global Layout (OmniDimension script here)
│   └── page.tsx              # Home Page
│
├── components/               # Reusable UI components
│   ├── ui/                   # Atomic UI components (Input, Button, etc.)
│   └── themeprovider.tsx          # Main ReaCheckDetector component
│
├── lib/                      # Utilities, helpers or config files
│   └── utils.ts              
│
├── public/                   # Static assets
│   ├── logo.png
│   └── favicon.svg
│
├── styles/                   # Global CSS or Tailwind setup
│   └── globals.css
│
├── README.md                 # Project documentation
├── package.json              # Project metadata & dependencies
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js config
└── .gitignore

```

**Future Enhancements**
1. Integrate real LLM based detection for deeper accuracy
2. Add user login, progress tracking & streak rewards
3. Support multilingual content analysis
4. Build leaderboards & social challenges
5. Offer browser extension & mobile app support

**License**

MIT License - free for personal and educational use.

*Powered by ReaCheck logic and OmniDimension magic :)*
