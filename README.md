# Video Editor

A modern, browser-based video editor built with Next.js, TypeScript, and FFmpeg.wasm.

## Features

- 🎬 Upload and preview videos
- ✂️ Trim videos with an interactive timeline
- 🎮 Built-in video player with play/pause controls
- 💻 Client-side video processing (no server required)
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Fast and efficient using FFmpeg.wasm

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- A modern web browser (Chrome, Firefox, Edge, or Safari)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload a Video**: Click the upload area or drag and drop a video file
2. **Preview**: Watch your video in the built-in player
3. **Trim**: Drag the blue handles on the timeline to set start and end points
4. **Export**: Click "Trim Video" to process and download your edited video

## Technology Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **FFmpeg.wasm** - Client-side video processing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Project Structure

```
videoedit/
├── app/                  # Next.js app directory
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── VideoEditor.tsx  # Main editor component
│   ├── VideoPlayer.tsx  # Video player component
│   └── VideoTimeline.tsx # Timeline component
├── hooks/               # Custom React hooks
│   └── useFFmpeg.ts     # FFmpeg wrapper hook
└── public/              # Static assets

```

## Features Roadmap

- [ ] Multiple video clips support
- [ ] Add text overlays
- [ ] Apply filters and effects
- [ ] Audio track management
- [ ] Video format conversion
- [ ] Speed adjustment
- [ ] Video rotation and cropping

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
