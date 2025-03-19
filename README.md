# tiktok-live-cli

A command-line interface for viewing TikTok live streams, built with React Ink.

## Features

- Real-time chat messages
- Gift tracking
- Follow notifications
- Like and share events
- Viewer count statistics
- Responsive layout that adapts to terminal size

## Installation

```bash
npm install --global tiktok-live-cli
```

## Usage

```bash
tiktok-live-cli <username>

# Example
tiktok-live-cli @username
```

## Development

To set up the project for local development:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tiktok-live-cli.git
cd tiktok-live-cli
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server with auto-reloading:
```bash
npm run watch
```

4. For one-off builds:
```bash
npm run build
```

Available npm scripts:
- `npm run build` - Build the TypeScript project
- `npm run dev` - Run TypeScript in watch mode
- `npm run start` - Run the built CLI
- `npm run watch` - Build and run with auto-reloading
- `npm run test` - Run tests, check formatting and lint code

## Credits

This project is built on top of [TikTok-Live-Connector](https://github.com/zerodytrash/TikTok-Live-Connector) by [zerodytrash](https://github.com/zerodytrash), which provides the core functionality for connecting to TikTok's live stream services. TikTok-Live-Connector is an unofficial API that enables real-time access to TikTok LIVE events such as comments, gifts, and follows.

## Dependencies

- [Ink](https://github.com/vadimdemedes/ink) - React for CLI
- [TikTok-Live-Connector](https://github.com/zerodytrash/TikTok-Live-Connector) - TikTok LIVE connection library

## License

MIT

## Note

This project is not affiliated with TikTok/ByteDance. It uses an unofficial API through TikTok-Live-Connector.
